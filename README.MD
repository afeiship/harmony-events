# harmony-events
> Harmony events(nx).

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/harmony-events
```

## usage
```js
import HarmonyEvents from '@jswork/harmony-events';

class ReactComponent extends React.Component {
  // 1. private harmonyEvents
  private harmonyEvents:HarmonyEvents | null = null;
  constructor(props) {
    super(props);
    // 2. init harmonyEvents
    this.harmonyEvents = new HarmonyEvents({
      harmony: props.harmony,
      name: props.name,
      context: this,
      ns: '$rc',
      events: ['add', 'remove', 'clear']
    });
  }

  componentWillUnmount() {
    // 3. destroy harmonyEvents
    this.harmonyEvents?.destroy();
  }

  // add/remove/clear methods
  add = (item) => {};
  remove = (item) => {};
  clear = () => {};
}
```

## types
```ts
/// <reference types="@jswork/harmony-events/global.d.ts" />
```

## license
Code released under [the MIT license](https://github.com/afeiship/harmony-events/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/harmony-events
[version-url]: https://npmjs.org/package/@jswork/harmony-events

[license-image]: https://img.shields.io/npm/l/@jswork/harmony-events
[license-url]: https://github.com/afeiship/harmony-events/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/harmony-events
[size-url]: https://github.com/afeiship/harmony-events/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/harmony-events
[download-url]: https://www.npmjs.com/package/@jswork/harmony-events
