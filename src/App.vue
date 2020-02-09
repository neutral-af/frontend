<template>
  <RouterView />
</template>

<script>
import { NAME, SEPARATOR } from '@/constants'

export default {
  metaInfo: {
    titleTemplate: `%s ${SEPARATOR} ${NAME}`
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
// }
}
</script>
