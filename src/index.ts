import onChange from 'on-change'

export type subscriberValue = { callback: callback; options: options }

export type Subscriber = Record<string, subscriberValue[]>

const subscriber: Subscriber = {}
let hasBeenInitialized = false

const onChangeFn = (path: string, value: any, previousValue: any) => {
  if (!subscriber[path]) {
    return
  }

  for (const { callback, options } of subscriber[path]) {
    if (options.enabled === undefined || options.enabled()) {
      callback(value, previousValue)
    }
  }
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

  if (subscriber[path]) {
    subscriber[path].push(subscriberValue)
  } else {
    subscriber[path] = [subscriberValue]
  }

  const unsubscribe = () => {
    const indexToRemove = subscriber[path].indexOf(subscriberValue)
    if (indexToRemove >= 0) {
      subscriber[path].splice(indexToRemove, 1)
      if (subscriber[path].length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete subscriber[path]
      }
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
  let subscriberCount = 0
  for (const callbacks of Object.values(subscriber)) {
    subscriberCount += callbacks.length
  }

  return subscriberCount
}
