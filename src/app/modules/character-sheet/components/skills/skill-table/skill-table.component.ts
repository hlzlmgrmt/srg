import { Component, effect, input } from '@angular/core';
import { Glyph } from '../../glyph-pool/glyph-pool.component';


interface Skills {
  [key: string]: {
    "title": string,
    "char": string
  }
}
@Component({
  selector: 'srg-skill-table',
  templateUrl: './skill-table.component.html',
  styleUrl: './skill-table.component.css'
})
export class SkillTableComponent {
  readonly title = input<string | undefined>(undefined);
  readonly skills = input.required<Skills>();

  calculateDicePool(key: string): Glyph[] {
    return [];
  }

  protected readonly Object = Object;
}
