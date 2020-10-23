import onChange from 'on-change'

type subscriberValue = { callback: callback; options: options }

type Subscriber = {
  [key: string]: subscriberValue[]
}

const subscriber: Subscriber = {}
let hasBeenInitialized = false

const onChangeFn = (path: string, value: any, previousValue: any) => {
  // if (!subscriber[path]) {
  //   return
  // }

  subscriber[path]
    .filter(({ options }) => options.enabled === undefined || options.enabled())
    .forEach(({ callback }) => {
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

type options = {
  enabled?: () => boolean
}

type unsubscribe = () => void

/**
 * Subscribe to state changes
 */
export const subscribe = (
  path: string,
  callback: callback,
  options: options = {},
): unsubscribe => {
  const subscriberValue = { callback, options }

  subscriber[path] = subscriber[path]
    ? subscriber[path].concat(subscriberValue)
    : [subscriberValue]

  const unsubscribe = () => {
    const indexToRemove = subscriber[path].indexOf(subscriberValue)
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
