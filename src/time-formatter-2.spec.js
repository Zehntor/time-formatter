'use strict';

const ONE_DAY = 86400;
const ONE_HOUR = 3600;
const ONE_MINUTE = 60;

const getHumanReadableTime = time => {
    console.log(`getHumanReadableTime(${time})`);

    const {day, hour, minute, second} = getTimeComponents(time);

    //console.log({day, hour, minute, second});

    console.log(getStuff(getTimeComponents(time)));


    return;
};

const getTimeComponents = time => {
    const day = Math.floor(time / ONE_DAY);
    const hour = Math.floor((time - day * ONE_DAY) / ONE_HOUR);
    const minute = Math.floor((time - day * ONE_DAY - hour * ONE_HOUR) / ONE_MINUTE);
    const second = time - day * ONE_DAY - hour * ONE_HOUR - minute * ONE_MINUTE;

    return {day, hour, minute, second};
};

const getStuff = timeComponents => {
    return Object.keys(timeComponents).reduce((acc, value, index, source) => {
        if (index !== source.length - 1) {
            if (timeComponents[value]) {
                acc.push(getFormattedTimeComponent(timeComponents[value], value));
            }
        } else {
            if (timeComponents[value] < 1) {
                const ms = Math.round(timeComponents[value] * 1000);
                acc.push(getFormattedTimeComponent(ms, 'millisecond'));
            } else {
                acc.push(getFormattedTimeComponent(timeComponents[value].toFixed(3), value));
            }
        }

        return acc;
    }, []);
};

const getFormattedTimeComponent = (time, componentName) => {
    if (time === 1) {
        return `1 ${componentName}`;
    }

    return `${time} ${componentName}s`;
};

let time = 4200;
console.log(getHumanReadableTime(time));

time = 0.000;
console.log(getHumanReadableTime(time));
