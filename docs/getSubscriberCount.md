```js
prism.getSubscriberCount(state)
```

Get the total amount of subscribers.

## Arguments

None.

## Returns

`subscriberCount` (number): The total amount of subscribers

## Example

```ts
init({
  x: 0,
  y: 'y',
})

subscribe('x', () => {})
subscribe('x', () => {})
subscribe('y', () => {})

getSubscriberCount() // 3
```
