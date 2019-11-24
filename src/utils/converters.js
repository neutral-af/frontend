import { DEFAULT_CURRENCY } from '@/constants'

const map = {
  'en-us': 'USD',
  'en-gb': 'GBP',
  'en-ca': 'CAD',
  'fr-fr': 'EUR',
  'de-de': 'EUR'
}
export const localeToCurrency = (locale) => map[locale.toLowerCase()] || DEFAULT_CURRENCY
