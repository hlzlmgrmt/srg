import {Component, effect, input, output} from '@angular/core';

@Component({
  selector: 'srg-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class Tracker {
  readonly type = input.required<'condition' | 'difficulty'>()
  readonly data = input<number | undefined>(undefined);
  readonly valueChanged= output<number>();

  protected steps: number = 0;

  constructor() {
    effect(() => {
      this.steps = this.type() == 'condition' ? 3 : 5;
    })}

  protected readonly Array = Array;
}
