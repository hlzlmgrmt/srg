import {Component, input} from '@angular/core';

@Component({
  selector: 'srg-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  readonly title = input.required<string>();
  readonly depth = input<number | undefined>(undefined);
}
