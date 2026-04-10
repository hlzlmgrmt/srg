import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WikiComponent} from './wiki.component';
import {WikiRoutingModule} from './wiki-routing.module';
import { ContentComponent } from './content/content.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    WikiComponent,
    ContentComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    WikiRoutingModule,
  ]
})
export class WikiModule { }
