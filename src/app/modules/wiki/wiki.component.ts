import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  untracked,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {firstValueFrom} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

interface JSONNavigatableRoutes {
  [key: string]: string | NavigatableRoute
}

interface NavigatableRoutesMap {
  [key: string]: NavigatableRoute
}

interface NavigatableRoute {
  display_name: string,
  resource?: string,
  depth?: number,
  children?: NavigatableRoutesMap
}

@Component({
    selector: 'srg-wiki',
    templateUrl: './wiki.component.html',
    styleUrl: './wiki.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class WikiComponent {
  @ViewChild('navigation') navigation!: ElementRef<HTMLDivElement>;
  @ViewChild('navigationToggler') toggler!: ElementRef<HTMLButtonElement>;
  @ViewChild('main') main!: ElementRef<HTMLDivElement>;
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLDivElement>;

  private readonly DEFAULT_ROUTE: string = 'home'

  public readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly httpClient = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * All potential routes of the wiki component
   */
  protected routes = signal<NavigatableRoutesMap | undefined>(undefined);
  /**
   * List of routes() signal keys that can be viewed on navigation
   */
  protected viewableRoutes = signal<string[]|undefined>(undefined);
  /**
   * List of expanded parents for arrow rotation
   */
  protected expandedParents = signal<string[]|undefined>(undefined);
  
  /**
   * Currently selected route to show content for
   */
  protected selectedRoute = signal<string>(this.DEFAULT_ROUTE);

  /**
   * Currently selected uri fragment
   */
  protected selectedFragment = signal<string|undefined>(undefined);

  protected title = signal<string>('');
  protected content = signal<SafeHtml | undefined>(undefined);
  
  readonly contentLoading = signal<boolean>(false);

  constructor() {
    this.activatedRoute.params.subscribe(params => this.selectedRoute.set(params['route']))
    this.activatedRoute.fragment.subscribe(fragment => this.selectedFragment.set(fragment ?? undefined))

    this.httpClient.get<JSONNavigatableRoutes>('assets/pages/nav.json', {responseType: 'json'}).subscribe(data => {
      const parsedRoutes = this.parseRoutes(data);
      this.routes.set(parsedRoutes);
    })

    effect(() => {
      const routes = this.routes();
      const selectedRoute = this.selectedRoute() ?? this.DEFAULT_ROUTE;
      const selectedFragment = this.selectedFragment();

      untracked(() => {
        const currentRoute = routes ? routes[selectedRoute] : undefined;

        this.expandNavigation(selectedFragment ?? selectedRoute)

        firstValueFrom(this.httpClient.get('assets/pages/' + currentRoute?.resource, {responseType: 'text'})).then(async data => {
          this.contentLoading.set(true);
          const parsedData = (currentRoute?.display_name && currentRoute.display_name !== '' ?
            '<h' + (currentRoute.depth ?? 1) + '>' + currentRoute?.display_name + '</h' + (currentRoute.depth ?? 1) + '>\n' : '') + data
          
          if (!this.navigation.nativeElement.classList.contains('d-none')) {
            this.toggleNavbar();
          }
          this.content.set(this.sanitizer.bypassSecurityTrustHtml(parsedData));
          
          if (selectedFragment == undefined) {
            this.contentWrapper.nativeElement.scrollTo({top: 0, behavior: 'smooth'});
          } else {
            const elementTop = document.getElementById(selectedFragment)?.getBoundingClientRect().top;
            if (elementTop) {
              const positionY = elementTop - - this.contentWrapper.nativeElement.scrollTop -this.contentWrapper.nativeElement.getBoundingClientRect().top
              this.contentWrapper.nativeElement.scrollTo({top: positionY, behavior: 'smooth'})
            }
          }
          this.contentLoading.set(false);
        }).catch(err => {
          console.error(err)
          if (err.status === 404) {
            this.content.set(this.sanitizer.bypassSecurityTrustHtml('<i>Request for HTML file "'
              + currentRoute?.resource
              + '" was received but no asset found. Asset may be missing from build.</i>'))
          } else {
            throw err;
          }
        })
      });
    })
  }

  private parseRoutes(data: JSONNavigatableRoutes, routes?: NavigatableRoutesMap, parentKey?: string, depth?: number): NavigatableRoutesMap {
    if (!routes) {
      routes = {}
    }
    if (!depth) {
      depth = 1;
    }

    Object.keys(data).forEach(key => {
      let newKey = parentKey ? parentKey + '/' + key : key;

      if (typeof data[key] !== 'string') {
        routes[newKey] = {
          ...data[key],
          resource: data[key].resource ?? newKey + '.html',
          depth: depth
        };


        if (data[key].children) {
          this.parseRoutes(data[key].children, routes, newKey, depth + 1);
        }
      } else {
        routes[newKey] = {
          display_name: data[key],
          resource: newKey + '.html',
          depth: depth
        };
      }
    });
    return routes;
  }

  expandNavigation(route: string) {
    const viewableRoutes: string[] = [];
    const routes = this.routes() ?? {};
    const currentRoute: NavigatableRoute = routes[route];

    Object.keys(routes).filter(key => {
      const selectedRouteKey = currentRoute?.resource?.substring(0, currentRoute?.resource?.indexOf('.'));
      let selectableRoutes: string[] = [];

      if (selectedRouteKey) {
        selectableRoutes = [...selectedRouteKey!.matchAll(/\//g)]
          .map(match => match.index)
          .map(index => selectedRouteKey.substring(0, index));
        selectableRoutes = [selectedRouteKey, ...selectableRoutes]
      }
      this.expandedParents.set(selectableRoutes);

      let matcher: RegExpMatchArray | null;
      if (selectableRoutes.length == 0) {
        matcher = key.match('^[^/]+$');
      } else {
        const regexp = '^([^/]+|'
          + (selectableRoutes.length == 1
            ? selectableRoutes[0] + '/(.[^/]+)'
            : '(' + selectableRoutes.map(route => route + '/(.[^/]+)').join('|') + ')')
          + ')$';
        matcher = key.match(regexp);
      }
      return matcher != null;
    }).forEach(key => viewableRoutes.push(key));
    
    this.viewableRoutes.set(viewableRoutes);
  }

  retractNavigation(route: string) {
    const viewableRoutes = this.viewableRoutes();
    const expandedParents = this.expandedParents();
    
    this.viewableRoutes.set(viewableRoutes?.filter(key => !key.startsWith(route + '/')));
    this.expandedParents.set(expandedParents?.filter(key => key != route));
  }

  toggleNavbar() {
    this.navigation.nativeElement.classList.toggle('d-none');
    this.navigation.nativeElement.classList.toggle('d-flex');
    this.toggler.nativeElement.classList.toggle('d-block');
    this.main.nativeElement.classList.toggle('disabled');
  }

  openInNewWindow(url: string): void {
    window.open(url, '_blank');
  }

  protected readonly Object = Object;
}
