<h1 align="center">
  state-prism
</h1>
<h4 align="center">
    Subscribe to state changes
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/state-prism?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/state-prism" />
</div>

## :sparkles: Features

`state-prism` lets you subscribe to state changes. It is thin layer on top of [`on-change`](https://github.com/sindresorhus/on-change).

I use it mainly for games. Whenever the game's state is updated, I trigger a callback to re render UI components that are dependent on that state.

---

## :wrench: Example usage

Let's say my state looks like this:

`state.js`

```js
import * as prism from 'state-prism'

export default prism.init({
  player: {
    mana: 10,
  },
})
```

Somewhere in my code the player spends 5 mana:

`battle.js`

```js
import state from './state'

state.player.mana -= 5
```

Then I can re render my UI component that renders the mana.

`ui.js`

```js
import * as prism from 'state-prism'

prism.subscribe('player.mana', (mana) => {
  renderMana(mana)
})
```

Using this pattern, the state logic and the render functions can be kept separate.

---

## :package: Install

**npm**

```
npm install state-prism
```

**yarn**

```
yarn add state-prism
```

---

## :newspaper: API

### `Basic`

[init](docs/init.md) - Initialize `state-prism` with your state object. Enables listening to changes.

[subscribe](docs/subscribe.md) - Attach a callback to a path in your state. The callback will be called whenever the state changes.

### `Advanced`

[target](docs/target.md) - Access the original state object. You probably won't need this.

---

## :book: Recipes

I usually put my state in a file called `state.js`:

```ts
import * as prism from 'state-prism'

const state = {
  x: 0,
}

export default prism.init(state)
```

---

## :computer: Develop

### Commands

| Command        | Description                                    |
| -------------- | ---------------------------------------------- |
| `yarn build`   | Generate files in the `dist` folder            |
| `yarn release` | Start the process to release a new version     |
| `yarn tsc`     | Run a type check with `typescript`             |
| `yarn lint`    | Lint with `eslint`                             |
| `yarn clean`   | Remove build artefact (`.tgz` file)            |
| `yarn go`      | Builds, packs and installs to `example` folder |

### Workflow

1. Make changes
2. `yarn go` and verify that your changes work.
3. Commit to `master` or make `PR`

#### Release

1. `yarn release:prepare` - Sets up your library for release
2. If everything worked in the previous step: `yarn release`