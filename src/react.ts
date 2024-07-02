import { ComponentClass } from 'react';
import EventMitt, { EventMittNamespace } from '@jswork/event-mitt';

/**
 * 与常规的 harmony-events 不同的是，这个是专门针对 react 类组件实现的。
 * 因为针对具体的 React 组件，需要绑定到其实例上, 所以不会绑定到 nx 上，所以不需要 ns 属性，区分不同的组件。
 * 针对类组件直接启用即可，所以 harmony 不需要。
 * items 太抽象，换成 events，放到 ClassComponet 的 static 属性上，方便定义。
 */

interface Options {
  name?: string;
  context: any;
}

// todo: add typings for react, but not sure how to do it.
declare module 'react' {
  interface ComponentClass {
    event: EventMittNamespace.EventMitt;
    events: string[];
  }
}

const defaults = {
  name: '@',
  context: null,
};

class ReactHarmonyEvents {
  private options: Options;

  get componentClass() {
    const { context } = this.options;
    return context.constructor as ComponentClass;
  }

  constructor(inOptions: Options) {
    this.options = { ...defaults, ...inOptions };
    this.init();
    this.on();
  }

  init() {
    const target = this.componentClass;
    target.event = target.event || (Object.assign({}, EventMitt) as EventMittNamespace.EventMitt);
  }

  on() {
    const { context, name } = this.options;
    const target = this.componentClass;
    const items = target.events || [];
    items.forEach((eventName) => {
      target.event?.on(`${name}:${eventName}`, context[eventName].bind(context));
    });
  }

  destroy() {
    const { name } = this.options;
    this.componentClass.event?.off(`${name}:*`);
  }
}

export default ReactHarmonyEvents;
