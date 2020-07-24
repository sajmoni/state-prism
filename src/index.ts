import onChange from 'on-change'

type Subscriber = {
  [key: string]: callback[]
}

const subscriber: Subscriber = {}
let hasBeenInitialized = false

const onChangeFn = (path: string, value: any, previousValue: any) => {
  if (!subscriber[path]) {
    return
  }

  subscriber[path].forEach((callback: callback) => {
    callback(value, previousValue)
  })
}

/**
 * Enables subscribing to state changes
 */
export const init = <State>(state: State): State => {
  if (hasBeenInitialized) {
    throw new Error(
      'state-prism: init has already been called once. state-prism currently only supports one state',
    )
  }

  hasBeenInitialized = true
  return onChange(state, onChangeFn)
}

/**
 * Get state as a regular JavaScript object. Enables destructuring.
 */
export const target = <State>(state: Readonly<State>): State =>
  onChange.target(state)

type callback = (value: any, previousValue: any) => void

type unsubscribe = () => void

/**
 * Subscribe to state changes
 */
export const subscribe = (path: string, callback: callback): unsubscribe => {
  subscriber[path] = subscriber[path]
    ? subscriber[path].concat(callback)
    : [callback]

  const unsubscribe = () => {
    const indexToRemove = subscriber[path].indexOf(callback)
    if (indexToRemove >= 0) {
      // * Mutate array for performance reasons
      subscriber[path].splice(indexToRemove, 1)
    }
  }

  return unsubscribe
}

export const getSubscriberCount = () => {
  return (
    Object.values(subscriber)
      .map((callbacks) => {
        return callbacks.length
      })
      // eslint-disable-next-line unicorn/no-reduce
      .reduce((total, callbacksLength) => total + callbacksLength, 0)
  )
}
