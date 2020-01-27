import * as constants from '@/../constants'
import * as converters from './converters'
import * as formatters from './formatters'
import * as store from './store'

export { converters, formatters, store }

export const mapConstants = (options) => (
  Object
    .entries(constants)
    .reduce((computed, [key, value]) => {
      if (options.includes(key)) {
        computed[key] = () => value
      }
      return computed
    }, {})
)
