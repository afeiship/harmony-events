import EventMitt, { EventMittNamespace } from '@jswork/event-mitt';

interface Options {
  ns: string;
  name: string;
  events: string[];
  context: any;
}

class HarmonyEvents {
  private eventBus: EventMittNamespace.EventMitt | null = null;
  private options: Options;

  constructor(inOptions: Options) {
    this.options = inOptions;
    this.init();
    this.on();
  }

  static create(inOptions: Options) {
    return new HarmonyEvents(inOptions);
  }

  init() {
    const { ns } = this.options;
    const ctx = window['nx'];
    const event = ctx.get(ctx, `${ns}.event`);
    this.eventBus = event || (Object.assign({}, EventMitt) as EventMittNamespace.EventMitt);
    if (ctx) ctx.set(ctx, `${ns}.event`, this.eventBus);
  }

  on() {
    const { events, context, name } = this.options;
    events.forEach((eventName) => {
      this.eventBus?.on(`${name}:${eventName}`, context[eventName].bind(context));
    });
  }

  off() {
    const { events, name } = this.options;
    events.forEach((eventName) => {
      this.eventBus?.off(`${name}:${eventName}`);
    });
  }
}

export default HarmonyEvents;
