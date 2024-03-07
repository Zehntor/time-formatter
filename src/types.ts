type SingularPlural = {
  singular: string;
  plural?: string;
};

type I18n = {
  week?: SingularPlural;
  day?: SingularPlural;
  hour?: SingularPlural;
  minute?: SingularPlural;
  second?: SingularPlural;
  millisecond?: SingularPlural;
  and?: string;
};

export type Options = {
  precision: number;
  i18n: I18n;
};

export type TimeComponents = {
  week?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
};

export type Bounds = {
  min: number;
  max: number;
};
