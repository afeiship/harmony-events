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

## implements
- [react-interactive-list](https://github.com/afeiship/react-interactive-list)
- [react-toast](https://github.com/afeiship/react-toast)
- [react-scrollspy-nav](https://github.com/afeiship/react-scrollspy-nav)
- [react-scroll-pin](https://github.com/afeiship/react-scroll-pin)
- [react-echarts](https://github.com/afeiship/react-echarts)
- [react-fly2cart](https://github.com/afeiship/react-fly2cart)

## usage
```js
import HarmonyEvents from '@jswork/harmony-events';

class MyComponent extends React.Component {
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
      items: ['add', 'remove', 'clear']
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

// 4. add typings
interface NxStatic {
  $rc: {
    event: import('@jswork/event-mitt').EventMittNamespace.EventMitt;
  }
}

// 5.  when use in React component
<MyComponent name="t1" />
<MyComponent name="t2" />

// 6. call methods
nx.$rc.event.emit('t1:add', { name: 't1', item: 'hello' });
nx.$rc.event.emit('t2:add', { name: 't2', item: 'world' });

nx.$rc.event.emit('t1:remove', 0);
nx.$rc.event.emit('t2:remove', 1);

nx.$rc.event.emit('t1:clear');
nx.$rc.event.emit('t2:clear');

// ------------ use ReactHarmonyEvents ------------
import { ReactHarmonyEvents } from '@jswork/harmony-events';
import type { EventMittNamespace } from '@jswork/event-mitt';

interface MyComponentProps {
  /**
   * The identity name.
   */
  name?: string;
}

class MyComponent extends React.Component {
  // 1. public events
  static events = ['add', 'remove', 'clear'];
  static event: EventMittNamespace.EventMitt;
  
  // 2. private harmonyEvents
  private harmonyEvents:ReactHarmonyEvents | null = null;
  
  constructor(props) {
    super(props);
    // 3.1. init harmonyEvents
    this.harmonyEvents = ReactHarmonyEvents.create(this);
  }

  // OR use componentDidMount
  componentDidMount(): void {
    // 3.2. init harmonyEvents
    this.harmonyEvents = ReactHarmonyEvents.create(this);
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

// 3.  when use in React component
<MyComponent name="t1" />
<MyComponent name="t2" />

// 4. call methods
MyComponent.event.emit('t1:add', { name: 't1', item: 'hello' });
MyComponent.event.emit('t2:add', { name: 't2', item: 'world' });

MyComponent.event.emit('t1:remove', 0);
MyComponent.event.emit('t2:remove', 1);

MyComponent.event.emit('t1:clear');
MyComponent.event.emit('t2:clear');

// 5. useCommand
import RcComponent from '.';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    RcComponent.event?.emit(`${name}:${command}`, ...args);

  const listen = (cmd: string, callback: any) => RcComponent.event?.on(`${name}:${cmd}`, callback);

  // the command repository:
  const bottom = (index: number) => execute('bottom', index);

  return {
    listen,
    bottom,
  };
};

export default useCommand;
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
