import { DateTime } from 'luxon'

export const price = (value, currency, options = {}) => {
  let ret = (value / 100).toLocaleString(window.navigator.language, {
    style: 'currency',
    currency: currency,
    currencyDisplay: options.symbol === false ? 'code' : 'symbol'
  })
  if (options.symbol === false) {
    ret = ret.replace(/[a-z]{3}/i, '').trim()
  }
  return ret
}

export const weight = (value, unit = 'kg') => (
  `${value.toLocaleString(window.navigator.language)} ${unit}`
)

export const airport = ({ name, faa, city, country }, style = 'long') => {
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

export const date = (date) => DateTime.fromJSDate(date).toLocaleString()
