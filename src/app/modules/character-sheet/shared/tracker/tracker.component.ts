import {Component, effect, input, output, signal} from '@angular/core';

@Component({
  selector: 'srg-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class Tracker {
  readonly type = input.required<'condition' | 'difficulty'>()
  readonly data = input<number | undefined>(undefined);

  readonly trackedValue = signal<number>(0);
  readonly valueChanged = output<number>();

  protected steps: number = 0;

  constructor() {
    effect(() => {
      this.steps = this.type() == 'condition' ? 3 : 5;
    })
  }

  setTrackedValue(newValue: number) {
    if (newValue == this.trackedValue()) {
      newValue = newValue - 1;
    }
    this.trackedValue.set(newValue);
    this.valueChanged.emit(this.trackedValue());
  }

  protected readonly Array = Array;
}
