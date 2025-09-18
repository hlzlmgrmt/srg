import { Component, input } from '@angular/core';

export type Glyph = 'proficiency' | 'ability' | 'boost' | 'challenge' | 'difficulty' | 'setback' | 'power' | 'success' | 'advantage' | 'triumph' | 'failure' | 'threat' | 'despair' |'dot-light' | 'dot-dark';
@Component({
  selector: 'srg-glyph-pool',
  templateUrl: './glyph-pool.component.html',
  styleUrl: './glyph-pool.component.css'
})
export class GlyphPoolComponent {
  readonly glyphPool = input<Glyph[] | undefined>(undefined);
}
