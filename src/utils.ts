import { Options } from './types';
import { DefaultOptions } from './constants';

/**
 * Merges the options with the default options
 * @param options - The options
 * @returns Merged options
 * TODO: add tests
 */
export const getFinalOptions = (options: Options): Options => ({
  ...DefaultOptions,
  ...options,
  i18n: {
    ...DefaultOptions.i18n,
    ...options.i18n
  }
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
 * @returns The pluralised word
 */
export const pluralise = (number: number, singular: string, plural: string = singular + 's'): string =>
  number === 1 ? `1 ${singular}` : `${number} ${plural}`;

/**
 * Rounds a number to some decimals
 * @param {number} number - The number to round
 * @param {number} decimals - the number of decimal places
 * @returns {number} - The rounded number
 */
export const roundToDecimals = (number: number, decimals = 3) => {
  const exponent = 10 ** decimals;
  return Math.round(number * exponent) / exponent;
};
