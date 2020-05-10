```js
prism.subscribe(path, callback)
```

Subscribe to state changes.

Detects deep changes to your state such as:

```js
state.a.b[0].c = true.
```

## Arguments

`path` (string): The path in the state object that you want to listen to.

`callback` ((value, previousValue) => void): The callback is called whenever the value is changed

## Returns

`unsubscribe` (() => void): A function that cancels the subscription.

## Example

```js
import * as prism from 'state-prism'

const unsubscribe = prism.subscribe('application.volume', (volume, previousVolume) => {
  console.log('volume', volume)
  console.log('previousVolume', previousVolume)
}

// Later when you don't need to subscribe any more, do:
unsubscribe()
```
