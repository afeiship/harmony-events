import EventMitt, { EventMittNamespace } from '@jswork/event-mitt';

interface Options {
  ns: string;
  name: string;
  events: string[];
  context: any;
}

class HarmonyEvents {
  private eventBus: EventMittNamespace.EventMitt;
  private options: Options;

  constructor(inOptions: Options) {
    this.options = inOptions;
    this.eventBus = Object.assign({}, EventMitt) as EventMittNamespace.EventMitt;
    this.registerNx();
    this.on();
  }

  static create(inOptions: Options) {
    return new HarmonyEvents(inOptions);
  }

  registerNx() {
    const { ns } = this.options;
    const ctx = window['nx'];
    if (ctx) {
      ctx.set(ctx, `${ns}.event`, this.eventBus);
    }
  }

  on() {
    const { events, context, name } = this.options;
    events.forEach((eventName) => {
      console.log('`${name}:${eventName}`: ', `${name}:${eventName}`);
      this.eventBus.on(`${name}:${eventName}`, context[eventName].bind(context));
    });
  }

  destroy() {
    const { events, name } = this.options;
    events.forEach((eventName) => {
      this.eventBus.off(`${name}:${eventName}`);
    });
  }
}

export default HarmonyEvents;
