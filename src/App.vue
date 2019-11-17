<template>
  <RouterView />
</template>

<script>
import { NAME_COMPACT, SEPARATOR } from '@/constants'
// import { trackEvent } from './honeycomb'

export default {
  metaInfo: {
    titleTemplate: `%s ${SEPARATOR} ${NAME_COMPACT}`
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
