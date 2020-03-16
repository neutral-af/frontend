<template>
  <header class="self-stretch flex justify-between items-center">
    <BrandLink
      :color="color"
      class="text-3xl sm:text-4xl md:text-4xl py-4 px-4"
    />
    <div class="flex items-center">
      <NavbarButton
        size="sm"
        :color="color"
        :icon-left="['far', theme === 'dark' ? 'sun' : 'moon']"
        :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        @click="toggleTheme"
      />
      <NavbarButton
        as="RouterLink"
        :to="{ name: 'about' }"
        :color="color"
      >
        <!-- class="text-lg py-4 px-2 transition-colors duration-100" -->
        About Us
      </NavbarButton>
      <NavbarButton
        as="a"
        :href="`mailto:${FEEDBACK_EMAIL}`"
        :color="color"
      >
        Feedback
      </NavbarButton>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { mapConstants } from '@/utils'
import BrandLink from '@/components/atoms/BrandLink'

export default {
  components: {
    BrandLink
  },
  props: {
    color: {
      type: String,
      default: 'base'
    }
  },
  computed: {
    ...mapConstants(['FEEDBACK_EMAIL']),
    ...mapState(['theme'])
  },
  methods: {
    ...mapMutations(['setTheme']),
    toggleTheme () {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    }
  }
}
</script>
