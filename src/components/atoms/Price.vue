<script>
export default {
  props: {
    cents: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  render (create) {
    const text = (this.cents / 100).toLocaleString(window.navigator.language, {
      style: 'currency',
      currency: this.currency,
      currencyDisplay: 'symbol'
    })
    return create('span', text)
  }
}
</script>
