import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GmToolsModule} from './modules/gm-tools/gm-tools.module';

const routes: Routes = [
  { path: '', loadChildren: () =>
      import('./modules/wiki/wiki.module').then(m => m.WikiModule)},
  { path: 'character-sheet', loadChildren: () =>
      import('./modules/character-sheet/character-sheet.module').then(m => m.CharacterSheetModule)},
  { path: 'gm-tools', loadChildren:() =>
      import('./modules/gm-tools/gm-tools.module').then(m => m.GmToolsModule)},
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
