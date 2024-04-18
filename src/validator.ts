import { Options } from './types';
import { Units } from './constants';
import { getHumanReadableList } from './utils';

export const validateArguments = (time: number, options: Options) => [
  ...validateTime(time),
  ...validateOptions(options)
];

/**
 * Validates that time is a number
 * Exported so it can be tested
 * @param time - The time to validate
 * @returns An array with an error if the time is not valid; empty otherwise
 */
export const validateTime = (time: unknown): string[] => [
  ...(Number.isNaN(Number(time)) ? ['time must be a number'] : [])
];

/**
 * Validates options
 * Exported so it can be tested
 * @param options - The options to validate
 * @returns An array with errors if any option is not valid; empty otherwise
 */
export const validateOptions = (options: Options): string[] => [
  ...getPrecisionErrors(options),
  ...getMinMaxUnitsErrors(options)
];

const getPrecisionErrors = (options: Options): string[] => {
  const precisionIsANumber = !isNaN(options.precision);
  return [
    ...(precisionIsANumber ? [] : ['options.precision must be a number']),
    ...(precisionIsANumber && options.precision < 0 ? ['options.precision must be non-negative'] : [])
  ];
};

const getMinMaxUnitsErrors = (options: Options): string[] => {
  const allowedUnits: string[] = Object.values(Units);
  const humanReadableAllowedUnitsList: string = getHumanReadableList(
    allowedUnits.map(allowedUnit => `'${allowedUnit}'`),
    'or'
  );

  const minUnitIsValid: boolean = allowedUnits.includes(options.minUnit);
  const maxUnitIsValid: boolean = allowedUnits.includes(options.maxUnit);
  const minUnitIndex: number = Object.values(Units).indexOf(options.minUnit);
  const maxUnitIndex: number = Object.values(Units).indexOf(options.maxUnit);

  return [
    ...(minUnitIsValid ? [] : [['options.minUnit must be', humanReadableAllowedUnitsList].join(' ')]),
    ...(maxUnitIsValid ? [] : [['options.maxUnit must be', humanReadableAllowedUnitsList].join(' ')]),
    ...(minUnitIsValid && maxUnitIsValid && minUnitIndex < maxUnitIndex
      ? ['options.maxUnit must be equal or greater than options.minUnit']
      : [])
  ];
};
