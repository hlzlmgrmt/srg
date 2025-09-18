import { Component, signal } from '@angular/core';
import {
  ArmorEntry, BurdensEntry,
  CriticalInjuriesEntry,
  DescriptionEntry,
  HeadingEntry,
  WeaponEntry
} from './components/entry/types';

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
}
