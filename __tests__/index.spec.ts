import nx from '@jswork/next';
import HarmonyEvents from '../src';

class MyComponent {
  private he: HarmonyEvents;
  constructor(
    public data,
    public name
  ) {
    this.data = data;
    this.he = HarmonyEvents.create({ ns: '$my', events: ['add', 'del'], name, context: this });
  }

  add(item) {
    this.data.push(item);
  }

  del(item) {
    const idx = this.data.indexOf(item);
    this.data.splice(idx, 1);
  }

  unmount() {
    this.he.destroy();
  }
}

describe('api.basic', () => {
  // spyOn windonw => globalThis
  // @ts-ignore
  globalThis['window'] = globalThis;

  test.skip('Register and emit event', () => {
    const myComponent = new MyComponent([], 'test');
    myComponent.add(1);
    myComponent.add(2);
    myComponent.add(3);
    expect(myComponent.data).toEqual([1, 2, 3]);

    // add
    nx.$my.event.emit('test:add', 4);
    expect(myComponent.data).toEqual([1, 2, 3, 4]);

    // remove
    nx.$my.event.emit('test:del', 1);
    expect(myComponent.data).toEqual([2, 3, 4]);
  });

  test('Multiple instances', () => {
    const ins1 = new MyComponent([], 't1');
    const ins2 = new MyComponent([], 't2');

    ins1.add(1);
    ins2.add(2);
    expect(ins1.data).toEqual([1]);
    expect(ins2.data).toEqual([2]);


    // events
    nx.$my.event.emit('t1:add', 3);
    expect(ins1.data).toEqual([1, 3]);
    nx.$my.event.emit('t2:add', 4);
    expect(ins2.data).toEqual([2, 4]);
  });
});
