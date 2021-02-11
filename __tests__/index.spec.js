const formatTime = require('../src');
const {ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_MILLISECOND} = require('../src/constants');
const allFactors = [ONE_WEEK, ONE_DAY, ONE_HOUR, ONE_MINUTE, 1, ONE_MILLISECOND];

const sumAll = numbers => numbers.reduce((acc, value) => acc + value, 0);

describe('formatTime', () => {
    it('should convert singular round values', () => {
        expect(formatTime(ONE_WEEK)).toBe('1 week');
        expect(formatTime(ONE_DAY)).toBe('1 day');
        expect(formatTime(ONE_HOUR)).toBe('1 hour');
        expect(formatTime(ONE_MINUTE)).toBe('1 minute');
        expect(formatTime(1)).toBe('1 second');
        expect(formatTime(0)).toBe('0 seconds');
        expect(formatTime(ONE_MILLISECOND)).toBe('1 millisecond');
    });

    it('should convert plural round values', () => {
        expect(formatTime(2 * ONE_WEEK)).toBe('2 weeks');
        expect(formatTime(2 * ONE_DAY)).toBe('2 days');
        expect(formatTime(2 * ONE_HOUR)).toBe('2 hours');
        expect(formatTime(2 * ONE_MINUTE)).toBe('2 minutes');
        expect(formatTime(2)).toBe('2 seconds');
        expect(formatTime(2 * ONE_MILLISECOND)).toBe('2 milliseconds');
    });

    it('should convert one of each', () => {
        const oneOfEach = sumAll(allFactors);
        expect(formatTime(oneOfEach)).toBe('1 week, 1 day, 1 hour, 1 minute and 1.001 seconds');
    });

    it('should convert 2 of each', () => {
        const twoOfEach = sumAll(allFactors.map(n => n * 2));
        expect(formatTime(twoOfEach)).toBe('2 weeks, 2 days, 2 hours, 2 minutes and 2.002 seconds');
    });

    it('should convert singular increments', () => {
        let value = 0;

        value += ONE_WEEK + ONE_DAY;
        expect(formatTime(value)).toBe('1 week and 1 day');

        value += ONE_HOUR;
        expect(formatTime(value)).toBe('1 week, 1 day and 1 hour');

        value += ONE_MINUTE;
        expect(formatTime(value)).toBe('1 week, 1 day, 1 hour and 1 minute');

        value += 1;
        expect(formatTime(value)).toBe('1 week, 1 day, 1 hour, 1 minute and 1 second');

        value += ONE_MILLISECOND;
        expect(formatTime(value)).toBe('1 week, 1 day, 1 hour, 1 minute and 1.001 seconds');
    });

    it('should convert plural increments', () => {
        let value = 0;

        value += 2 * (ONE_WEEK + ONE_DAY);
        expect(formatTime(value)).toBe('2 weeks and 2 days');

        value += 2 * ONE_HOUR;
        expect(formatTime(value)).toBe('2 weeks, 2 days and 2 hours');

        value += 2 * ONE_MINUTE;
        expect(formatTime(value)).toBe('2 weeks, 2 days, 2 hours and 2 minutes');

        value += 2;
        expect(formatTime(value)).toBe('2 weeks, 2 days, 2 hours, 2 minutes and 2 seconds');

        value += 2 * ONE_MILLISECOND;
        expect(formatTime(value)).toBe('2 weeks, 2 days, 2 hours, 2 minutes and 2.002 seconds');
    });

    it('should convert the sum of even factors', () => {
        const evenFactorsSum = allFactors.reduce((acc, value, index) => (index % 2 === 0 ? acc + value : acc), 0);
        expect(formatTime(evenFactorsSum)).toBe('1 week, 0 days, 1 hour, 0 minutes and 1 second');
    });

    it('should convert the sum of odd factors', () => {
        const oddFactorsSum = allFactors.reduce((acc, value, index) => (index % 2 !== 0 ? acc + value : acc), 0);
        expect(formatTime(oddFactorsSum)).toBe('1 day, 0 hours, 1 minute, 0 seconds and 1 millisecond');
    });

    it('should convert some random values', () => {
        const randomValues = [
            694861,
            90000,
            86418.004,
            86400,
            3940,
            3610,
            3600.001,
            3600,
            1800,
            900,
            450,
            225,
            100,
            60,
            30,
            15,
            1.23456,
            0.246,
            0
        ];

        const convertedValues = randomValues.map(value => formatTime(value));

        expect(convertedValues).toEqual([
            '1 week, 1 day, 1 hour, 1 minute and 1 second',
            '1 day and 1 hour',
            '1 day, 0 hours, 0 minutes and 18.004 seconds',
            '1 day',
            '1 hour, 5 minutes and 40 seconds',
            '1 hour, 0 minutes and 10 seconds',
            '1 hour, 0 minutes, 0 seconds and 1 millisecond',
            '1 hour',
            '30 minutes',
            '15 minutes',
            '7 minutes and 30 seconds',
            '3 minutes and 45 seconds',
            '1 minute and 40 seconds',
            '1 minute',
            '30 seconds',
            '15 seconds',
            '1.235 seconds',
            '246 milliseconds',
            '0 seconds'
        ]);
    });
});
