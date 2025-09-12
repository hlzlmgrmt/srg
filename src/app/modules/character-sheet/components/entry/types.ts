import {Entry} from './entry.component';

export const HeadingEntry: Entry = [
  {
    "real_name": {caption: 'Real Name', type: 'text'},
    "player": {caption: 'Player', type: 'text'}
  },
  {
    "alias": {caption: 'Alias', type: 'text'},
    "concept": {caption: 'Concept', type: 'text'}
  }
]
export const DescriptionEntry: Entry = [
  {"metatype": {caption: 'Metatype', type: 'text'}},
  {"archetype": {caption: 'Archetype', type: 'text'}},
  {
    "gender": {caption: 'Gender', type: 'text'},
    "age": {caption: 'Age', type: 'text'}
  },
  {
    "height": {caption: 'Height', type: 'text'},
    "build": {caption: 'Build', type: 'text'}
  },
  {"features": {caption: 'Features', type: 'multiline-text'}},
  {"features": {type: 'multiline-text'}},
  {"features": {type: 'multiline-text'}},
  {"motivation": {caption: 'Motivation', type: 'multiline-text'}},
  {"motivation": {type: 'multiline-text'}},
  {"motivation": {type: 'multiline-text'}},
]
export const WeaponEntry: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text'},
    "skill": {caption: 'Skill', type: 'text'},
    "damage": {caption: 'Dam', type: 'number'},
    "crit": {caption: 'Crit', type: 'number'},
    "range": {caption: 'Range', type: 'text'},
    "encumbrance": {caption: 'Enc', type: 'number'},
    "hard_points": {caption: 'HP', type: 'number'},
  }, {
    "special": {caption: 'Special', type: 'text'},
    "condition": {caption: 'Cond', type: 'condition'}
  }
];
export const ArmorEntry: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text'},
    "defense": {caption: 'Defense', type: 'text'},
    "soak": {caption: 'Soak', type: 'text'},
    "encumbrance": {caption: 'Enc', type: 'number'},
    "hard_points": {caption: 'HP', type: 'number'},
  }, {
    "special": {caption: 'Special', type: 'text'},
    "condition": {caption: 'Cond', type: 'condition'}
  }
]
export const CriticalInjuriesEntry: Entry = [
  {
    "severity": {type: 'difficulty'},
    "description": {type: 'text'}
  }
]
export const BurdensEntry: Entry = [
  {
    "description": {type: 'text'},
    "size": {caption: 'Size', type: 'number'}
  }
]
