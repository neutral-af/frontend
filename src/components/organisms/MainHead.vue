<template>
  <header
    class="self-stretch flex justify-between items-center w-full"
    :class="{ 'fixed': sticky }"
  >
    <BrandLink class="text-3xl p-4 sm:text-4xl" />
    <div>
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
        class="text-lg py-4 px-2 pr-4 transition-colors duration-100 hover:text-primary-500 focus:text-primary-500"
      >
        Feedback
      </NavLink>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

import { mapConstants } from '@/utils'
import BrandLink from '@/components/atoms/BrandLink'
import NavLink from '@/components/atoms/NavLink'

export default {
  components: {
    BrandLink,
    NavLink
  },
  props: {
    sticky: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapConstants(['FEEDBACK_EMAIL']),
    ...mapGetters('estimateForm', ['flightsCount'])
  }
}
</script>
