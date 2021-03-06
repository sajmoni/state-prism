import onChange from 'on-change'

export type subscriberValue = { callback: callback; options: options }

export type Subscriber = Record<string, subscriberValue[]>

const subscriber: Subscriber = {}
let hasBeenInitialized = false

const onChangeFn = (path: string, value: any, previousValue: any) => {
  if (!subscriber[path]) {
    return
  }

  subscriber[path]
    .filter(({ options }) => options.enabled === undefined || options.enabled())
    // eslint-disable-next-line unicorn/no-array-for-each
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
 * Get state as a regular JavaScript object. Enables destructuring and logging.
 */
export const target = <State>(state: Readonly<State>): State =>
  onChange.target(state)

export type callback = (value: any, previousValue: any) => void

export type options = {
  enabled?: () => boolean
}

export type unsubscribe = () => void

/**
 * Subscribe to state changes
 */
export const subscribe = (
  /**
   * The path in state to subscribe to
   *
   * @example state.player.mana
   */
  path: string,
  /**
   * Callback function that will be called on each state update
   *
   * @example (value, previousValue) => renderMana(value)
   */
  callback: callback,
  /**
   * Options
   *
   * @example { enable: () => state.scene === 'battle' }
   */
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

/**
 * Get the amount of subscribers per path
 *
 * Should only be used when debugging
 */
export const getSubscribers = (): Record<string, number> => {
  const entries = Object.entries(subscriber).map(([path, callbacks]) => {
    return [path, callbacks.length]
  })

  return Object.fromEntries(entries)
}

/**
 * Get the total amount of subscriber functions
 *
 * Should only be used when debugging
 */
export const getSubscriberCount = (): number => {
  return (
    Object.values(subscriber)
      .map((callbacks) => callbacks.length)
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce((total, callbacksLength) => total + callbacksLength, 0)
  )
}
