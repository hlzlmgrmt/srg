import {Component, input, output} from '@angular/core';


export type MonitorData = {
  [key: string]: number;
}
export type Monitor = {
  [key: string]: string;
}
@Component({
  selector: 'srg-monitor',
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent {
  readonly data = input<MonitorData>();
  readonly monitorFormat = input.required<Monitor>();

  readonly valueChanged = output<[string, number]>();


  changeValue(key: string, event: any) {
    if (event.target) {
      const data = structuredClone(this.data() ?? {});
      data[key] = event.target.value;
      this.valueChanged.emit([key, data[key]])
    }
  }

  protected readonly Object = Object;
  protected readonly Math = Math;

}
