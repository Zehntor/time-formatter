// @ts-nocheck
import {DefaultI18n, DefaultOptions, DefaultUnitTimeMap, TimeConstants, Units} from './constants';
import { getMergedDefaults, getHumanReadableList, pluralise, roundToDecimals } from './utils';
import { Bounds, I18n, Options, TimeComponents, UnitTimeMap } from './types';

export default (
  time: number,
  options: Partial<Options> = DefaultOptions,
  i18n: Partial<I18n> = DefaultI18n
): string => {
  const mergedOptions: Options = getMergedDefaults(DefaultOptions, options);
  const mergedI18n: I18n = getMergedDefaults(DefaultI18n, i18n);

  const timeComponents: TimeComponents = getTimeComponents(time, mergedOptions);
  const bounds: Bounds = getBounds(timeComponents);
  const filteredTimeComponents: TimeComponents = getFilteredTimeComponents(timeComponents, bounds);

  return Object.keys(filteredTimeComponents).length
    ? getHumanReadableList(getFormattedTimeComponents(filteredTimeComponents, mergedOptions, mergedI18n), i18n.and)
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
    {}
  );
};

const getTimeComponents = (time: number, options: Options): TimeComponents => {
  const unitTimeMap: UnitTimeMap = getUnitTimeMap(options);
  const timeComponents: TimeComponents = {};

  for (const [key, value] of Object.entries(unitTimeMap)) {
    timeComponents[key] = Math.floor(time / value);
    time -= timeComponents[key] * value;
  }

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

const getFilteredTimeComponents = (timeComponents: TimeComponents, { min, max }: Bounds): TimeComponents =>
  Object.entries(timeComponents).reduce(
    (acc, [key, value], index) => ({
      ...acc,
      ...(min <= index && index <= max && { [key]: value })
    }),
    {}
  );

/**
 * TODO: check sub millisecond values, e.g. 284.236 ms. Maybe go nano seconds, or even smaller
 * @param timeComponents
 * @param options
 * @param i18n
 */
const getFormattedTimeComponents = (timeComponents: TimeComponents, options: Options, i18n: I18n): string[] =>
  Object.entries(timeComponents).reduce((acc, [key, value]) => {
    if (key === options.minUnit) {
    // if (it is the last key) {
      acc.push(
        pluralise(
          Number.isInteger(value) ? value : roundToDecimals(value, options.precision),
          i18n![key].singular,
          i18n![key].plural
        )
      );
    } else acc.push(pluralise(value, i18n[key].singular, i18n[key].plural));

    return acc;
  }, [] as string[]);
