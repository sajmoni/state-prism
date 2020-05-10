```js
prism.target(state)
```

Returns the original unwatched object.

This function is the same as in [`onChange`](https://github.com/sindresorhus/on-change#onchangetargetobject).

_Enables destructuring_

## Arguments

`State` (object): The object that you are listening to

## Returns

`State` (object): The same object that is now possible to subscribe to.

## Example

I usually put my state in a file called `state.js`

`state.js`

```ts
import * as sp from 'state-prism'

const state = {
  x: 0,
}

export default sp.init(state)
```
