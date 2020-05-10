# Example docs

```js
prism.init(state)
```

Enable subscribing to changes.

## Arguments

`State` (object): Object you want to listen to.

## Returns

`State` (object): The same object that is now possible to subscribe to.

## Example

I usually put my state in a file called `state.js`

`state.js`

```ts
import * as prism from 'state-prism'

const state = {
  x: 0,
}

export default prism.init(state)
```
