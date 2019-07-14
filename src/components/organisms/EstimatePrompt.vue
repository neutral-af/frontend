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

            <div class="field select">
              <select
                :value="price.currency"
                @input="updateCurrency"
              >
                <option
                  v-for="c in currencies"
                  :key="c"
                  :value="c"
                >
                  {{ c }}
                </option>
              </select>
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
        <router-link
          to="/checkout"
          class="button is-primary"
          :class="{ 'is-loading':fetching }"
        >
          Pay now
        </router-link>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // props: {
  //   estimate: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
  data () {
    return {
      currencies: ['EUR', 'CAD', 'GBP', 'USD']
    }
  },
  computed: {
    ...mapState('estimate', ['price', 'carbon', 'fetching']),
    priceLocal () {
      console.log(this.price.currency, this.price.cents) // eslint-disable-line
      return (this.price.cents / 100).toLocaleString(window.navigator.language, {
        style: 'currency',
        currency: this.price.currency,
        currencyDisplay: 'symbol'
      })
    },
    carbonString () {
      return `${this.carbon} kilograms C02`
    }
  },
  methods: {
    updateCurrency ({ target }) {
      this.$store.commit('setUserCurrency', target.value)
      // this.$store.dispatch('estimate/update') // TODO
      const flights = [
        { departure: 'YYZ', arrival: 'LHR' }
      ]
      this.$store.dispatch('estimate/create', { flights, currency: this.$store.userCurrency })
    }
  }
}
</script>
