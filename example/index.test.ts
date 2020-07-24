/* eslint-disable @typescript-eslint/no-var-requires */

const test = require('ava')
const { init, subscribe, getSubscriberCount } = require('state-prism')

test.cb('state-prism', (t) => {
  const externalState = {
    number: 0,
  }

  t.plan(9)

  let subscriber1Triggered = 0
  let subscriber2Triggered = 0

  const state = init({
    x: 0,
    y: 'y',
    z: false,
  })

  t.is(getSubscriberCount(), 0)
  const unsubscribe1 = subscribe('x', (newX) => {
    subscriber1Triggered += 1
    externalState.number = newX
  })

  subscribe('x', (newX) => {
    subscriber2Triggered += 1
    externalState.number = newX
  })
  t.is(getSubscriberCount(), 2)

  t.is(subscriber1Triggered, 0)
  t.is(subscriber2Triggered, 0)
  state.x += 1
  t.is(subscriber1Triggered, 1)
  t.is(subscriber2Triggered, 1)
  unsubscribe1()
  t.is(getSubscriberCount(), 1)
  state.x += 1
  t.is(subscriber1Triggered, 1)
  t.is(subscriber2Triggered, 2)
  t.end()
})

test('throw error if init is called more than once', (t) => {
  t.throws(() => init({}))
})
