import {Characteristic} from '../characteristics/types';

export type SkillGroup = 'general' | 'knowledge' | 'combat' | 'magical';
export type SkillsData = {
  title: string,
  char: Characteristic,
  group: SkillGroup,
  value?: number,
  archetype_skill?: boolean,
  custom_skill?: boolean
}
export type Skills = {
  [key: string]: SkillsData;
}

export const EMPTY_SKILLS: Skills = {
  "athletics": {
    "title": "Athletics",
    "char": 'brawn',
    "group": 'general'
  },
  "charm": {
    "title": "Charm",
    "char": 'presence',
    "group": 'general'
  },
  "coercion": {
    "title": "Coercion",
    "char": 'willpower',
    "group": 'general'
  },
  "computers": {
    "title": "Computers",
    "char": 'intellect',
    "group": 'general'
  },
  "cool": {
    "title": "Cool",
    "char": 'presence',
    "group": 'general'
  },
  "coordination": {
    "title": "Coordination",
    "char": 'reflexes',
    "group": 'general'
  },
  "deception": {
    "title": "Deception",
    "char": 'cunning',
    "group": 'general'
  },
  "discipline": {
    "title": "Discipline",
    "char": 'willpower',
    "group": 'general'
  },
  "leadership": {
    "title": "Leadership",
    "char": 'presence',
    "group": 'general'
  },
  "mechanics": {
    "title": "Mechanics",
    "char": 'intellect',
    "group": 'general'
  },
  "medicine": {
    "title": "Medicine",
    "char": 'intellect',
    "group": 'general'
  },
  "navigation": {
    "title": "Navigation",
    "char": 'intellect',
    "group": 'general'
  },
  "negotiation": {
    "title": "Negotiation",
    "char": 'presence',
    "group": 'general'
  },
  "operating": {
    "title": "Operating",
    "char": 'intellect',
    "group": 'general'
  },
  "perception": {
    "title": "Perception",
    "char": 'cunning',
    "group": 'general'
  },
  "pilot": {
    "title": "Pilot",
    "char": 'reflexes',
    "group": 'general'
  },
  "resilience": {
    "title": "Resilience",
    "char": 'brawn',
    "group": 'general'
  },
  "skulduggery": {
    "title": "Skulduggery",
    "char": 'cunning',
    "group": 'general'
  },
  "stealth": {
    "title": "Stealth",
    "char": 'reflexes',
    "group": 'general'
  },
  "streetwise": {
    "title": "Streetwise",
    "char": 'cunning',
    "group": 'general'
  },
  "survival": {
    "title": "Survival",
    "char": 'cunning',
    "group": 'general'
  },
  "vigilance": {
    "title": "Vigilance",
    "char": 'willpower',
    "group": 'general'
  },
  "corporate": {
    "title": "Corporate",
    "char": 'intellect',
    "group": 'knowledge'

  },
  "education": {
    "title": "Education",
    "char": 'intellect',
    "group": 'knowledge'
  },
  "history": {
    "title": "History",
    "char": 'intellect',
    "group": 'knowledge'
  },
  "magic": {
    "title": "Magic",
    "char": 'intellect',
    "group": 'knowledge'
  },
  "society": {
    "title": "Society",
    "char": 'intellect',
    "group": 'knowledge'
  },
  "street": {
    "title": "Street",
    "char": 'intellect',
    "group": 'knowledge'
  },
  "brawl": {
    "title": "Brawl",
    "char": 'brawn',
    "group": 'combat'
  },
  "melee": {
    "title": "Melee",
    "char": 'brawn',
    "group": 'combat'
  },
  "ranged_light": {
    "title": "Ranged (Light)",
    "char": 'reflexes',
    "group": 'combat'
  },
  "ranged_heavy": {
    "title": "Ranged (Heavy)",
    "char": 'reflexes',
    "group": 'combat'
  },
  "gunnery": {
    "title": "Gunnery",
    "char": 'reflexes',
    "group": 'combat'
  },
  "hacking": {
    "title": "Hacking",
    "char": 'intellect',
    "group": 'combat'
  },
  "mysticism": {
    "title": "Mysticism",
    "char": 'willpower',
    "group": 'magical'
  },
  "spellcasting": {
    "title": "Spellcasting",
    "char": 'willpower',
    "group": 'magical'
  },
  "summoning": {
    "title": "Summoning",
    "char": 'willpower',
    "group": 'magical'
  },
  "qi_magic": {
    "title": "Qi-Magic",
    "char": 'willpower',
    "group": 'magical'
  },
  "resonance": {
    "title": "Resonance",
    "char": 'willpower',
    "group": 'magical'
  }
}
