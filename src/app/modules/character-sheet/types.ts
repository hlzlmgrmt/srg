import {Characteristics, EMPTY_CHARACTERISTICS} from './components/characteristics/types';
import {Skills, EMPTY_SKILLS} from './components/skills/types';

interface CharacterData {
  [key: string]: any;
}
export type Character = CharacterData & {
  characteristics: Characteristics
  skills: Skills
}


export const EMPTY_CHARACTER: Character = {
  characteristics: EMPTY_CHARACTERISTICS,
  skills: EMPTY_SKILLS
}
