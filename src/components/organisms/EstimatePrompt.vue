<template>
  <form action="">
    <div
      class="modal-card"
      style="width: auto"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">
          Estimate
        </p>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Carbon</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input is-static"
                  :value="carbonString"
                  readonly
                >
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Price</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input is-static"
                  :value="priceLocal"
                  readonly
                >
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button"
          type="button"
          @click="$parent.close()"
        >
          Cancel
        </button>
        <button
          href="/payments"
          class="button is-primary"
        >
          Pay now
        </button>
      </footer>
    </div>
  </form>
</template>

<script>

export default {
  props: {
    estimate: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    priceLocal () {
      return (this.estimate.price.cents / 100).toLocaleString(navigator.languages[0], {
        style: 'currency',
        currency: this.estimate.price.currency,
        currencyDisplay: 'symbol'
      })
    },
    carbonString () {
      return `${this.estimate.carbon} kilograms C02`
    }
  }
}
</script>
