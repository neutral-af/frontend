import * as constants from '@/constants'

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

export const formatPrice = (value, currency) => {
  return (value / 100).toLocaleString(window.navigator.language, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })
}

export const formatWeight = (value, unit = 'kg') => (
  `${value.toLocaleString(window.navigator.language)} ${unit}`
)

export const formatAirport = ({ name, faa, city, country }, style = 'long') => {
  if (style === 'long') {
    let ret = name
    if (faa && faa !== '\\N') {
      ret += ` (${faa})`
    }
    ret += `, ${city}, ${country}`
    return ret
  }
  let ret = city
  if (faa && faa !== '\\N') {
    ret += ` (${faa})`
  }
  return ret
}

const localeCurrencyMap = {
  'en-us': 'USD',
  'en-gb': 'GBP',
  'en-ca': 'CAD',
  'fr-fr': 'EUR',
  'de-de': 'EUR'
}
export const getCurrencyFromLocale = (locale) => {
  return localeCurrencyMap[locale.toLowerCase()] || 'EUR'
}
