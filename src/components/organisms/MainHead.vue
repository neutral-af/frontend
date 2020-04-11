<template>
  <header
    class="self-stretch flex justify-between items-center w-full"
    :class="{
      'text-white': invert,
      'text-gray-700 bg-white': !invert,
      'fixed': sticky,
    }"
  >
    <BrandLink class="text-3xl p-4 sm:text-4xl" />
    <nav>
      <button
        v-show="isMobile"
        type="button"
        class="p-4"
        @click="toggle"
      >
        <Icon
          icon="bars"
          size="lg"
        />
      </button>
      <div
        v-show="navShown"
        class="absolute w-full right-0 px-2 flex justify-end sm:static"
        :class="{ 'bg-white': !invert }"
      >
        <NavLink :to="{ name: 'flights' }">
          Estimate
          <span
            v-if="flightsCount > 0"
            class="inline-block px-2 inline-block text-center font-bold text-sm leading-normal border rounded-full"
          >
            {{ flightsCount }}
            <span class="sr-only">flights</span>
          </span>
        </NavLink>
        <NavLink :to="{ name: 'about' }">
          About Us
        </NavLink>
        <NavLink
          as="a"
          :href="`mailto:${FEEDBACK_EMAIL}`"
          rel="noopener"
        >
          Feedback
        </NavLink>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import { mapConstants } from '@/utils'
import BrandLink from '@/components/atoms/BrandLink'
import NavLink from '@/components/atoms/NavLink'

export default {
  components: {
    BrandLink,
    NavLink
  },
  props: {
    invert: {
      type: Boolean,
      default: false
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      navShown: true
    }
  },
  computed: {
    ...mapConstants(['FEEDBACK_EMAIL']),
    ...mapState(['isMobile']),
    ...mapGetters('estimateForm', ['flightsCount'])
  },
  watch: {
    isMobile (value) {
      this.navShown = !value
    }
  },
  methods: {
    toggle () {
      this.navShown = !this.navShown
    }
  }
}
</script>
