const { formatTime } = require('@rwf-projects/time-formatter');

describe('formatTime', () => {
  it('should work', () => {
    expect(formatTime(1.234567)).toBe('1 second and 234.567 milliseconds');
  });
});
