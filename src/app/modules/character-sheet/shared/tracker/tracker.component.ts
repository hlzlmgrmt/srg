import {Component, effect, input, output, signal, untracked} from '@angular/core';

@Component({
  selector: 'srg-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class Tracker {
  readonly type = input.required<'condition' | 'difficulty' | 'box'>()
  readonly steps  = input.required<number>();
  readonly value = input<number | undefined>(undefined);

  readonly trackedValue = signal<number>(0);
  readonly valueChanged = output<number>();

  constructor() {
    effect(() => {
      const value = this.value();
      untracked(() => {
        this.trackedValue.set(value ?? 0);
      })
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
