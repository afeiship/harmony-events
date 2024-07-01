import EventMitt, { EventMittNamespace } from '@jswork/event-mitt';

interface Options {
  harmony?: boolean;
  ns: string;
  name: string;
  items: string[];
  context: any;
}

class HarmonyEvents {
  private eventBus: EventMittNamespace.EventMitt | null = null;
  private options: Options;

  constructor(inOptions: Options) {
    this.options = { harmony: false, ...inOptions };
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
      this.eventBus?.on(`${name}:${eventName}`, context[eventName].bind(context));
    });
  }

  off() {
    const { name } = this.options;
    this.eventBus?.off(`${name}:*`);
  }
}

export default HarmonyEvents;
