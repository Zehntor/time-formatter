import { DefaultI18n, DefaultOptions, TimeConstants } from './constants';
import { getMergedDefaults, getHumanReadableList, pluralise, roundToDecimals } from './utils';
import { Bounds, I18n, Options, TimeComponents } from './types';

const { ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE } = TimeConstants;

export default (
  time: number,
  options: Partial<Options> = DefaultOptions,
  i18n: Partial<I18n> = DefaultI18n
): string => {
  const mergedOptions: Options = getMergedDefaults(DefaultOptions, options);
  const mergedI18n: I18n = getMergedDefaults(DefaultI18n, i18n);

  const timeComponents: TimeComponents = getTimeComponents(time);
  const bounds: Bounds = getBounds(timeComponents);
  const filteredTimeComponents: TimeComponents = getFilteredTimeComponents(timeComponents, bounds);

  return Object.keys(filteredTimeComponents).length
    ? getHumanReadableList(getFormattedTimeComponents(filteredTimeComponents, mergedOptions, mergedI18n), i18n.and)
    : pluralise(0, mergedI18n.second.singular, mergedI18n.second.plural);
};

const getTimeComponents = (time: number): TimeComponents => {
  const timeComponents: TimeComponents = {};

  const week = Math.floor(time / ONE_WEEK);
  timeComponents.week = week * ONE_WEEK;

  const day = Math.floor((time - timeComponents.week) / ONE_DAY);
  timeComponents.day = day * ONE_DAY;

  const hour = Math.floor((time - timeComponents.week - timeComponents.day) / ONE_HOUR);
  timeComponents.hour = hour * ONE_HOUR;

  const minute = Math.floor((time - timeComponents.week - timeComponents.day - timeComponents.hour) / ONE_MINUTE);
  timeComponents.minute = minute * ONE_MINUTE;

  const second = time - timeComponents.week - timeComponents.day - timeComponents.hour - timeComponents.minute;

  return { week, day, hour, minute, second };
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
 */
const getFormattedTimeComponents = (timeComponents: TimeComponents, options: Options, i18n: I18n): string[] =>
  Object.entries(timeComponents).reduce((acc, [key, value], _, entries) => {
    if (key === 'second') {
      if (value < 1) {
        if (entries.length > 1) acc.push(pluralise(0, i18n.second.singular, i18n.second.plural));
        acc.push(pluralise(Math.round(value * 1e3), i18n.millisecond.singular, i18n.millisecond.plural));
      } else
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
