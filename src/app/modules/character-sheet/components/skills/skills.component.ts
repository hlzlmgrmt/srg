import {Component, input, output} from '@angular/core';
import {SkillGroup, Skills, SkillsData} from './types';
import {Characteristics} from '../characteristics/types';

@Component({
  selector: 'srg-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  readonly skills = input.required<Skills>()
  readonly characteristics = input.required<Characteristics>();
  readonly valueChanged = output<[string, SkillsData]>()

  getSkillsForGroup(group: SkillGroup): Skills {
    const result: Skills = {};
    Object.keys(this.skills()).forEach(key => {
      const skill = this.skills()[key];
      if (skill.group === group) {
        result[key] = skill;
      }
    })
    return result;
  }

  protected readonly Object = Object;
}
