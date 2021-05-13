import { performance } from 'perf_hooks'

import { init, subscribe } from 'state-prism'

const state = init({
  foo: 0,
})

const measurePerformance = () => {
  const before = performance.now()

  const unsubscribes = []
  for (let index = 0; index < 200; index++) {
    const unsubscribe = subscribe('foo', () => {})
    unsubscribes.push(unsubscribe)
  }

  state.foo += 1

  for (const unsubscribe of unsubscribes) {
    unsubscribe()
  }

  const after = performance.now()
  const delta = after - before
  console.log('Time to run:', delta)
}

measurePerformance()
