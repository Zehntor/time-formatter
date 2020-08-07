'use strict';

const {ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE} = require('./constants');
const {getHumanReadableList, pluralise} = require('./utils');

module.exports = time => {
    const timeComponents = getTimeComponents(time);
    const filteredTimeComponents = getFilteredTimeComponents(timeComponents);

    if (!Object.keys(filteredTimeComponents).length) {
        return '0 seconds';
    }

    return getHumanReadableList(getFormattedTimeComponents(filteredTimeComponents));
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

const getFilteredTimeComponents = timeComponents => {
    const keys = Object.keys(timeComponents);
    const nonZeroIndexes = keys.filter(key => Boolean(timeComponents[key])).map(key => keys.indexOf(key));

    if (!nonZeroIndexes.length) {
        return {};
    }

    const min = Math.min(...nonZeroIndexes);
    const max = Math.max(...nonZeroIndexes);

    return keys
        .filter(key => {
            const index = keys.indexOf(key);
            return min <= index && index <= max;
        })
        .reduce((acc, index) => {
            acc[index] = timeComponents[index];
            return acc;
        }, {});
};

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
