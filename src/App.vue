<template>
  <div class="app">
    <div
      class="hero is-primary is-fullheight wrapper"
      :class="{ 'no-header': isHome && !hasHeader }"
    >
      <div class="background" />
      <header class="hero-head">
        <transition
          name="fadeDown"
          mode="out-in"
          @after-enter="onAfterEnter"
          @after-leave="onAfterLeave"
        >
          <MainNav v-if="!isHome" />
        </transition>
      </header>
      <div class="hero-body has-text-centered body">
        <RouterView class="view" />
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
  },
  data () {
    return {
      hasHeader: false
    }
  },
  computed: {
    isHome () {
      return this.$route.name === 'home'
    }
  },
  methods: {
    onAfterEnter () {
      this.hasHeader = true
    },
    onAfterLeave () {
      this.hasHeader = false
    }
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
.wrapper {
  position: relative;
  overflow: hidden;

  &.no-header {
    padding-top: 3.25rem;
  }
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

.hero-body.body {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  justify-content: center;
}

.view {
  max-width: 800px;
}
</style>
