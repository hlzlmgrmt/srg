import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {CharacterSheetModule} from './modules/character-sheet/character-sheet.module';
import {GmToolsModule} from './modules/gm-tools/gm-tools.module';
import {CharacterSheetComponent} from './modules/character-sheet/character-sheet.component';
import {GmToolsComponent} from './modules/gm-tools/gm-tools.component';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    GmToolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CharacterSheetModule,
    GmToolsModule,
    NgbModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
