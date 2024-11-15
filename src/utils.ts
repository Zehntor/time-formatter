import { DefaultUnitTimeMap, Units } from './constants';

/**
 * Merges the overrides with the default overrides
 * @param defaults - The default values
 * @param overrides - The overrides
 * @returns Merged overrides
 */
export const getMergedDefaults = <T>(defaults: T, overrides: Partial<T>): T => ({
  ...defaults,
  ...overrides
});

/**
 * Returns a human-readable list of items, with glue between them.
 * @param list - The list of items
 * @param glue - The glue to use on the last 2 items
 * @returns A human-readable list of items
 * @example getHumanReadableString('0375', '0965', '0155', '0245') = '0375, 0965, 0155 and 0245'
 */
export const getHumanReadableList = (list: string[] = [], glue: string = 'and'): string =>
  list.length > 1 ? [list.slice(0, -1).join(', '), list.slice(-1)].join(` ${glue} `) : list[0] || '';

/**
 * Pluralises (or not) a word based on the number of items.
 * @param number - The number of items
 * @param singular - The singular form of the word
 * @param plural - The plural form of the word (defaults to the singular form with an s)
 * @param includeNumber - A flag indicating if the number should be included in the pluralised string or not
 * @returns The pluralised word
 */
export const pluralise = (
  number: number,
  singular: string,
  plural: string = singular + 's',
  includeNumber = true
): string => {
  if (includeNumber) return number === 1 ? `1 ${singular}` : `${number} ${plural}`;
  return number === 1 ? singular : plural;
};

/**
 * Rounds a number to some decimals
 * @param number - The number to round
 * @param decimals - The number of decimal places
 * @returns The rounded number
 */
export const roundToDecimals = (number: number, decimals = 3): number => {
  const exponent = 10 ** decimals;
  return Math.round((number + Number.EPSILON) * exponent) / exponent;
};

/**
 * Converts a time from one unit to another
 * @param time - The time to convert
 * @param from - The input unit
 * @param to - The output unit
 * @returns The converted time
 */
export const convertTime = (time: number, from: Units, to: Units): number =>
  (time * DefaultUnitTimeMap[from]) / DefaultUnitTimeMap[to];
