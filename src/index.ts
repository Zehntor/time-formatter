import { DefaultOptions, TimeConstants } from './constants';
import { getFinalOptions, getHumanReadableList, pluralise, roundToDecimals } from './utils';
import { Bounds, Options, TimeComponents } from './types';

const { ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE } = TimeConstants;

export default (time: number, options: Options = DefaultOptions): string => {
  const finalOptions: Options = getFinalOptions(options);
  const timeComponents: TimeComponents = getTimeComponents(time);
  const bounds: Bounds = getBounds(timeComponents);
  const filteredTimeComponents: TimeComponents = getFilteredTimeComponents(timeComponents, bounds);

  return Object.keys(filteredTimeComponents).length
    ? getHumanReadableList(getFormattedTimeComponents(filteredTimeComponents, finalOptions), options.i18n.and)
    : pluralise(0, options.i18n.second!.singular, options.i18n.second!.plural);
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

const getFormattedTimeComponents = (timeComponents: TimeComponents, options: Options): string[] =>
  Object.entries(timeComponents).reduce((acc, [key, value], _, entries) => {
    if (key === 'second') {
      if (value < 1) {
        if (entries.length > 1) acc.push(pluralise(0, options.i18n.second!.singular, options.i18n.second!.plural));
        acc.push(
          pluralise(Math.round(value * 1e3), options.i18n.millisecond!.singular, options.i18n.millisecond!.plural)
        );
      } else
        acc.push(
          pluralise(
            Number.isInteger(value) ? value : roundToDecimals(value, options.precision),
            options.i18n[key]!.singular,
            options.i18n[key]!.plural
          )
        );
    } else acc.push(pluralise(value, options.i18n[key]!.singular, options.i18n[key]!.plural));

    return acc;
  }, [] as string[]);
