# time-formatter

The `time-formatter` package formats a number representing elapsed time into a human readable string.

## Examples

### TypeScript

```ts
const formattedTime: string = formatTime(4.256128);
// 4 seconds and 256.128 milliseconds
```

```ts
const options: Partial<Options> = {minUnit: Units.SECOND, maxUnit: Units.HOUR};
const formattedTime: string = formatTime(94592, options);
// 26 hours, 16 minutes and 32 seconds
```

```ts
const options: Partial<Options> = {minUnit: Units.MICROSECOND};
const formattedTime: string = formatTime(32.064128, options);
// 32 seconds, 64 milliseconds and 128 microseconds
```

```ts
const options: Partial<Options> = {precision: 1, minUnit: Units.MICROSECOND};
const formattedTime: string = formatTime(792496.032064128, options);
// 1 week, 2 days, 4 hours, 8 minutes, 16 seconds, 32 milliseconds and 64.1 microseconds
```

### JavaScript

```js
const formattedTime = formatTime(4.256128);
// 4 seconds and 256.128 milliseconds
```

```js
const options = {minUnit: Units.SECOND, maxUnit: Units.HOUR};
const formattedTime = formatTime(94592, options);
// 26 hours, 16 minutes and 32 seconds
```

```js
const options = {minUnit: Units.MICROSECOND};
const formattedTime = formatTime(32.064128, options);
// 32 seconds, 64 milliseconds and 128 microseconds
```

```js
const options = {precision: 1, minUnit: Units.MICROSECOND};
const formattedTime = formatTime(792496.032064128, options);
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

### JavaScript

Start by importing.

```js
import formatTime from 'time-formatter';
```

... or requiring.

```js
const formatTime = require('time-formatter');
```

Then

```js
const formattedTime = formatTime(time, [options], [i18n]);
```

## Options

An object with the following keys:

| Option    | Type   | Default value       | Description                                                  |
|-----------|--------|---------------------|--------------------------------------------------------------|
| precision | number | 3                   | The amount of decimal places the smallest unit will have     |
| minUnit   | string | `Units.MILLISECOND` | The smallest unit that will be used. One of the `Units` enum |
| maxUnit   | string | `Units.WEEK`        | The biggest unit that will be used. One of the `Units` enum  |

## I18n

The generated string does not have to be in English. You can specify any language, as long as it follows the format `unit1, unit2 [...] and unitN`.  
To do so, pass the time formatter funtion an i18n object with the translations. 

If you don't need to change the default options, then pass any falsy value.

### I18n keys

Each i18n unit key has a mandatory `singular` key and an optional `plural` key.  
The `and` key, used in `[...] and unitN` does not use singular or plural.

```js
const i18n = {
  // ...
  hour: {
    singular: 'hora', // Mandatory
    plural: 'horas'   // Optional, defaults to singular + 's'
  },
  // ...
  and: 'e'
};
```

| Key         | Default singular value | Default plural value |
|-------------|------------------------|----------------------|
| week        | 'week'                 | Singular value + 's' |
| day         | 'day'                  | Singular value + 's' |
| hour        | 'hour'                 | Singular value + 's' |
| minute      | 'minute'               | Singular value + 's' |
| second      | 'second'               | Singular value + 's' |
| millisecond | 'millisecond'          | Singular value + 's' |
| microsecond | 'microsecond'          | Singular value + 's' |
| and         | 'and'                  | N/A                  |

### Examples

#### Full translation

```js
const fullI18n = {
  week: {
    singular: 'semana'
  },
  day: {
    singular: 'dia'
  },
  hour: {
    singular: 'hora'
  },
  minute: {
    singular: 'minuto'
  },
  second: {
    singular: 'segundo'
  },
  millisecond: {
    singular: 'milissegundo'
  },
  microsecond: {
    singular: 'microssegundo'
  },
  and: 'e'
};

const formattedTime = formatTime(694861.001001, null, fullI18n);
// 1 semana, 1 dia, 1 hora, 1 minuto, 1 segundo e 1.001 milissegundos
```

#### Partial translation

You can just specify shorter units, for example.

```js
const options = { minUnit: Units.MICROSECOND };

const partialI18n = {
  millisecond: {
    singular: 'ms'
  },
  microsecond: {
    singular: 'μs'
  }
};

const formattedTime = formatTime(694861.001001, options, partialI18n);
// 1 week, 1 day, 1 hour, 1 minute, 1 second, 1 ms and 1 μs
```
