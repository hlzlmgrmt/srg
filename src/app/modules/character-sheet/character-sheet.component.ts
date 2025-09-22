import { Component, signal } from '@angular/core';
import {
  ArmorEntry, BurdensEntry,
  CriticalInjuriesEntry,
  DescriptionEntry,
  HeadingEntry,
  WeaponEntry
} from './components/entry/types';
import {
  DefenseMonitor,
  FirewallMonitor,
  SoakMonitor,
  StrainMonitor,
  SystemStrainMonitor,
  WoundsMonitor
} from './shared/monitor/types';

@Component({
  selector: 'srg-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  protected page = signal<number>(1);

  protected readonly WeaponsEntry = WeaponEntry;
  protected readonly DescriptionEntry = DescriptionEntry;
  protected readonly ArmorEntry = ArmorEntry;
  protected readonly HeadingEntry = HeadingEntry;
  protected readonly CriticalInjuriesEntry = CriticalInjuriesEntry;
  protected readonly BurdensEntry = BurdensEntry;

  protected readonly WoundsMonitor = WoundsMonitor;
  protected readonly StrainMonitor = StrainMonitor;
  protected readonly SoakMonitor = SoakMonitor;
  protected readonly DefenseMonitor = DefenseMonitor;
  protected readonly SystemStrainMonitor = SystemStrainMonitor;
  protected readonly FirewallMonitor = FirewallMonitor;
}
