/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable ava/no-ignored-test-files */

const test = require('ava')
const { init, subscribe } = require('state-prism')

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
