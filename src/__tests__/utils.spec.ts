import { DefaultI18n, DefaultOptions } from '../constants';
import { getMergedDefaults, getHumanReadableList, pluralise, roundToDecimals } from '../utils';
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
  const valuesWithoutPlural = [
    [0, 'location', '0 locations'],
    [0.8, 'location', '0.8 locations'],
    [1, 'location', '1 location'],
    [1.2, 'location', '1.2 locations'],
    [2, 'location', '2 locations']
  ];
  const valuesWithPlural = [
    [0, 'ox', 'oxen', '0 oxen'],
    [1, 'ox', 'oxen', '1 ox'],
    [2, 'ox', 'oxen', '2 oxen']
  ];

  it.each(valuesWithoutPlural)("%d of '%s' should be '%s'", (number: number, singular: string, result: string) => {
    expect(pluralise(number, singular)).toBe(result);
  });

  it.each(valuesWithPlural)(
    "%d of '%s', '%s' should be '%s'",
    (number: number, singular: string, plural: string, result: string) => {
      expect(pluralise(number, singular, plural)).toBe(result);
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
    [1 / 3, 2, 0.33]
  ];

  it.each(values)('round to decimals of %d should be %d', (number: number, decimals: number, round: number) => {
    expect(roundToDecimals(number, decimals)).toBe(round);
  });
});
