export type TalentTier = 1 | 2 | 3 | 4 | 5;
export type TalentPyramidData = {
  [key in TalentTier]: number | undefined;
};
export const EMPTY_TALENT_PYRAMID = {
  "1": undefined,
  "2": undefined,
  "3": undefined,
  "4": undefined,
  "5": undefined
};
