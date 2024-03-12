import { Units } from './constants';

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
  [Units.WEEK]?: number;
  [Units.DAY]?: number;
  [Units.HOUR]?: number;
  [Units.MINUTE]?: number;
  [Units.SECOND]?: number;
  [Units.MILLISECOND]?: number;
};

export type Bounds = {
  min: number;
  max: number;
};
