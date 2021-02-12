'use strict';

const {ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE} = require('./constants');
const {getHumanReadableList, pluralise} = require('./utils');

module.exports = time => {
    const timeComponents = getTimeComponents(time);
    const bounds = getBounds(timeComponents);
    const filteredTimeComponents = getFilteredTimeComponents(timeComponents, bounds);

    return Object.keys(filteredTimeComponents).length
        ? getHumanReadableList(getFormattedTimeComponents(filteredTimeComponents))
        : '0 seconds';
};

const getTimeComponents = time => {
    const factors = {};

    const week = Math.floor(time / ONE_WEEK);
    factors.week = week * ONE_WEEK;

    const day = Math.floor((time - factors.week) / ONE_DAY);
    factors.day = day * ONE_DAY;

    const hour = Math.floor((time - factors.week - factors.day) / ONE_HOUR);
    factors.hour = hour * ONE_HOUR;

    const minute = Math.floor((time - factors.week - factors.day - factors.hour) / ONE_MINUTE);
    factors.minute = minute * ONE_MINUTE;

    const second = time - factors.week - factors.day - factors.hour - factors.minute;

    return {week, day, hour, minute, second};
};

const getBounds = timeComponents => {
    const nonZeroIndexes = Object.entries(timeComponents).reduce(
        (acc, [key, value], index) => timeComponents[key] !== 0 ? [...acc, index] : acc,
        []
    );

    return {
        min: Math.min(...nonZeroIndexes),
        max: Math.max(...nonZeroIndexes)
    };
};

const getFilteredTimeComponents = (timeComponents, {min, max}) =>
    Object.entries(timeComponents).reduce(
        (acc, [key, value], index) => ({
            ...acc,
            ...(min <= index && index <= max && {[key]: value})
        }),
        {}
    );

const getFormattedTimeComponents = timeComponents =>
    Object.entries(timeComponents).reduce((acc, [key, value], index, entries) => {
        if (key === 'second') {
            if (value === 0) acc.push('0 seconds');
            else if (value < 1) {
                if (entries.length > 1) acc.push('0 seconds');
                acc.push(pluralise(Math.round(value * 1000), 'millisecond'));
            } else acc.push(pluralise(Number.isInteger(value) ? value : value.toFixed(3), key));
        } else acc.push(pluralise(value, key));

        return acc;
    }, []);
