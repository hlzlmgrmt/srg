import {Component, input} from '@angular/core';

@Component({
    selector: 'srg-section',
    templateUrl: './section.component.html',
    styleUrl: './section.component.css',
    standalone: false
})
export class SectionComponent {
  readonly title = input.required<string>();
  readonly depth = input<number | undefined>(undefined);
}
