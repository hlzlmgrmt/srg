import {Component, input, output} from '@angular/core';
import {Entry, EntryType} from './types';

export interface EntryData {
  [key: string]: any;
}

@Component({
  selector: 'srg-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
/**
 * Generic component for single entries (such as a single weapon entry, a single critical injury etc.)
 */
export class EntryComponent {
  readonly data = input<EntryData | undefined>(undefined);
  /**
   * Format of the EntryComponent. A single element in the array represents a single line in the entry.
   * Does not carry data.
   */
  readonly entryFormat = input.required<Entry>();
  readonly valueChanged = output<[string, any]>();

  /**
   * Cast input data to tracker value
   */
  toTrackerValue(key: string): number | undefined {
    return this.data() && !Number.isNaN(this.data()![key]) ?
      Number(this.data()![key]) : undefined;
  }

  getMultilineData(key: string, index: number): string | undefined {
    if (this.data()) {
      if (this.data()![key]) {
        const data = this.data()![key];
        if (!(typeof data == 'string' || typeof data == 'number' || typeof data == 'boolean')) {
         return this.data()![key][String(index)];
        }
      }
    }
    return undefined;
  }

  changeValue(key: string, event: any, field: EntryType, index?: number) {
    let data = structuredClone(this.data() ?? {});
    if (field == 'checkbox') {
      data[key] = event.target.checked;
    } else if (field.startsWith('tracker-')) {
      data[key] = Number(event);
    } else if (field == 'text-multiline') {
      if (!data[key]) {
        data[key] = {}
      }
      data[key][String(index ?? '0')] = event.target.value;
    } else {
      data[key] = event.target.value;
    }

    this.valueChanged.emit([key, data[key]]);
  }

  protected readonly Object = Object;
}
