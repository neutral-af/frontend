export default function (locale) {
  const localeMap = {
    'en-us': 'USD',
    'en-gb': 'GBP',
    'en-ca': 'CAD',
    'fr-fr': 'EUR',
    'de-de': 'EUR'
  }

  return localeMap[locale.toLowerCase()] || 'EUR'
}
