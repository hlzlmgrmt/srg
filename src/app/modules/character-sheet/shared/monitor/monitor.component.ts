import {Component, input} from '@angular/core';
import {round} from '@popperjs/core/lib/utils/math';

export interface Monitor {
  [key: string]: string;
}
@Component({
  selector: 'srg-monitor',
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent {
  readonly monitorFormat = input.required<Monitor>();

  protected readonly Object = Object;
  protected readonly Math = Math;
  protected readonly round = round;
}
