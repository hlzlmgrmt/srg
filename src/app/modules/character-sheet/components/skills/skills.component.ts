import { Component } from '@angular/core';
import { Skills } from './types';

@Component({
  selector: 'srg-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  protected readonly skills = Skills;
  
  protected readonly Object = Object;
}
