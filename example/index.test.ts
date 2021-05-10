import test from 'ava'
import * as prism from 'state-prism'

test('state-prism', (t) => {
  const externalState = {
    number: 0,
  }

  let subscriber1Triggered = 0
  let subscriber2Triggered = 0

  const state = prism.init({
    x: 0,
    y: 'y',
    z: false,
  })

  t.is(prism.getSubscriberCount(), 0)
  const unsubscribe1 = prism.subscribe('x', (newX) => {
    subscriber1Triggered += 1
    externalState.number = newX
  })

  const unsubscribeX2 = prism.subscribe(
    'x',
    (newX) => {
      subscriber2Triggered += 1
      externalState.number = newX
    },
    {
      enabled: () => state.x !== 3,
    },
  )

  prism.subscribe('y', () => {
    // Do nothing
  })

  // No subscribers for this field, should not crash
  state.z = true

  t.is(prism.getSubscriberCount(), 3)
  t.deepEqual(prism.getSubscribers(), {
    x: 2,
    y: 1,
  })

  t.is(subscriber1Triggered, 0)
  t.is(subscriber2Triggered, 0)
  state.x += 1
  t.is(subscriber1Triggered, 1)
  t.is(subscriber2Triggered, 1)
  unsubscribe1()
  t.is(prism.getSubscriberCount(), 2)
  state.x += 1
  t.is(subscriber1Triggered, 1)
  t.is(subscriber2Triggered, 2)
  unsubscribeX2()
  t.deepEqual(prism.getSubscribers(), {
    y: 1,
  })
  state.x += 1
  t.is(subscriber2Triggered, 2)
})

test('throw error if init is called more than once', (t) => {
  t.throws(() => prism.init({}))
})
