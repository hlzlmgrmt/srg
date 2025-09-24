import {Component, input, output} from '@angular/core';
import {TalentPyramidData, TalentTier} from './types';


@Component({
  selector: 'srg-talent-pyramid',
  templateUrl: './talent-pyramid.component.html',
  styleUrl: './talent-pyramid.component.css'
})
export class TalentPyramidComponent {
  readonly talentPyramidData = input.required<TalentPyramidData>();
  protected readonly valueChanged = output<[string, number]>();
  /**
   * How many steps are selectable in the 5th tier
   */
  protected readonly finalTierAmount: number = 10;

  getValue(index: number): number | undefined {
    return this.talentPyramidData()[(index + 1) as TalentTier];
  }

  protected readonly Array = Array;
}
