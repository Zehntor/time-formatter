import { I18n, Options, UnitTimeMap } from './types';

// To be exported
export enum Units {
  WEEK = 'week',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
  MILLISECOND = 'millisecond',
  MICROSECOND = 'microsecond'
}

export enum TimeConstants {
  ONE_WEEK = 604800,
  ONE_DAY = 86400,
  ONE_HOUR = 3600,
  ONE_MINUTE = 60,
  ONE_SECOND = 1,
  ONE_MILLISECOND = 1e-3,
  ONE_MICROSECOND = 1e-6
}

// Private
export const DefaultUnitTimeMap: UnitTimeMap = {
  [Units.WEEK]: TimeConstants.ONE_WEEK,
  [Units.DAY]: TimeConstants.ONE_DAY,
  [Units.HOUR]: TimeConstants.ONE_HOUR,
  [Units.MINUTE]: TimeConstants.ONE_MINUTE,
  [Units.SECOND]: TimeConstants.ONE_SECOND,
  [Units.MILLISECOND]: TimeConstants.ONE_MILLISECOND,
  [Units.MICROSECOND]: TimeConstants.ONE_MICROSECOND
};

export const DefaultOptions: Options = {
  precision: 3,
  minUnit: Units.MILLISECOND,
  maxUnit: Units.WEEK
};

export const DefaultI18n: I18n = {
  [Units.WEEK]: {
    singular: 'week'
  },
  [Units.DAY]: {
    singular: 'day'
  },
  [Units.HOUR]: {
    singular: 'hour'
  },
  [Units.MINUTE]: {
    singular: 'minute'
  },
  [Units.SECOND]: {
    singular: 'second'
  },
  [Units.MILLISECOND]: {
    singular: 'millisecond'
  },
  [Units.MICROSECOND]: {
    singular: 'microsecond'
  },
  and: 'and'
};
