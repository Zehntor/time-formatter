import formatTime from '../index';
import {TimeConstants, Units} from '../constants';
import {I18n, Options} from '../types';

const { ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_SECOND, ONE_MILLISECOND, ONE_MICROSECOND } = TimeConstants;
const allFactors = [ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_SECOND, ONE_MILLISECOND, ONE_MICROSECOND];

const sumAll = numbers => numbers.reduce((acc, value) => acc + value, 0);

describe('formatTime', () => {
  describe('singular round values', () => {
    const values = [
      [ONE_WEEK, '1 week'],
      [ONE_DAY, '1 day'],
      [ONE_HOUR, '1 hour'],
      [ONE_MINUTE, '1 minute'],
      [ONE_SECOND, '1 second'],
      [0, '0 seconds'],
      [ONE_MILLISECOND, '1 millisecond'],
      [ONE_MICROSECOND, '1 microsecond']
    ];
    const options: Partial<Options> = { minUnit: Units.MICROSECOND };

    it.each(values)("formated time of %d should be '%s'", (time: number, human: string) => {
      expect(formatTime(time, options)).toBe(human);
    });
  });

  describe('plural round values', () => {
    const values = [
      [2 * ONE_WEEK, '2 weeks'],
      [2 * ONE_DAY, '2 days'],
      [2 * ONE_HOUR, '2 hours'],
      [2 * ONE_MINUTE, '2 minutes'],
      [2, '2 seconds'],
      [2 * ONE_MILLISECOND, '2 milliseconds'],
      [2 * ONE_MICROSECOND, '2 microseconds']
    ];
    const options: Partial<Options> = { minUnit: Units.MICROSECOND };

    it.each(values)("formated time of %d should be '%s'", (time: number, human: string) => {
      expect(formatTime(time, options)).toBe(human);
    });
  });

  it('should convert one of each', () => {
    const oneOfEach: number = sumAll(allFactors);
    const options: Partial<Options> = { minUnit: Units.MICROSECOND };
    expect(formatTime(oneOfEach, options)).toBe(
      '1 week, 1 day, 1 hour, 1 minute, 1 second, 1 millisecond and 1 microsecond'
    );
  });

  it('should convert 2 of each', () => {
    const twoOfEach: number = sumAll(allFactors.map(n => n * 2));
    expect(formatTime(twoOfEach, { minUnit: Units.MICROSECOND })).toBe(
      '2 weeks, 2 days, 2 hours, 2 minutes, 2 seconds, 2 milliseconds and 2 microseconds'
    );
  });

  it('should convert singular increments', () => {
    let time = 0;

    time += ONE_WEEK;
    expect(formatTime(time)).toBe('1 week');

    time += ONE_DAY;
    expect(formatTime(time)).toBe('1 week and 1 day');

    time += ONE_HOUR;
    expect(formatTime(time)).toBe('1 week, 1 day and 1 hour');

    time += ONE_MINUTE;
    expect(formatTime(time)).toBe('1 week, 1 day, 1 hour and 1 minute');

    time += ONE_SECOND;
    expect(formatTime(time)).toBe('1 week, 1 day, 1 hour, 1 minute and 1 second');

    time += ONE_MILLISECOND;
    expect(formatTime(time)).toBe('1 week, 1 day, 1 hour, 1 minute, 1 second and 1 millisecond');
  });

  it('should convert plural increments', () => {
    let time = 0;

    time += 2 * (ONE_WEEK + ONE_DAY);
    expect(formatTime(time)).toBe('2 weeks and 2 days');

    time += 2 * ONE_HOUR;
    expect(formatTime(time)).toBe('2 weeks, 2 days and 2 hours');

    time += 2 * ONE_MINUTE;
    expect(formatTime(time)).toBe('2 weeks, 2 days, 2 hours and 2 minutes');

    time += 2;
    expect(formatTime(time)).toBe('2 weeks, 2 days, 2 hours, 2 minutes and 2 seconds');

    time += 2 * ONE_MILLISECOND;
    expect(formatTime(time)).toBe('2 weeks, 2 days, 2 hours, 2 minutes, 2 seconds and 2 milliseconds');
  });

  it('should convert the sum of even factors', () => {
    const evenFactorsSum: number = allFactors.reduce((acc, value, index) => (index % 2 === 0 ? acc + value : acc), 0);
    expect(formatTime(evenFactorsSum, { minUnit: Units.MICROSECOND })).toBe(
      '1 week, 0 days, 1 hour, 0 minutes, 1 second, 0 milliseconds and 1 microsecond'
    );
  });

  it('should convert the sum of odd factors', () => {
    const oddFactorsSum: number = allFactors.reduce((acc, value, index) => (index % 2 === 0 ? acc : acc + value), 0);
    expect(formatTime(oddFactorsSum)).toBe('1 day, 0 hours, 1 minute, 0 seconds and 1 millisecond');
  });

  describe('should convert some random values', () => {
    const values = [
      [694861, '1 week, 1 day, 1 hour, 1 minute and 1 second'],
      [90000, '1 day and 1 hour'],
      [86418.004003002, '1 day, 0 hours, 0 minutes, 18 seconds, 4 milliseconds and 3.002 microseconds'],
      [86400, '1 day'],
      [3940, '1 hour, 5 minutes and 40 seconds'],
      [3610, '1 hour, 0 minutes and 10 seconds'],
      [3600.001, '1 hour, 0 minutes, 0 seconds and 1 millisecond'],
      [3600, '1 hour'],
      [1800, '30 minutes'],
      [900, '15 minutes'],
      [450, '7 minutes and 30 seconds'],
      [225, '3 minutes and 45 seconds'],
      [100, '1 minute and 40 seconds'],
      [60, '1 minute'],
      [30, '30 seconds'],
      [15, '15 seconds'],
      [1.23456, '1 second, 234 milliseconds and 560 microseconds'],
      [0.246, '246 milliseconds'],
      [0.384236, '384 milliseconds and 236 microseconds'],
      [0.000286, '286 microseconds'],
      [0, '0 seconds']
    ];
    const options: Partial<Options> = { minUnit: Units.MICROSECOND };

    it.each(values)("human readable of %d seconds should be '%s'", (time: number, human: string) => {
      expect(formatTime(time, options)).toBe(human);
    });
  });

  describe('options', () => {
    describe('min and max units', () => {
      it('should respect minUnit', () => {
        const options: Partial<Options> = { minUnit: Units.MINUTE };
        const sum: number = ONE_WEEK + ONE_DAY + ONE_HOUR + ONE_MINUTE + ONE_SECOND;
        expect(formatTime(sum, options)).toBe('1 week, 1 day, 1 hour and 1.017 minutes');
      });

      it('should respect minUnit with rounding', () => {
        const options: Partial<Options> = { precision: 0, minUnit: Units.MINUTE };
        const sum: number = ONE_WEEK + ONE_DAY + ONE_HOUR + ONE_MINUTE + ONE_SECOND;
        expect(formatTime(sum, options)).toBe('1 week, 1 day, 1 hour and 1 minute');
      });

      it('should respect maxUnit', () => {
        const options: Partial<Options> = { maxUnit: Units.HOUR };
        const sum: number = ONE_DAY + ONE_HOUR + ONE_MINUTE + ONE_SECOND + ONE_MILLISECOND;
        expect(formatTime(sum, options)).toBe('25 hours, 1 minute, 1 second and 1 millisecond');
      });

      it('should respect same min and max unit', () => {
        const options: Partial<Options> = { minUnit: Units.HOUR, maxUnit: Units.HOUR };
        const sum: number = ONE_DAY + ONE_HOUR + ONE_MINUTE + ONE_SECOND + ONE_MILLISECOND;
        expect(formatTime(sum, options)).toBe('25.017 hours');
      });

      it('should throw an error when minUnit is greater than maxUnit', () => {
        const options: Partial<Options> = { minUnit: Units.HOUR, maxUnit: Units.MINUTE };
        expect(() => formatTime(60, options)).toThrow('options.minUnit cannot be greater than options.maxUnit');
      });
    });

    describe('precision', () => {
      it('should respect an arbitrary precision', () => {
        const options: Partial<Options> = { precision: 4, minUnit: Units.SECOND };
        expect(formatTime(1.23456789, options)).toBe('1.2346 seconds');
      });

      it('should respect no decimals', () => {
        const options: Partial<Options> = { precision: 0, minUnit: Units.SECOND };
        expect(formatTime(1.6789, options)).toBe('2 seconds');
      });

      it('should be tolerant of decimal precision', () => {
        const options: Partial<Options> = { precision: Math.E, minUnit: Units.SECOND };
        expect(formatTime(1.6789, options)).toBe('1.679 seconds');
      });

      it('should throw an when the precision is negative', () => {
        const options: Partial<Options> = { precision: -2, minUnit: Units.SECOND };
        expect(() => formatTime(60, options)).toThrow('options.precision cannot be negative');
      });
    });
  });

  describe('i18n', () => {
    const fullI18n: I18n = {
      week: {
        singular: 'semana'
      },
      day: {
        singular: 'dia'
      },
      hour: {
        singular: 'hora'
      },
      minute: {
        singular: 'minuto'
      },
      second: {
        singular: 'segundo'
      },
      millisecond: {
        singular: 'milissegundo'
      },
      microsecond: {
        singular: 'microssegundo'
      },
      and: 'e'
    };
    const options: Partial<Options> = { minUnit: Units.MICROSECOND };
    const partialI18n: Partial<I18n> = {
      millisecond: {
        singular: 'ms'
      },
      microsecond: {
        singular: 'μs'
      }
    };

    it('should apply full i18n', () => {
      const oneOfEach: number = sumAll(allFactors);
      expect(formatTime(oneOfEach, options, fullI18n)).toBe(
        '1 semana, 1 dia, 1 hora, 1 minuto, 1 segundo, 1 milissegundo e 1 microssegundo'
      );
    });

    it('should apply partial i18n', () => {
      const oneOfEach: number = sumAll(allFactors);
      expect(formatTime(oneOfEach, options, partialI18n)).toBe(
        '1 week, 1 day, 1 hour, 1 minute, 1 second, 1 ms and 1 μs'
      );
    });
  });

  describe('miscellaneous scenarios', () => {
    it('should convert to HH:mm', () => {
      const time: number = 2 * ONE_HOUR + 16 * ONE_MINUTE + 32 * ONE_SECOND; // 8192s
      const options: Partial<Options> = { precision: 0, minUnit: Units.MINUTE, maxUnit: Units.HOUR };
      expect(formatTime(time, options)).toBe('2 hours and 17 minutes');
    });
  });
});
