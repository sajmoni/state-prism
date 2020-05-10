```js
prism.target(state)
```

Returns the original unwatched object.

This function is the same as in [`onChange`](https://github.com/sindresorhus/on-change#onchangetargetobject).

_Enables destructuring the state_

## Arguments

`state` (object): The object that you are listening to

## Returns

`state` (object): The original object that was passed to [`init`](init.md)

## Example

```ts
import * as prism from 'state-prism'
import state from './state'

const unwatchedState = prism.target(state)

// Now possible to destructure state
const { x, y } = unwatchedState
```
