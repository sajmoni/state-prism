/* eslint-disable @typescript-eslint/no-var-requires */

const test = require('ava')
const { init, subscribe, getSubscriberCount } = require('state-prism')

const externalState = {
  number: 0,
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

test.cb('state-prism', (t) => {
  t.plan(4)
  let subscriberTriggered = 0

  const state = init({
    x: 0,
    y: 'y',
    z: false,
  })

  const unsubscribe = subscribe('x', (newX) => {
    subscriberTriggered += 1
    externalState.number = newX
    t.is(newX, 1)
  })

  t.is(subscriberTriggered, 0)
  state.x += 1
  t.is(subscriberTriggered, 1)
  unsubscribe()
  state.x += 1
  t.is(subscriberTriggered, 1)
  t.end()
})

test('getSubscriberCount', (t) => {
  init({
    x: 0,
    y: 'y',
  })

  const unsubscribes = []
  unsubscribes.push(subscribe('x', noop))
  unsubscribes.push(subscribe('x', noop))
  unsubscribes.push(subscribe('y', noop))

  t.is(getSubscriberCount(), 3)

  unsubscribes.forEach((unsubscribe) => {
    unsubscribe()
  })

  t.is(getSubscriberCount(), 0)
})
