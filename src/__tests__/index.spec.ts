import formatTime from '../index';
import { TimeConstants } from '../constants';
import { I18n, Options } from '../types';

const { ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_SECOND, ONE_MILLISECOND } = TimeConstants;
const allFactors = [ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_SECOND, ONE_MILLISECOND];

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
      [ONE_MILLISECOND, '1 millisecond']
    ];

    it.each(values)("formated time of %d should be '%s'", (time: number, human: string) => {
      expect(formatTime(time)).toBe(human);
    });
  });

  describe('plural round values', () => {
    const values = [
      [2 * ONE_WEEK, '2 weeks'],
      [2 * ONE_DAY, '2 days'],
      [2 * ONE_HOUR, '2 hours'],
      [2 * ONE_MINUTE, '2 minutes'],
      [2, '2 seconds'],
      [2 * ONE_MILLISECOND, '2 milliseconds']
    ];

    it.each(values)("formated time of %d should be '%s'", (time: number, human: string) => {
      expect(formatTime(time)).toBe(human);
    });
  });

  it('should convert one of each', () => {
    const oneOfEach: number = sumAll(allFactors);
    expect(formatTime(oneOfEach)).toBe('1 week, 1 day, 1 hour, 1 minute and 1.001 seconds');
  });

  it('should convert 2 of each', () => {
    const twoOfEach: number = sumAll(allFactors.map(n => n * 2));
    expect(formatTime(twoOfEach)).toBe('2 weeks, 2 days, 2 hours, 2 minutes and 2.002 seconds');
  });

  it('should convert singular increments', () => {
    let value = 0;

    value += ONE_WEEK;
    expect(formatTime(value)).toBe('1 week');

    value += ONE_DAY;
    expect(formatTime(value)).toBe('1 week and 1 day');

    value += ONE_HOUR;
    expect(formatTime(value)).toBe('1 week, 1 day and 1 hour');

    value += ONE_MINUTE;
    expect(formatTime(value)).toBe('1 week, 1 day, 1 hour and 1 minute');

    value += ONE_SECOND;
    expect(formatTime(value)).toBe('1 week, 1 day, 1 hour, 1 minute and 1 second');

    value += ONE_MILLISECOND;
    expect(formatTime(value)).toBe('1 week, 1 day, 1 hour, 1 minute, 1 second and 1 millisecond');
  });

  it('should convert plural increments', () => {
    let value = 0;

    value += 2 * (ONE_WEEK + ONE_DAY);
    expect(formatTime(value)).toBe('2 weeks and 2 days');

    value += 2 * ONE_HOUR;
    expect(formatTime(value)).toBe('2 weeks, 2 days and 2 hours');

    value += 2 * ONE_MINUTE;
    expect(formatTime(value)).toBe('2 weeks, 2 days, 2 hours and 2 minutes');

    value += 2;
    expect(formatTime(value)).toBe('2 weeks, 2 days, 2 hours, 2 minutes and 2 seconds');

    value += 2 * ONE_MILLISECOND;
    expect(formatTime(value)).toBe('2 weeks, 2 days, 2 hours, 2 minutes and 2.002 seconds');
  });

  it('should convert the sum of even factors', () => {
    const evenFactorsSum = allFactors.reduce((acc, value, index) => (index % 2 === 0 ? acc + value : acc), 0);
    expect(formatTime(evenFactorsSum)).toBe('1 week, 0 days, 1 hour, 0 minutes and 1 second');
  });

  it('should convert the sum of odd factors', () => {
    const oddFactorsSum = allFactors.reduce((acc, value, index) => (index % 2 === 0 ? acc : acc + value), 0);
    expect(formatTime(oddFactorsSum)).toBe('1 day, 0 hours, 1 minute, 0 seconds and 1 millisecond');
  });

  describe('should convert some random values', () => {
    const values = [
      [694861, '1 week, 1 day, 1 hour, 1 minute and 1 second'],
      [90000, '1 day and 1 hour'],
      [86418.004003002, '1 day, 0 hours, 0 minutes and 18.004 seconds'],
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
      [1.23456, '1.235 seconds'],
      [0.246, '246 milliseconds'],
      [0.384236, '384.236 milliseconds'],
      [0.000286, '0.286 milliseconds'],
      [0, '0 seconds']
    ];

    it.each(values)("human readable of %d seconds should be '%s'", (time: number, human: string) => {
      expect(formatTime(time)).toBe(human);
    });
  });

  describe('options', () => {
    const values = [
      [694861, '1 semana, 1 dia, 1 hora, 1 minuto e 1 segundo'],
      [90000, '1 dia e 1 hora'],
      [86418.004, '1 dia, 0 horas, 0 minutos e 18.004 segundos'],
      [86400, '1 dia'],
      [3940, '1 hora, 5 minutos e 40 segundos'],
      [3610, '1 hora, 0 minutos e 10 segundos'],
      [3600.001, '1 hora, 0 minutos, 0 segundos e 1 milissegundo'],
      [3600, '1 hora'],
      [1800, '30 minutos'],
      [900, '15 minutos'],
      [450, '7 minutos e 30 segundos'],
      [225, '3 minutos e 45 segundos'],
      [100, '1 minuto e 40 segundos'],
      [60, '1 minuto'],
      [30, '30 segundos'],
      [15, '15 segundos'],
      [1.23456, '1.235 segundos'],
      [0.246, '246 milissegundos'],
      [0, '0 segundos']
    ];

    const options: Partial<Options> = {
      precision: 3
    };
    const i18n: Partial<I18n> = {
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
      and: 'e'
    };

    it.each(values)("human readable of %d seconds should be '%s'", (time: number, human: string) => {
      expect(formatTime(time, options, i18n)).toBe(human);
    });
  });
});
