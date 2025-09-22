import {Component} from '@angular/core';
import {
  ArmorEntry, BodyTechEntry,
  BurdensEntry,
  CriticalInjuriesEntry,
  DescriptionEntry, GearEntry, GearEntryExtended, TextFieldEntry,
  HeadingEntry, MagicFormulaeEntry, MatrixCyberprogramsEntry, MatrixDeviceEntry,
  WeaponEntry, TalentEntry
} from './shared/entry/types';
import {
  DefenseMonitor,
  SoakMonitor,
  StimpatchMonitor,
  ThresholdMonitor,
  TotalMonitor,
  ValueMonitor
} from './shared/monitor/types';

@Component({
  selector: 'srg-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  protected readonly WeaponsEntry = WeaponEntry;
  protected readonly DescriptionEntry = DescriptionEntry;
  protected readonly ArmorEntry = ArmorEntry;
  protected readonly HeadingEntry = HeadingEntry;
  protected readonly CriticalInjuriesEntry = CriticalInjuriesEntry;
  protected readonly BurdensEntry = BurdensEntry;
  protected readonly GearEntry = GearEntry;
  protected readonly GearEntryExtended = GearEntryExtended;
  protected readonly BodyTechEntry = BodyTechEntry;
  protected readonly MatrixDeviceEntry = MatrixDeviceEntry;
  protected readonly MatrixCyberprogramsEntry = MatrixCyberprogramsEntry;
  protected readonly MagicFormulaeEntry = MagicFormulaeEntry;
  protected readonly TalentEntry = TalentEntry;
  protected readonly TextFieldEntry = TextFieldEntry;


  protected readonly ValueMonitor = ValueMonitor;
  protected readonly ThresholdMonitor = ThresholdMonitor;
  protected readonly TotalMonitor = TotalMonitor;
  protected readonly SoakMonitor = SoakMonitor;
  protected readonly DefenseMonitor = DefenseMonitor;
  protected readonly StimpatchMonitor = StimpatchMonitor;

  protected readonly Array = Array;
}
