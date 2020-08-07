'use strict';

const ONE_WEEK = 604800;
const ONE_DAY = 86400;
const ONE_HOUR = 3600;
const ONE_MINUTE = 60;

const getHumanReadableTime = time => {
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
    const nonZeroIndexes = keys
        .filter(key => Boolean(timeComponents[key]))
        .map(key => keys.indexOf(key));

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

const getFormattedTimeComponents = timeComponents => {
    const keys = Object.keys(timeComponents);
    return keys.reduce((acc, key) => {
        const value = timeComponents[key];
        if (key === 'second') {
            if (value === 0) {
                acc.push('0 seconds');
            } else if (value < 1) {
                if (keys.length > 1) {
                    acc.push('0 seconds');
                }
                acc.push(getFormattedTimeComponent(Math.round(value * 1000), 'millisecond'));
            } else {
                acc.push(getFormattedTimeComponent(
                    Number.isInteger(value)
                        ? value
                        : value.toFixed(3),
                    key));
            }
        } else {
            acc.push(getFormattedTimeComponent(value, key));
        }

        return acc;
    }, []);
};

const getFormattedTimeComponent = (time, componentName) =>
    time === 1
        ? `1 ${componentName}`
        : `${time} ${componentName}s`;

const getHumanReadableList = (list, glue = 'and') => {
    const listClone = list.slice();
    const lastElement = listClone.pop();
    if (listClone.length === 0) {
        return lastElement || '';
    }
    return [listClone.join(', '), lastElement].join(` ${glue} `);
};

const getTestSet = () => {
    const testSet = [0];

    const all = [ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE, 1];

    const simple = all.reduce((acc, value) => {
        acc.push(value);
        acc.push(value * 2);
        return acc;
    }, []);

    const oneOfEach = all.reduce((acc, value) => acc + value, 0);
    const twoOfEach = all.reduce((acc, value) => acc + 2 * value, 0);

    const increment = all.reduce((acc, value, index) => {
        let sum = 0;
        for (let i = 0; i <= index; i++) {
            sum += all[i];
        }
        acc.push(sum);
        return acc;
    }, []);

    const even = all
        .filter((value, index) => index % 2 === 0)
        .reduce((acc, value) => {
            acc += value;
            return acc;
        }, 0);
    const odd = all
        .filter((value, index) => index % 2 !== 0)
        .reduce((acc, value) => {
            acc += value;
            return acc;
        }, 0);

    const random = [694861, 86418.004, 86400, 3940, 3610, 3600.001, 3600, 1800, 900, 450, 225, 100, 60, 30, 15, 1.23456, 0.246, 0];

    return testSet
        .concat(simple)
        .concat(oneOfEach)
        .concat(twoOfEach)
        .concat(increment)
        .concat(even)
        .concat(odd)
        .concat(random);
};

console.time('perf');
getTestSet().forEach(
    time => console.log(`getHumanReadableTime(${time}) = ${getHumanReadableTime(time)}`
));
console.timeEnd('perf');
