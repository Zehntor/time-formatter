import { validateArguments, validateOptions, validateTime } from '../validator';
import { DefaultOptions, Units } from '../constants';

describe('validator', () => {
  describe('arguments', () => {
    it('should validate the arguments', () => {
      const result: string[] = validateArguments(42, DefaultOptions);
      expect(result).toStrictEqual([]);
    });
  });

  describe('time', () => {
    it('should not return any errors when time is a number', () => {
      const result: string[] = validateTime(42);
      expect(result).toStrictEqual([]);
    });

    it('should return an error when time is a not a number', () => {
      const result: string[] = validateTime('not a number');
      expect(result).toStrictEqual(['time must be a number']);
    });
  });

  describe('options', () => {
    it('should not return any errors when the options are valid', () => {
      const result: string[] = validateOptions(DefaultOptions);
      expect(result).toStrictEqual([]);
    });

    it('should check that precision is a number', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        // @ts-expect-error not a number
        precision: 'not a number'
      });

      expect(result).toStrictEqual(['options.precision must be a number']);
    });

    it('should check that precision is non-negative', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        precision: -4
      });

      expect(result).toStrictEqual(['options.precision must be non-negative']);
    });

    it('should check that inputUnit is valid', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        // @ts-expect-error invalid
        inputUnit: 'invalid'
      });

      expect(result).toStrictEqual([
        "options.inputUnit must be 'week', 'day', 'hour', 'minute', 'second', 'millisecond' or 'microsecond'"
      ]);
    });

    it('should check that minUnit is valid', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        // @ts-expect-error invalid
        minUnit: 'invalid'
      });

      expect(result).toStrictEqual([
        "options.minUnit must be 'week', 'day', 'hour', 'minute', 'second', 'millisecond' or 'microsecond'"
      ]);
    });

    it('should check that maxUnit is valid', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        // @ts-expect-error invalid
        maxUnit: 'invalid'
      });

      expect(result).toStrictEqual([
        "options.maxUnit must be 'week', 'day', 'hour', 'minute', 'second', 'millisecond' or 'microsecond'"
      ]);
    });

    it('should check that maxUnit is greater than or equal to minUnit', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        minUnit: Units.HOUR,
        maxUnit: Units.MINUTE
      });

      expect(result).toStrictEqual(['options.maxUnit must be equal or greater than options.minUnit']);
    });

    it('should strictly allow minUnit === maxUnit', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        minUnit: Units.SECOND,
        maxUnit: Units.SECOND
      });

      expect(result).toStrictEqual([]);
    });

    it('should not allow unknown options', () => {
      const result: string[] = validateOptions({
        ...DefaultOptions,
        // @ts-expect-error invalid
        not: 'what',
        you: 'expected'
      });

      expect(result).toStrictEqual(["Unknown option 'not'", "Unknown option 'you'"]);
    });
  });
});
