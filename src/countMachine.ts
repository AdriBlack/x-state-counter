import { assign, createMachine, interpret } from 'xstate';

export const counter = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2UoBswDoCiAdgIYBG2EAxANoAMAuoqAA6qwCWALm6gYyAB6IATAFYcNAJwBGACw0asgGwyAHDIDMAdhEAaEAE9EAWiHqZOdYpEihModIkShQgL4u9aDNnzEykHADyBBSeWGC0DEggLOxcPHyCCCYimhZSIoqa6ipCKlKieoZJylI4mtoiGkL5KhI0im4e6GE+pOSBAGYdIc3YEXwxnNy8UYlG6tU4ajKVNM4SIlKWugbGIvI4ppqKSyITUooqam7uIASoEHB8odgDrEPxo8Yy2jjKkuqVqjNSaoXGeUUZQqlVEyjkDVON1wABE2LA2pA7rFhglhPU3jsnIohIoFup8isikYVEDSdZbPYpI5qhJGiBoa0-BBkQ8RqAxnZUu8JJ8ZN9Fn9VklNPZNiC8SoaFkcfTGYRERBAuzovc4iqxloJG85LyvmpBTJ-klKmJytYqjU6pCml5cArmZ0Oqz1WikulUjJFOoaBNNPURKTfsajIoaOYaItFgcXnjVCcXEA */
    id: 'Toggle',

    initial: 'Enabled',
    tsTypes: {} as import('./countMachine.typegen').Typegen0,

    context: {
      count: 0,
    },

    states: {
      Disabled: {},
      Enabled: {
        initial: 'On',

        states: {
          On: {
            on: {
              Toggle: {
                target: '#Toggle.Enabled.Off',
              },
            },
          },
          Off: {
            entry: 'incrementToggle',
            on: {
              Toggle: {
                actions: 'incrementToggle',
                target: '#Toggle.Enabled.On',
              },
            },
          },
        },

        always: {
          cond: 'greaterThanFive',
          target: 'Disabled',
        },
      },
    },
  },
  {
    guards: {
      greaterThanFive: (context, _event) => {
        return context.count >= 5;
      },
    },
    actions: {
      incrementToggle: assign({
        count: (context, _event) => {
          return context.count + 1;
        },
      }),
    },
  }
);
