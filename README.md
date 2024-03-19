# time-formatter

The `time-formatter` package formats a number representing elapsed time into a human readable string.  


## Examples

```ts
const formattedTime: string = formatTime(4.256128);
// 4 seconds and 256.128 milliseconds
```

```ts
const options: Partial<Options> = { minUnit: Units.SECOND, maxUnit: Units.HOUR };
const formattedTime: string = formatTime(94592, options);
// 26 hours, 16 minutes and 32 seconds
```

```ts
const options: Partial<Options> = { minUnit: Units.MICROSECOND };
const formattedTime: string = formatTime(32.064128, options);
// 32 seconds, 64 milliseconds and 128 microseconds
```

```ts
const options: Partial<Options> = { precision: 1, minUnit: Units.MICROSECOND };
const formattedTime: string = formatTime(792496.032064128, options);
// 1 week, 2 days, 4 hours, 8 minutes, 16 seconds, 32 milliseconds and 64.1 microseconds
```

## Features
- Output units from week down to microsecond (TODO: why not higher or lower?)
- Arbitrary precision in the lower unit

## Installation

### npm

```bash
npm install --save time-formatter
```

### yarn

```bash
yarn add time-formatter
```

## Usage

```js
import formatTime from 'time-formatter';
```
