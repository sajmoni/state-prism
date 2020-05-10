```js
prism.subscribe(path, callback)
```

Subscribe to state changes.

From the [`on-change`](https://github.com/sindresorhus/on-change) docs:

```
It works recursively, so it will even detect if you modify a deep property like obj.a.b[0].c = true.
```

## Arguments

`path` (string): Object you want to listen to.

`callback` ((value, previousValue) => void): This callback is called whenever the value is changed

## Returns

`Unsubscribe` (() => void): A function that cancels the subscription. 

## Example

```js
import * as prism from 'state-prism'

const unsubscribe = prism.subscribe('application.volume', (volume, previousVolume) => {
  console.log('volume', volume)
  console.log('previousVolume', previousVolume)
}

// Later when you don't need the listener any more, do:
unsubscribe()
```
