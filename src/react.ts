import { ComponentClass } from 'react';
import EventMitt, { EventMittNamespace } from '@jswork/event-mitt';

interface Options {
  name?: string;
  context: any;
}

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
