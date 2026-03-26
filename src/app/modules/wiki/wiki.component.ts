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
  encapsulation: ViewEncapsulation.None
})
export class WikiComponent {
  @ViewChild('navigation') navigation!: ElementRef<HTMLDivElement>;
  @ViewChild('navigationToggler') toggler!: ElementRef<HTMLButtonElement>;
  @ViewChild('main') main!: ElementRef<HTMLDivElement>;
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLDivElement>;

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
  protected selectedRoute = signal<string>('home');

  protected title = signal<string>('');
  protected content = signal<SafeHtml | undefined>(undefined);
  private readonly INSERT_SELECTOR: RegExp = /<ins.*id=".+".*>.*<\/ins>/g;

  readonly contentLoading = signal<boolean>(false);

  constructor() {
    this.httpClient.get<JSONNavigatableRoutes>('assets/pages/nav.json', {responseType: 'json'}).subscribe(data => {
      const parsedRoutes = this.parseRoutes(data);
      this.routes.set(parsedRoutes);
    })

    effect(() => {
      const routes = this.routes();
      const selectedRoute = this.selectedRoute();

      untracked(() => {
        const currentRoute = routes ? routes[this.selectedRoute()] : undefined;

        if (routes) {
          this.expandNavigation(routes, selectedRoute)
        }

        firstValueFrom(this.httpClient.get('assets/pages/' + currentRoute?.resource, {responseType: 'text'})).then(async data => {
          this.contentLoading.set(true);
          const parsedData = await this.parsePageContent(data, currentRoute)
          if (!this.navigation.nativeElement.classList.contains('d-none')) {
            this.toggleNavigation();
          }
          this.content.set(this.sanitizer.bypassSecurityTrustHtml(parsedData));
          this.contentWrapper.nativeElement.scrollTop = 0;
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

  private async parsePageContent(data: string, selectedRoute?: NavigatableRoute): Promise<string> {
    let result = (selectedRoute?.display_name && selectedRoute.display_name !== '' ?
      '<h' + (selectedRoute.depth ?? 1) + '>' + selectedRoute?.display_name + '</h' + (selectedRoute.depth ?? 1) + '>\n' : '') + data

    const insMatches = result.match(this.INSERT_SELECTOR);
    if (insMatches !== null) {
      await insMatches.reduce(async (promise, ins) => {
        await promise;
        const insPath = ins.match(/id="[^"]+"/)?.map(match =>
          match.substring('id=\"'.length, match.length - 1))[0] ?? '';
        const insContent = ins.match(/>.+<\/ins>/)?.map(match =>
          match.substring(match.indexOf('>') + 1, match.indexOf('<')))[0] ?? '';
        const insDepth: number = ins.match(/data-depth="[0-9]+"/)?.map(match =>
          Number.parseInt(match.substring('data-depth=\"'.length, match.length - 1)))[0] ?? (selectedRoute?.depth ?? 1) + 1

        await firstValueFrom(this.httpClient.get('assets/pages/' + insPath, {responseType: 'text'})).then(insData => {
          insData = (insContent !== '') ?
            '<h' + insDepth + '>' + insContent + '</h' + insDepth + '>\n' + insData : insData;

          result = result.replace(ins, insData ?? '');
        });

      }, Promise.resolve())
    }

    if (result.match(this.INSERT_SELECTOR)) {
      return this.parsePageContent(result, {
        ...selectedRoute,
        display_name: '',
        depth: (selectedRoute?.depth ?? 1) + 1
      });
    }
    return result;
  }

  expandNavigation(routes: NavigatableRoutesMap, route: string) {
    const viewableRoutes: string[] = [];
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

  toggleNavigation() {
    this.navigation.nativeElement.classList.toggle('d-none');
    this.navigation.nativeElement.classList.toggle('d-flex');
    this.toggler.nativeElement.classList.toggle('d-block');
    this.main.nativeElement.classList.toggle('disabled');
  }

  selectRoute(route: string) {
    this.selectedRoute.set(route);
  }

  openInNewWindow(url: string): void {
    window.open(url, '_blank');
  }

  protected readonly Object = Object;
}
