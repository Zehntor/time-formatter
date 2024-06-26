import { DefaultI18n, DefaultOptions, Units } from '../constants';
import { convertTime, getHumanReadableList, getMergedDefaults, pluralise, roundToDecimals } from '../utils';
import { I18n, Options } from '../types';

describe('getMergedDefaults', () => {
  it('should merge the options', () => {
    const result: Options = getMergedDefaults(DefaultOptions, { precision: 2 });
    expect(result.precision).toBe(2);
  });

  it('should merge incomplete i18n', () => {
    const incompleteI18n: Partial<I18n> = {
      millisecond: {
        singular: 'ms'
      }
    };

    const result: I18n = getMergedDefaults(DefaultI18n, incompleteI18n);

    expect(result).toStrictEqual({
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
        singular: 'ms'
      },
      microsecond: {
        singular: 'microsecond'
      },
      and: 'and'
    });
  });
});

describe('getHumanReadableList', () => {
  const values = [
    [['apples', 'pears', 'bananas'], 'apples, pears and bananas'],
    [['mangoes', 'guavas'], 'mangoes and guavas'],
    [['quinces'], 'quinces'],
    [[], ''],
    ['', '']
  ];

  it.each(values)("human readable of %s should be '%s'", (list: string[], result: string) => {
    expect(getHumanReadableList(list)).toBe(result);
  });

  it('should respect the glue', () => {
    expect(getHumanReadableList(['strawberries', 'raspberries'], 'or')).toBe('strawberries or raspberries');
  });
});

describe('pluralise', () => {
  const values = [
    [0, 'location', undefined, true, '0 locations'],
    [0.8, 'location', undefined, true, '0.8 locations'],
    [1, 'location', undefined, true, '1 location'],
    [1.2, 'location', undefined, true, '1.2 locations'],
    [2, 'location', undefined, true, '2 locations'],
    [0, 'ox', 'oxen', true, '0 oxen'],
    [1, 'ox', 'oxen', true, '1 ox'],
    [2, 'ox', 'oxen', true, '2 oxen'],

    [0, 'location', undefined, false, 'locations'],
    [0.8, 'location', undefined, false, 'locations'],
    [1, 'location', undefined, false, 'location'],
    [1.2, 'location', undefined, false, 'locations'],
    [2, 'location', undefined, false, 'locations'],
    [0, 'ox', 'oxen', false, 'oxen'],
    [1, 'ox', 'oxen', false, 'ox'],
    [2, 'ox', 'oxen', false, 'oxen']
  ];

  it.each(values)(
    "plural of ('%d', '%s', '%s', '%s') should be '%s'",
    (number: number, singular: string, plural: string, includeNumber: boolean, result: string) => {
      expect(pluralise(number, singular, plural, includeNumber)).toBe(result);
    }
  );
});

describe('roundToDecimals', () => {
  const values = [
    [0, 0, 0],
    [4.2, 0, 4],
    [6.2135, 2, 6.21],
    [6.39, 1, 6.4],
    [Math.PI, 4, 3.1416],
    [-Math.E, 6, -2.718282],
    [1 / 3, 2, 0.33],
    [1.005, 2, 1.01],
    [1.255, 2, 1.26]
  ];

  it.each(values)('round to decimals of %d should be %d', (number: number, decimals: number, result: number) => {
    expect(roundToDecimals(number, decimals)).toBe(result);
  });
});

describe('convertTime', () => {
  const values = [
    [1, Units.MICROSECOND, Units.MILLISECOND, 1e-3],
    [1, Units.MILLISECOND, Units.SECOND, 1e-3],

    [1, Units.WEEK, Units.DAY, 7],
    [1, Units.DAY, Units.HOUR, 24],
    [1, Units.HOUR, Units.MINUTE, 60],
    [1, Units.MINUTE, Units.SECOND, 60],
    [1, Units.SECOND, Units.MILLISECOND, 1e3],
    [1, Units.MILLISECOND, Units.MICROSECOND, 1e3],

    [1, Units.MINUTE, Units.SECOND, 60],
    [1, Units.HOUR, Units.SECOND, 3600]
  ];

  it.each(values)(
    '%d %s converted to %s should be %d',
    (time: number, from: Units, to: Units, expectedResult: number) => {
      const result: number = convertTime(time, from, to);
      expect(Math.abs(result - expectedResult)).toBeLessThan(1e3 * Number.EPSILON);
    }
  );
});
