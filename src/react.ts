import { Component } from 'react';
import EventMitt, { EventMittNamespace } from '@jswork/event-mitt';

/**
 * 与常规的 harmony-events 不同的是，这个是专门针对 react 类组件实现的。
 * 因为针对具体的 React 组件，需要绑定到其实例上, 所以不会绑定到 nx 上，所以不需要 ns 属性，区分不同的组件。
 * 针对类组件直接启用即可，所以 harmony 不需要。
 * items 太抽象，换成 events，放到 ClassComponent 的 static 属性上，方便定义。
 */

interface Options {
  name?: string;
  context: any;
}

class ReactHarmonyEvents {
  private readonly options: Options;

  static create(context: Component<any>) {
    return new ReactHarmonyEvents(context);
  }

  get componentClass() {
    const { context } = this.options;
    return context.constructor as any;
  }

  constructor(context: Component<any>) {
    const { name } = context.props;
    this.options = { name, context };
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
    const items: string[] = target.events || [];
    items.forEach((eventName) => {
      const method = context[eventName];
      if (method) target.event?.on(`${name}:${eventName}`, method?.bind(context));
    });
  }

  destroy() {
    const { name } = this.options;
    this.componentClass.event?.off(`${name}:*`);
  }
}

export default ReactHarmonyEvents;
