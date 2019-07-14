<template>
  <div>
    <div class="hero is-primary is-bold is-fullheight">
      <header class="hero-head">
        <MainNav />
      </header>
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-vcentered">
            <div class="column is-two-thirds-tablet is-half-desktop is-one-third-fullhd">
              <div class="page">
                <h1 class="title">
                  Estimate
                </h1>
                <div class="box">
                  <RouterView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="hero-foot">
        <MainFoot />
      </footer>
    </div>
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
.hero.is-primary.is-bold .navbar-menu {
  background: transparent !important;
}

.page {
  text-align: center;
}
</style>
