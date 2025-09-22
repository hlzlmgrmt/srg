import {Component, effect, signal} from '@angular/core';
import {
  ArmorEntry,
  BodyTechEntry,
  BurdensEntry,
  CriticalInjuriesEntry,
  DescriptionEntry,
  GearEntry,
  GearEntryExtended,
  HeadingEntry,
  MagicFormulaeEntry,
  MatrixCyberprogramsEntry,
  MatrixDeviceEntry,
  TalentEntry,
  TextFieldEntry,
  WeaponEntry
} from './shared/entry/types';
import {
  DefenseMonitor,
  SoakMonitor,
  StimpatchMonitor,
  ThresholdMonitor,
  TotalMonitor,
  ValueMonitor
} from './shared/monitor/types';
import {Character, EMPTY_CHARACTER} from './types';

@Component({
  selector: 'srg-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  private readonly CHARACTER_DATA_SAVE_KEY = 'srg_character_data_b64';
  readonly character = signal<Character>(EMPTY_CHARACTER);

  constructor() {
    const savedCharacter = window.localStorage.getItem(this.CHARACTER_DATA_SAVE_KEY);
    if (savedCharacter) {
      this.character.set(JSON.parse(atob(savedCharacter)));
    }

    effect(() => {
      window.localStorage.setItem(this.CHARACTER_DATA_SAVE_KEY,
        btoa(JSON.stringify(this.character(), function (k, v) {
          return v === undefined ? null : v;
        }))
      );
    })
  }

  setData(key: string, event: [string, any]) {
    let character = structuredClone(this.character());
    character[key][event[0]] = event[1];
    this.character.set(character);
  }

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
