const { init, subscribe } = require('state-prism')
const { performance } = require('perf_hooks')

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

  unsubscribes.forEach((unsubscribe) => {
    unsubscribe()
  })

  const after = performance.now()
  const delta = after - before
  console.log('Time to run:', delta)
}

measurePerformance()
