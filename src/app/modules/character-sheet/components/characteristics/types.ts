export type Characteristic = 'brawn' | 'reflexes' | 'intellect' | 'cunning' | 'willpower' | 'presence';

export type Characteristics = {
  [key in Characteristic]: number | undefined;
};

export const EMPTY_CHARACTERISTICS = {
  "brawn": undefined,
  "reflexes": undefined,
  "intellect": undefined,
  "cunning": undefined,
  "willpower": undefined,
  "presence": undefined,
}
