export const formatCurrencyCents = (value, currency) => {
  return (value / 100).toLocaleString(window.navigator.language, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })
}
