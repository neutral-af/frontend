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
