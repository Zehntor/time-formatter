import { DefaultI18n, DefaultOptions, DefaultUnitTimeMap, Units } from './constants';
import { convertTime, getHumanReadableList, getMergedDefaults, pluralise, roundToDecimals } from './utils';
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

  const convertedTime: number = convertTime(time, mergedOptions.inputUnit, Units.SECOND);

  const timeComponents: TimeComponents = getTimeComponents(convertedTime, mergedOptions);
  const bounds: Bounds = getBounds(timeComponents);
  const filteredTimeComponents: TimeComponents = getFilteredTimeComponents(timeComponents, bounds);

  return Object.keys(filteredTimeComponents).length
    ? getHumanReadableList(getFormattedTimeComponents(filteredTimeComponents, mergedI18n), i18n.and)
    : pluralise(0, mergedI18n.second.singular, mergedI18n.second.plural);
};

/**
 * Filters the default unit time map
 * removing the units that are outside the [options.minUnit, options.maxUnit] range
 * @param options - The options
 * @returns The filtered unit time map
 */
const getUnitTimeMap = (options: Options): Partial<UnitTimeMap> => {
  const unitValues = Object.values(Units);
  const minUnitIndex = unitValues.indexOf(options.minUnit);
  const maxUnitIndex = unitValues.indexOf(options.maxUnit);
  const result: UnitTimeMap = {};

  for (let index = maxUnitIndex; index <= minUnitIndex; index++) {
    const unit = unitValues[index];
    result[unit] = DefaultUnitTimeMap[unit];
  }

  return result;
};

/**
 * Returns the time split and converted into individual time components
 * @param time - The time to format
 * @param options - The options
 * @returns The time split and converted into individual time components
 */
const getTimeComponents = (time: number, options: Options): TimeComponents => {
  const unitTimeMap: UnitTimeMap = getUnitTimeMap(options);
  const timeComponents: TimeComponents = {};

  Object.entries(unitTimeMap).forEach(([key, value], index, array) => {
    if (index < array.length - 1) {
      timeComponents[key] = Math.floor(convertTime(time, Units.SECOND, key as Units));
      time -= timeComponents[key] * value;
    } else timeComponents[key] = roundToDecimals(time / value, Math.round(options.precision));
  });

  return timeComponents;
};

/**
 * Finds the indexes of the first and last non-zero time components.
 * @param timeComponents - The time components in unit order
 * @returns The inclusive bounds, or min = Number.MAX_VALUE and max = 0 if all components are zero
 */
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
  Object.entries(timeComponents).reduce<TimeComponents>((acc, [key, value], index) => {
    if (min <= index && index <= max) acc[key] = value;
    return acc;
  }, {});

/**
 * Formats the time components into a human-readable format
 * @param timeComponents - The time components to format
 * @param i18n - The full i18n strings
 * @returns An array of strings representing the formatted time components
 */
const getFormattedTimeComponents = (timeComponents: TimeComponents, i18n: I18n): string[] =>
  Object.entries(timeComponents).map(([key, value]) => pluralise(value, i18n[key].singular, i18n[key].plural));
