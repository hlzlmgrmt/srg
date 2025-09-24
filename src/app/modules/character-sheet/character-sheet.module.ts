import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterSheetRoutingModule} from './character-sheet-routing.module';
import {EntryComponent} from './shared/entry/entry.component';
import {Tracker} from './shared/tracker/tracker.component';
import {SectionComponent} from './shared/section/section.component';
import {CharacteristicsComponent} from './components/characteristics/characteristics.component';
import {SkillsComponent} from './components/skills/skills.component';
import {SkillTableComponent} from './components/skills/skill-table/skill-table.component';
import {GlyphPoolComponent} from './shared/glyph-pool/glyph-pool.component';
import {DiceSymbolsInfoComponent} from './components/dice-symbols-info/dice-symbols-info.component';
import {MonitorComponent} from './shared/monitor/monitor.component';
import {PortraitComponent} from './components/portrait/portrait.component';
import {TalentPyramidComponent} from './components/talent-pyramid/talent-pyramid.component';
import { PageControlComponent } from './components/page-control/page-control.component';

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
    PortraitComponent,
    TalentPyramidComponent,
    PageControlComponent,
  ],
  exports: [
    EntryComponent,
    SectionComponent,
    SkillsComponent,
    DiceSymbolsInfoComponent,
    MonitorComponent,
    CharacteristicsComponent,
    PortraitComponent,
    TalentPyramidComponent,
    PageControlComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule
]
})
export class CharacterSheetModule {
}
