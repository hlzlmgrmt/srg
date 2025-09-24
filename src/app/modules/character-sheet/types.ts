import {Characteristics, EMPTY_CHARACTERISTICS} from './components/characteristics/types';
import {Skills, EMPTY_SKILLS} from './components/skills/types';
import {TalentPyramidData, EMPTY_TALENT_PYRAMID} from './components/talent-pyramid/types';

interface CharacterData {
  [key: string]: any;
}
export type Character = CharacterData & {
  characteristics: Characteristics
  skills: Skills
  talent_pyramid: TalentPyramidData
}


export const EMPTY_CHARACTER: Character = {
  characteristics: EMPTY_CHARACTERISTICS,
  skills: EMPTY_SKILLS,
  talent_pyramid: EMPTY_TALENT_PYRAMID
}
