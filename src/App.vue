<template>
  <div class="layout">
    <header class="header navbar is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <router-link
            to="/"
            class="navbar-item"
          >
            <strong>Carbon Offset</strong>
          </router-link>
        </div>
        <nav class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <router-link
                class="nav__link"
                to="/about"
              >
                About
              </router-link>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Carbon Offset</strong>,
          Some footer notes
        </p>
      </div>
    </footer>
  </div>
  <!-- <div>
    <Checkout
      :carbon="carbon"
      :price-cents="priceCents"
      :currency="currency"
      :estimate-id="estimateID"
    />
  </div> -->
</template>

<script>
import { trackEvent } from './honeycomb'

export default {
  name: 'App',
  data () {
    return {
      carbon: 0,
      priceCents: 0,
      currency: '',
      estimateID: ''
    }
  },
  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.carbon = parseFloat(urlParams.get('carbon'))
    this.priceCents = parseInt(urlParams.get('priceCents'))
    this.currency = urlParams.get('currency')
    this.estimateID = urlParams.get('estimateID')
  },
  async mounted () {
    trackEvent('pageload', {
      'app.estimateID': this.estimateID
    })
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.header,
.main {
  padding: 0 $size-7;
}

.main {
  flex: 1;
  padding-bottom: $size-2;
}
</style>
