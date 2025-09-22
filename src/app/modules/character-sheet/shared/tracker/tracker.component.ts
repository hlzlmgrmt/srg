import {Component, input, output, signal} from '@angular/core';

@Component({
  selector: 'srg-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class Tracker {
  readonly type = input.required<'condition' | 'difficulty' | 'box'>()
  readonly steps  = input.required<number>();
  readonly data = input<number | undefined>(undefined);

  readonly trackedValue = signal<number>(0);
  readonly valueChanged = output<number>();

  setTrackedValue(newValue: number) {
    if (newValue == this.trackedValue()) {
      newValue = newValue - 1;
    }
    this.trackedValue.set(newValue);
    this.valueChanged.emit(this.trackedValue());
  }

  protected readonly Array = Array;
}
