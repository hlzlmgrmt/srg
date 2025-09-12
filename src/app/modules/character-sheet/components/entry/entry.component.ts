import {Component, input, output} from '@angular/core';

interface SingleEntry {
  [key:string]: {
    caption?: string,
    type: 'text' | 'multiline-text' | 'number' | 'checkbox' | 'condition' | 'difficulty'
  }
}
export type Entry = SingleEntry[];
export interface EntryData {
  [key:string]: string | number | boolean;
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
  readonly onValueChange = output<EntryData>()

  protected readonly Object = Object;
}
