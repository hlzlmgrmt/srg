import {Component, input, output} from '@angular/core';
import {Glyph} from '../../../shared/glyph-pool/glyph-pool.component';
import {Characteristics} from '../../characteristics/types';
import {Skills, SkillsData} from '../types';

@Component({
  selector: 'srg-skill-table',
  templateUrl: './skill-table.component.html',
  styleUrl: './skill-table.component.css'
})
export class SkillTableComponent {
  readonly title = input<string | undefined>(undefined);
  readonly skills = input.required<Skills>();
  readonly characteristics = input.required<Characteristics>();
  readonly valueChanged = output<[string, SkillsData]>();

  calculateDicePool(key: string): Glyph[] {
    const result: Glyph[] = [];

    const skill: SkillsData = this.skills()[key];
    const skillValue: number = skill.value ?? 0;
    const charValue: number = this.characteristics()[skill.char] ?? 0;

    for (let i = 0; i < Math.min(skillValue, charValue); i++) {
      result.push('proficiency');
    }
    for (let i = Math.min(skillValue, charValue); i < Math.max(skillValue, charValue); i++) {
      result.push('ability');
    }

    return result;
  }

  changeValue(key: string, event: any, field: 'archetype_skill' | 'value') {
    if (event.target) {
      let skill = structuredClone(this.skills()[key]);
      skill[field] = field === 'archetype_skill' ? event.target.checked : event.target.value;
      this.valueChanged.emit([key, skill]);
    }
  }

  protected readonly Object = Object;

}
