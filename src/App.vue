<template>
  <div class="hero is-primary is-fullheight">
    <div class="background" />
    <header class="hero-head">
      <MainNav />
    </header>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column has-text-centered view">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
    <footer class="hero-foot">
      <MainFoot />
    </footer>
  </div>
</template>

<script>
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  components: {
    MainNav,
    MainFoot
  }
}

// import { trackEvent } from './honeycomb'

// export default {
// data () {
//   return {
//     carbon: 0,
//     priceCents: 0,
//     currency: '',
//     estimateID: ''
//   }
// },
// created () {
//   const urlParams = new URLSearchParams(window.location.search)
//   this.carbon = parseFloat(urlParams.get('carbon'))
//   this.priceCents = parseInt(urlParams.get('priceCents'))
//   this.currency = urlParams.get('currency')
//   this.estimateID = urlParams.get('estimateID')
// },
// async mounted () {
//   trackEvent('pageload', {
//     'app.estimateID': this.estimateID
//   })
// }
// }
</script>

<style lang="scss">
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background {
  position: absolute;
  left: 0;
  bottom: -10vh;
  width: 100%;
  height: 100%;
  mix-blend-mode: soft-light;
  filter: grayscale(50);
  z-index: 0;
  background: url(./assets/background.jpg) no-repeat bottom center / cover,
}

.view {
  max-width: 600px;
}
</style>
