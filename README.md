# time-formatter

The `time-formatter` package converts a number representing elapsed time into a human readable string.

## Examples

<details>
<summary><strong>JavaScript</strong></summary>

```js
import { formatTime } from '@rwf-projects/time-formatter';

const formattedTime = formatTime(4.256128);
// 4 seconds and 256.128 milliseconds
```

```js
import { formatTime } from '@rwf-projects/time-formatter';

const options = { minUnit: 'second', maxUnit: 'hour' };
const formattedTime = formatTime(94592, options);
// 26 hours, 16 minutes and 32 seconds
```

```js
import { formatTime } from '@rwf-projects/time-formatter';

const options = { precision: 1, minUnit: 'microsecond' };
const formattedTime = formatTime(792496.032064128, options);
// 1 week, 2 days, 4 hours, 8 minutes, 16 seconds, 32 milliseconds and 64.1 microseconds
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
import { formatTime } from '@rwf-projects/time-formatter';

const formattedTime: string = formatTime(4.256128);
// 4 seconds and 256.128 milliseconds
```

```ts
import { formatTime, Options, Units } from '@rwf-projects/time-formatter';

const options: Partial<Options> = { minUnit: Units.SECOND, maxUnit: Units.HOUR };
const formattedTime: string = formatTime(94592, options);
// 26 hours, 16 minutes and 32 seconds
```

```ts
import { formatTime, Options, Units } from '@rwf-projects/time-formatter';

const options: Partial<Options> = { precision: 1, minUnit: Units.MICROSECOND };
const formattedTime: string = formatTime(792496.032064128, options);
// 1 week, 2 days, 4 hours, 8 minutes, 16 seconds, 32 milliseconds and 64.1 microseconds
```

</details>

## Features

- Outputs a nice human-readable string representig a time interval;
- Output units from weeks down to microsecond;
- Minimum and maximum units are configurable;
- Arbitrary precision in the lower unit;
- Translatable;
- Works with `require` and `import`.

### Available units

The available units are `week`, `day`, `hour`, `minute`, `second`, `millisecond` and `microsecond`.  
In TypeScript these units are available through the `Units` enum.

Why not bigger than `week`?

- Because bigger units are not precise enough. A week is exactly 7 days. A month can have any duration between 28 and 31
  days.

Why not smaller than `microsecond`?

- Because the way JavaScript handles floating point numbers introduces errors at very small ranges;
- It is also the maximum precision `performance.now` returns.

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

<details>
<summary><strong>JavaScript</strong></summary>

Start by importing.

```js
import { formatTime } from '@rwf-projects/time-formatter';
```

... or requiring.

```js
const { formatTime } = require('@rwf-projects/time-formatter');
```

Then

```js
const formattedTime = formatTime(time, [options], [i18n]);
```

</details>

<details>
<summary><strong>TypeScript</strong></summary>

```ts
import { formatTime, Options, I18n } from '@rwf-projects/time-formatter';

const formattedTime: string = formatTime(time, [options], [i18n]);
```

</details>

## Options

An object with the following keys:

| Option    | Type   | Default value in JS | Default value in TS | Description                                                     |
| --------- | ------ | ------------------- | ------------------- | --------------------------------------------------------------- |
| precision | number | 3                   | 3                   | The amount of decimal places the smallest unit will have        |
| minUnit   | string | 'millisecond'       | `Units.MILLISECOND` | The smallest unit that will be used. One of the available units |
| maxUnit   | string | 'week'              | `Units.WEEK`        | The biggest unit that will be used. One of the available units  |

## I18n

The generated string does not have to be in English. You can specify any language, as long as it follows the
format `unit1, unit2 [...] and unitN`.  
To do so, pass the time formatter funtion an i18n object with the translations.

If you don't need to change the default options, then pass any falsy value.

### I18n keys

Each i18n unit key has a mandatory `singular` key and an optional `plural` key.  
The `and` key, used in `[...] and unitN` does not use singular or plural.

| Key in JS   | Key in TS         | Default singular value | Default plural value |
| ----------- | ----------------- | ---------------------- | -------------------- |
| week        | Units.WEEK        | 'week'                 | Singular value + 's' |
| day         | Units.DAY         | 'day'                  | Singular value + 's' |
| hour        | Units.HOUR        | 'hour'                 | Singular value + 's' |
| minute      | Units.MINUTE      | 'minute'               | Singular value + 's' |
| second      | Units.SECOND      | 'second'               | Singular value + 's' |
| millisecond | Units.MILLISECOND | 'millisecond'          | Singular value + 's' |
| microsecond | Units.MICROSECOND | 'microsecond'          | Singular value + 's' |
| and         | and               | 'and'                  | N/A                  |

### Examples

#### Full translation

You can translate all the keys.

<details>
<summary>JavaScript example</summary>

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

</details>

<details>
<summary>TypeScript example</summary>

```ts
const fullI18n: I18n = {
  [Units.WEEK]: {
    singular: 'semana'
  },
  [Units.DAY]: {
    singular: 'dia'
  },
  [Units.HOUR]: {
    singular: 'hora'
  },
  [Units.MINUTE]: {
    singular: 'minuto'
  },
  [Units.SECOND]: {
    singular: 'segundo'
  },
  [Units.MILLISECOND]: {
    singular: 'milissegundo'
  },
  [Units.MICROSECOND]: {
    singular: 'microssegundo'
  },
  and: 'e'
};

const formattedTime: string = formatTime(694861.001001, null, fullI18n);
// 1 semana, 1 dia, 1 hora, 1 minuto, 1 segundo e 1.001 milissegundos
```

</details>

#### Partial translation

You can just specify shorter units, for example.

<details>
<summary>JavaScript example</summary>

```js
const options = { minUnit: 'microsecond' };

const partialI18n = {
  millisecond: {
    singular: 'ms',
    plural: 'ms'
  },
  microsecond: {
    singular: 'μs',
    plural: 'μs'
  }
};

const formattedTime = formatTime(694861.001001, options, partialI18n);
// 1 week, 1 day, 1 hour, 1 minute, 1 second, 1 ms and 1 μs
```

</details>

<details>
<summary>TypeScript example</summary>

```ts
const options: Partial<Options> = { minUnit: 'microsecond' };

const partialI18n: Partial<I18n> = {
  millisecond: {
    singular: 'ms',
    plural: 'ms'
  },
  microsecond: {
    singular: 'μs',
    plural: 'μs'
  }
};

const formattedTime: string = formatTime(694861.001001, options, partialI18n);
// 1 week, 1 day, 1 hour, 1 minute, 1 second, 1 ms and 1 μs
```

</details>
