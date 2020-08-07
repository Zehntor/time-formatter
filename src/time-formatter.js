'use strict';

const ONE_DAY = 86400;
const ONE_HOUR = 3600;
const ONE_MINUTE = 60;

const getHumanReadableTime = time => {
    const {d, h, m, s} = getTimeComponents(time);

    const sStr = getFormattedTimeComponent(s.toFixed(3), 'second');

    if (d !== 0) {
        return getHumanReadableTimeStartingWithDays(d, h, m, s);
    }
    if (h !== 0) {
        return getHumanReadableTimeStartingWithHours(h, m, s);
    }
    if (m !== 0) {
        return getHumanReadableTimeStartingWithMinutes(m, s);
    }
    if (s < 1) {
        const ms = Math.round(s * 1000);
        return getFormattedMillisecondTimeComponent(ms);
    }

    return sStr;
};

const getTimeComponents = time => {
    let d = Math.floor(time / ONE_DAY);
    let h = Math.floor((time - d * ONE_DAY) / ONE_HOUR);
    let m = Math.floor((time - d * ONE_DAY - h * ONE_HOUR) / ONE_MINUTE);
    let s = time - d * ONE_DAY - h * ONE_HOUR - m * ONE_MINUTE;

    return {d, h, m, s};
};

const getHumanReadableTimeStartingWithDays = (d, h, m, s) => {
    const dStr = getFormattedTimeComponent(d, 'day');
    const hStr = getFormattedTimeComponent(h, 'hour');
    const mStr = getFormattedTimeComponent(m, 'minute');
    const sStr = getFormattedTimeComponent(s.toFixed(3), 'second');

    if (h !== 0) {
        if (m !== 0) {
            if (s !== 0) {
                return `${dStr}, ${hStr}, ${mStr} and ${sStr}`;
            }
            return `${dStr}, ${hStr} and ${mStr}`;
        }
        return `${dStr} and ${hStr}`;
    }
    if (s !== 0) {
        return `${dStr}, ${hStr}, ${mStr} and ${sStr}`;
    }

    return dStr;
};

const getHumanReadableTimeStartingWithHours = (h, m, s) => {
    const hStr = getFormattedTimeComponent(h, 'hour');
    const mStr = getFormattedTimeComponent(m, 'minute');
    const sStr = getFormattedTimeComponent(s.toFixed(3), 'second');

    if (m !== 0) {
        if (s !== 0) {
            return `${hStr}, ${mStr} and ${sStr}`;
        }
        return `${hStr} and ${mStr}`;
    }
    if (s !== 0) {
        return `${hStr}, ${mStr} and ${sStr}`;
    }

    return hStr;
};

const getHumanReadableTimeStartingWithMinutes = (m, s) => {
    const mStr = getFormattedTimeComponent(m, 'minute');
    const sStr = getFormattedTimeComponent(s.toFixed(3), 'second');

    if (s !== 0) {
        return `${mStr} and ${sStr}`;
    }

    return mStr;
};

const getFormattedTimeComponent = (time, componentName) => {
    if (time === 1) {
        return `1 ${componentName}`;
    }

    return `${time} ${componentName}s`;
};

const getFormattedMillisecondTimeComponent = time => {
    if (time === 0) {
        return '0 milliseconds';
    }

    if (time === 1) {
        return '1 millisecond';
    }

    return `${time} milliseconds`;
};

[86400, 3610, 3600.001, 3600, 1800, 900, 450, 225, 100, 60, 30, 15, 1.23456, 0.246, 0].forEach(
    time => console.log(`getHumanReadableTime(${time}) = ${getHumanReadableTime(time)}`
));
