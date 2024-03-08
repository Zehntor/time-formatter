import { Options } from './types';

export enum TimeConstants {
  ONE_WEEK = 604800,
  ONE_DAY = 86400,
  ONE_HOUR = 3600,
  ONE_MINUTE = 60,
  ONE_SECOND = 1,
  ONE_MILLISECOND = 1e-3
}

export const DefaultOptions: Options = {
  precision: 3,
  useOnlyMillisWhenUnderOneSecond: true,
  i18n: {
    week: {
      singular: 'week'
    },
    day: {
      singular: 'day'
    },
    hour: {
      singular: 'hour'
    },
    minute: {
      singular: 'minute'
    },
    second: {
      singular: 'second'
    },
    millisecond: {
      singular: 'millisecond'
    },
    and: 'and'
  }
};
