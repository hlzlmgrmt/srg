import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GmToolsComponent} from './gm-tools.component';

const routes: Routes = [
  { path: '', component: GmToolsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmToolsRoutingModule {
}
