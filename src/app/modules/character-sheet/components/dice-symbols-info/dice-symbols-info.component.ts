import { Component } from '@angular/core';
import { Glyph } from '../../shared/glyph-pool/glyph-pool.component';

@Component({
  selector: 'srg-dice-symbols-info',
  templateUrl: './dice-symbols-info.component.html',
  styleUrl: './dice-symbols-info.component.css'
})
export class DiceSymbolsInfoComponent {

  asDiceSymbol(dice: string): Glyph {
    return (dice as Glyph);
  }

  protected readonly Array = Array;
}
