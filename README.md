# time-formatter

The `time-formatter` package formats a number representing elapsed time into a human readable string.  


## Examples

```js
const formattedTime = formatTime(86418.004003002);
// 1 day, 0 hours, 0 minutes, 18 seconds, 4 milliseconds and 3.002 microseconds

const options: Partial<Options> = {
  precision: 0,
  minUnit: Units.MINUTE,
  maxUnit: Units.HOUR
};
const formattedTime = formatTime(8192, options);
// 2 hours and 17 minutes
```

## Features
- Output units from week down to microsecond (TODO: why not higher or lower?)

## Installation

### npm

```bash
npm install --save time-formatter 
```

### yarn

```bash
yarn add data-structure-typed
```

## Usage

```js
import formatTime from 'time-formatter';
```
