import { DateTime } from 'luxon'

export const price = (value, currency) => (
  (value / 100).toLocaleString(window.navigator.language, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })
)

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
