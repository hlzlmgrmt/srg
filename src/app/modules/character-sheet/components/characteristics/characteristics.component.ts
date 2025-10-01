import {Component, input, output} from '@angular/core';
import {Characteristic, Characteristics} from './types';

@Component({
  selector: 'srg-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrl: './characteristics.component.css'
})
export class CharacteristicsComponent {
  readonly characteristics = input.required<Characteristics>();
  readonly valueChanged = output<[Characteristic, number]>();

  getValue(key: string): number | undefined {
    return this.characteristics()[key as Characteristic];
  }

  changeValue(key: string, event: any) {
    if (event.target) {
      this.valueChanged.emit([key as Characteristic, event.target.value])
    }
  }

  protected readonly Object = Object;
}
