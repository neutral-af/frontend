<template>
  <div>
    <RouterView />
    <CookieNotice />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { NAME, SEPARATOR } from '@/../constants'
import CookieNotice from '@/components/molecules/CookieNotice'
// import { trackEvent } from './honeycomb'

export default {
  head () {
    return {
      titleTemplate: `%s ${SEPARATOR} ${NAME}`,
      bodyAttrs: {
        class: [
          'antialiased',
          'font-sans',
          'md:text-lg',
          'lg:text-xl',
          'text-default',
          'bg-default',
          'transition-colors',
          'duration-100',
          `theme-${this.theme}`
        ]
      }
    }
  },
  components: {
    CookieNotice
  },
  computed: {
    ...mapState(['theme'])
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
