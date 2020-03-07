<template>
  <div>
    <RouterView />
    <CookieNotice />
  </div>
</template>

<script>
import { NAME, SEPARATOR } from '@/../constants'
import CookieNotice from '@/components/molecules/CookieNotice'
// import { trackEvent } from './honeycomb'

export default {
  head: {
    titleTemplate: `%s ${SEPARATOR} ${NAME}`
  },
  components: {
    CookieNotice
  }
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
}
</script>
