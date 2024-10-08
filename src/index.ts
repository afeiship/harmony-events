import EventMitt, { EventMittNamespace } from '@jswork/event-mitt';
import ReactHarmonyEvents from './react';

interface Options {
  harmony?: boolean;
  name?: string;
  ns: string;
  items: string[];
  context: any;
}

const defaults = {
  name: '@',
  harmony: false,
  ns: 'hEvents',
  items: [],
  context: null,
};

class HarmonyEvents {
  private eventBus: EventMittNamespace.EventMitt | null = null;
  private options: Options;

  constructor(inOptions: Options) {
    this.options = { ...defaults, ...inOptions };
    if (this.options.harmony) {
      this.init();
      this.on();
    }
  }

  init() {
    const { ns } = this.options;
    const ctx = window['nx'];
    const event = ctx.get(ctx, `${ns}.event`);
    this.eventBus = event || (Object.assign({}, EventMitt) as EventMittNamespace.EventMitt);
    if (ctx) ctx.set(ctx, `${ns}.event`, this.eventBus);
  }

  on() {
    const { items, context, name } = this.options;
    items.forEach((eventName) => {
      const method = context[eventName];
      if (method) this.eventBus?.on(`${name}:${eventName}`, method.bind(context));
    });
  }

  destroy() {
    const { name } = this.options;
    this.eventBus?.off(`${name}:*`);
  }
}

export default HarmonyEvents;
export { ReactHarmonyEvents };
