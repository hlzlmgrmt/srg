import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WikiComponent} from './wiki.component';
import {WikiRoutingModule} from './wiki-routing.module';

@NgModule({
  declarations: [
    WikiComponent
  ],
  imports: [
    CommonModule,
    WikiRoutingModule
  ]
})
export class WikiModule { }
