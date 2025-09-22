export type EntryType =
  'text'                    // Basic text, spaced equally (between all texts in a line)
  | 'text-main'             // Main text of a line, takes at least 1/3 of available space.
  | 'text-multiline'        // Text spanning across multiple lines, that must be defined in each new line (without a caption)
  | 'number'                // Basic numeric input with fixed width.
  | 'number-signed'         // Numeric input allowing signs (+ or -). 0 can be proceeded with '+'.
  | 'number-positive'       // Non-nullable and non-negative numeric input with fixed width.
  | 'number-double'         // Two basic numeric inputs (armor -> defense as special case)
  | 'checkbox'              // Stylized checkbox
  | 'tracker-condition'     // Condition tracker with three boxes, numerical output
  | 'tracker-difficulty';   // Difficulty tracker with five diamonds, numerical output
interface SingleEntry {
  [key: string]: {
    caption?: string,
    type: EntryType
  }
}
export type Entry = SingleEntry[];

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
  {"features": {caption: 'Features', type: 'text-multiline'}},
  {"features": {type: 'text-multiline'}},
  {"features": {type: 'text-multiline'}},
  {"motivation": {caption: 'Motivation', type: 'text-multiline'}},
  {"motivation": {type: 'text-multiline'}},
  {"motivation": {type: 'text-multiline'}},
]
export const WeaponEntry: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text-main'},
    "skill": {caption: 'Skill', type: 'text'},
    "damage": {caption: 'Dam', type: 'number-signed'},
    "crit": {caption: 'Crit', type: 'number'},
    "range": {caption: 'Range', type: 'text'},
    "encumbrance": {caption: 'Enc', type: 'number'},
    "hard_points": {caption: 'HP', type: 'number'},
  }, {
    "special": {caption: 'Special', type: 'text'},
    "condition": {caption: 'Cond', type: 'tracker-condition'}
  }
];
export const ArmorEntry: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text-main'},
    "defense": {caption: 'Defense', type: 'number-double'},
    "soak": {caption: 'Soak', type: 'number'},
    "encumbrance": {caption: 'Enc', type: 'number'},
    "hard_points": {caption: 'HP', type: 'number'},
  }, {
    "special": {caption: 'Special', type: 'text'},
    "condition": {caption: 'Cond', type: 'tracker-condition'}
  }
]
export const CriticalInjuriesEntry: Entry = [
  {
    "severity": {type: 'tracker-difficulty'},
    "description": {type: 'text'}
  }
]
export const BurdensEntry: Entry = [
  {
    "description": {type: 'text'},
    "size": {caption: 'Size', type: 'number'}
  }
]
export const GearEntry: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text'},
    "amount": {caption: 'Amt', type: 'number'},
    "encumbrance": {caption: 'Enc', type: 'number'},
  }
]
export const GearEntryExtended: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text'},
    "encumbrance": {caption: 'Enc', type: 'number'}
  }, {
    "description": {caption: 'Desc', type: 'text'},
    "condition": {caption: 'Cond', type: 'tracker-condition'}
  }
]
export const BodyTechEntry: Entry = [
  {
    "name": {type: 'text'},
    "essence": {caption: 'Ess', type: 'number'},
    "hard_points": {caption: 'HP', type: 'number'},
  }, {
    "description": {caption: 'Desc', type: 'text-multiline'}
  }, {
    "description": {type: 'text-multiline'},
    "condition": {caption: 'Cond', type: 'tracker-condition'}
  }
]
export const MatrixDeviceEntry: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text'},
    "firewall": {caption: 'FW', type: 'number'}
  }, {
    "special": {caption: "Special", type: 'text-multiline'}
  }, {
    "special": {type: 'text-multiline'}
  }, {
    "special": {type: 'text-multiline'}
  }, {
    "special": {type: 'text-multiline'},
    "encumbrance": {caption: 'Enc', type: 'number'},
    "hard_points": {caption: 'HP', type: 'number'}
  }
]
export const MatrixCyberprogramsEntry: Entry = [
  {
    "equipped": {type: 'checkbox'},
    "name": {type: 'text'}
  }, {
    "description": {caption: 'Desc', type: 'text'}
  }
]
export const MagicFormulaeEntry: Entry = [
  {
    "name": {type: 'text'},
    "base": {caption: 'Base', type: 'text'}
  }, {
    "special": {caption: 'Special', type: 'text'},
    "difficulty": {caption: 'Diff', type: 'tracker-difficulty'}
  }
]
export const TalentEntry: Entry = [
  {
    "name": {type: 'text'},
    "active": {caption: 'Act', type: 'text'}
  }, {
    "description": {caption: 'Desc', type: 'text-multiline'}
  }, {
    "description": {type: 'text-multiline'},
    "tier": {caption: 'Tier', type: 'number-positive'},
    "rank": {caption: 'Rank', type: 'number-positive'}
  }
]

export function TextFieldEntry(lines: number): Entry {
  return new Array(lines).fill({"text": {type: 'text-multiline'}});
}
