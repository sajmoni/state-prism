import test from 'ava'
import * as prism from 'state-prism'

test.cb('state-prism', (t) => {
  const externalState = {
    number: 0,
  }

  t.plan(10)

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

  prism.subscribe(
    'x',
    (newX) => {
      subscriber2Triggered += 1
      externalState.number = newX
    },
    {
      enabled: () => state.x !== 3,
    },
  )
  t.is(prism.getSubscriberCount(), 2)

  t.is(subscriber1Triggered, 0)
  t.is(subscriber2Triggered, 0)
  state.x += 1
  t.is(subscriber1Triggered, 1)
  t.is(subscriber2Triggered, 1)
  unsubscribe1()
  t.is(prism.getSubscriberCount(), 1)
  state.x += 1
  t.is(subscriber1Triggered, 1)
  t.is(subscriber2Triggered, 2)
  state.x += 1
  t.is(subscriber2Triggered, 2)
  t.end()
})

test('throw error if init is called more than once', (t) => {
  t.throws(() => prism.init({}))
})
