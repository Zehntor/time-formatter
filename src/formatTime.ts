import { DefaultI18n, DefaultOptions, DefaultUnitTimeMap, Units } from './constants';
import { getMergedDefaults, getHumanReadableList, pluralise, roundToDecimals } from './utils';
import { validateArguments } from './validator';
import type { Bounds, I18n, Options, TimeComponents, UnitTimeMap } from './types';

export const formatTime = (
  time: number,
  options: Partial<Options> = DefaultOptions,
  i18n: Partial<I18n> = DefaultI18n
): string => {
  const mergedOptions: Options = getMergedDefaults(DefaultOptions, options);
  const mergedI18n: I18n = getMergedDefaults(DefaultI18n, i18n);

  const argumentsErrors: string[] = validateArguments(time, mergedOptions);
  if (argumentsErrors.length) throw new Error(argumentsErrors.join('\n'));

  const timeComponents: TimeComponents = getTimeComponents(time, mergedOptions);
  const bounds: Bounds = getBounds(timeComponents);
  const filteredTimeComponents: TimeComponents = getFilteredTimeComponents(timeComponents, bounds);

  return Object.keys(filteredTimeComponents).length
    ? getHumanReadableList(getFormattedTimeComponents(filteredTimeComponents, mergedI18n), i18n.and)
    : pluralise(0, mergedI18n.second.singular, mergedI18n.second.plural);
};

const getUnitTimeMap = (options: Options): UnitTimeMap => {
  const minUnitIndex = Object.values(Units).indexOf(options.minUnit);
  const maxUnitIndex = Object.values(Units).indexOf(options.maxUnit);

  return Object.entries(DefaultUnitTimeMap).reduce(
    (acc, [key, value], index) => ({
      ...acc,
      ...(index >= maxUnitIndex && index <= minUnitIndex && { [key]: value })
    }),
    {} as UnitTimeMap
  );
};

const getTimeComponents = (time: number, options: Options): TimeComponents => {
  const unitTimeMap: UnitTimeMap = getUnitTimeMap(options);
  const timeComponents: TimeComponents = {};

  Object.entries(unitTimeMap).forEach(([key, value], index, array) => {
    if (index < array.length - 1) {
      timeComponents[key] = Math.floor(time / value);
      time -= timeComponents[key] * value;
    } else timeComponents[key] = roundToDecimals(time / value, Math.round(options.precision));
  });

  return timeComponents;
};

const getBounds = (timeComponents: TimeComponents): Bounds =>
  Object.values(timeComponents).reduce(
    (acc, value, index) =>
      value === 0
        ? acc
        : {
            min: Math.min(index, acc.min),
            max: Math.max(index, acc.max)
          },
    {
      min: Number.MAX_VALUE,
      max: 0
    }
  );

/**
 * Removes the leading and trailing time components that are equal to 0
 * Before
 *  {
 *    "week": 0,
 *    "day": 1,
 *    "hour": 2,
 *    "minute": 0,
 *    "second": 4,
 *    "millisecond": 0,
 *    "microsecond": 0
 *  }
 * After
 *  {
 *   "day": 1,
 *   "hour": 2,
 *   "minute": 0,
 *   "second": 4
 *  }
 * @param timeComponents - The time components to filter
 * @param min - The minimum index
 * @param max - The maximum index
 * @returns The filtered time components
 */
const getFilteredTimeComponents = (timeComponents: TimeComponents, { min, max }: Bounds): TimeComponents =>
  Object.entries(timeComponents).reduce(
    (acc, [key, value], index) => ({
      ...acc,
      ...(min <= index && index <= max && { [key]: value })
    }),
    {}
  );

/**
 * @param timeComponents - The time components to format
 * @param i18n - The full i18n strings
 * @returns An array of strings representing the formatted time components
 */
const getFormattedTimeComponents = (timeComponents: TimeComponents, i18n: I18n): string[] =>
  Object.entries(timeComponents).reduce(
    (acc, [key, value]) => [...acc, pluralise(value, i18n[key].singular, i18n[key].plural)],
    [] as string[]
  );
