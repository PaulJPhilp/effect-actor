
# effect-actor

[![npm version](https://badge.fury.io/js/effect-actor.svg)](https://badge.fury.io/js/effect-actor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Effect-native actor orchestration framework with statechart semantics.

## What is effect-actor?

effect-actor is a powerful, type-safe actor orchestration framework built natively for the [Effect](https://effect.website/) ecosystem. It brings the proven statechart model of [xState](https://xstate.js.org/) to Effect with zero external dependencies.

### Key Features

- **Effect-Native**: Built for Effect's functional programming model
- **Type Safety**: Full TypeScript inference with Effect.Schema validation
- **State Machines**: Hierarchical states with guards, actions, and transitions
- **Persistence**: Built-in state persistence and audit trails
- **Observability**: Native Effect logging, tracing, and metrics
- **Composition**: Seamless integration with Effect services and layers

## Installation

```bash
npm install effect-actor-pauljphilp
# or
bun add effect-actor
# or
yarn add effect-actor
```

**Peer Dependencies**: Requires Effect >= 3.18.4

```bash
npm install effect
# or
bun add effect
```

## Quick Start

```typescript
import { Effect } from "effect";
import { createActorSpec } from "effect-actor-pauljphilp/spec";
import { ActorService } from "effect-actor-pauljphilp/actor";

// Define your state machine
const TodoSpec = createActorSpec({
  id: "todo",
  initial: "pending",
  states: {
    pending: {
      on: {
        START: { target: "in-progress" },
        CANCEL: { target: "cancelled" }
      }
    },
    "in-progress": {
      on: {
        COMPLETE: { target: "completed" },
        CANCEL: { target: "cancelled" }
      }
    },
    completed: {},
    cancelled: {}
  }
});

// Use in your Effect program
const program = Effect.gen(function* () {
  const service = yield* ActorService;

  // Register the spec
  yield* service.register(TodoSpec);

  // Execute transitions
  const result = yield* service.execute({
    actorType: "todo",
    actorId: "task-1",
    event: "START"
  });

  console.log(`Transitioned: ${result.from} → ${result.to}`);
});
```

## Why Effect?

effect-actor is inspired by xState but designed specifically for Effect:

| Aspect | xState | effect-actor |
|--------|--------|--------------|
| **Runtime** | JavaScript VM | Effect runtime |
| **Composition** | Standalone | Effect layers + DI |
| **Type Safety** | TypeScript types | Effect.Schema + inference |
| **Dependencies** | Self-contained | Effect only |
| **Error Handling** | Error channel | Tagged errors in Effect |
| **Observability** | Via middleware | Native Effect logging/spans |

## Examples

Check out the [examples](./packages/effect-actor/src/examples/) directory for complete workflows:

- **Content Production**: Blog post publishing workflow
- **Hiring Pipeline**: Recruitment process management
- **Feature Rollout**: Software deployment orchestration

## Documentation

- [Architecture](./docs/Architecture.md)
- [Implementation Plan](./docs/ImplementationPlan.md)
- [Test Strategy](./docs/TestStrategy.md)

## Contributing

Contributions are welcome! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT © [Your Name](https://github.com/yourusername)

## Acknowledgments

effect-actor builds upon the proven statechart model pioneered by [xState](https://xstate.js.org/). We're grateful for the xState team's work in popularizing state machines for JavaScript applications.
