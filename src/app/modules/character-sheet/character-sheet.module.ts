import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterSheetRoutingModule} from './character-sheet-routing.module';
import {EntryComponent} from './components/entry/entry.component';
import {Tracker} from './components/entry/tracker/tracker.component';
import {SectionComponent} from './components/section/section.component';
import {CharacteristicsComponent} from './components/characteristics/characteristics.component';
import {SkillsComponent} from './components/skills/skills.component';
import { SkillTableComponent } from './components/skills/skill-table/skill-table.component';
import { GlyphPoolComponent } from './components/glyph-pool/glyph-pool.component';
import { DiceSymbolsInfoComponent } from './components/dice-symbols-info/dice-symbols-info.component';
import { MonitorComponent } from './components/monitor/monitor.component';

@NgModule({
  declarations: [
    EntryComponent,
    Tracker,
    SectionComponent,
    CharacteristicsComponent,
    SkillsComponent,
    SkillTableComponent,
    GlyphPoolComponent,
    DiceSymbolsInfoComponent,
    MonitorComponent,
  ],
  exports: [
    EntryComponent,
    SectionComponent,
    SkillsComponent,
    DiceSymbolsInfoComponent,
    MonitorComponent,
    CharacteristicsComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule
]
})
export class CharacterSheetModule {
}
