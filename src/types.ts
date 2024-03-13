import { TimeConstants, Units } from './constants';

export type SingularPlural = {
  singular: string;
  plural?: string;
};

export type I18n = {
  week: SingularPlural;
  day: SingularPlural;
  hour: SingularPlural;
  minute: SingularPlural;
  second: SingularPlural;
  millisecond: SingularPlural;
  and: string;
};

export type Options = {
  precision: number;
  minUnit: Units;
  maxUnit: Units;
};

export type TimeComponents = {
  [key in Units]?: number;
};

export type UnitTimeMap = {
  [key in Units]: TimeConstants;
}

export type Bounds = {
  min: number;
  max: number;
};
