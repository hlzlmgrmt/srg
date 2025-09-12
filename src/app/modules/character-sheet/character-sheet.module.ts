import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterSheetRoutingModule} from './character-sheet-routing.module';
import {EntryComponent} from './components/entry/entry.component';
import {Tracker} from './components/entry/tracker/tracker.component';
import {SectionComponent} from './components/section/section.component';
import {CharacteristicsComponent} from './components/characteristics/characteristics.component';
import {SkillsComponent} from './components/skills/skills.component';

@NgModule({
  declarations: [
    EntryComponent,
    Tracker,
    SectionComponent,
    CharacteristicsComponent,
    SkillsComponent,
  ],
  exports: [
    EntryComponent,
    SectionComponent,
    SkillsComponent,
    CharacteristicsComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule
  ]
})
export class CharacterSheetModule {
}
