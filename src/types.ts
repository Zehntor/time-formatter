import { TimeConstants, Units } from './constants';

// To be exported
export type Options = {
  precision: number;
  minUnit: Units;
  maxUnit: Units;
};

export type I18n = {
  week: SingularPlural;
  day: SingularPlural;
  hour: SingularPlural;
  minute: SingularPlural;
  second: SingularPlural;
  millisecond: SingularPlural;
  microsecond: SingularPlural;
  and: string;
};

export type SingularPlural = {
  singular: string;
  plural?: string;
};

// Private
export type TimeComponents = {
  [key in Units]?: number;
};

export type UnitTimeMap = {
  [key in Units]: TimeConstants;
};

export type Bounds = {
  min: number;
  max: number;
};
