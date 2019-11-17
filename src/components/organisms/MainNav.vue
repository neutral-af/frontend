<template>
  <BNavbar
    type="is-primary"
    class="main-nav"
    transparent
  >
    <template slot="brand">
      <BNavbarItem
        tag="router-link"
        class="is-size-3 is-size-4-mobile is-family-secondary"
        :to="{ name: 'home' }"
      >
        {{ NAME }}
      </BNavbarItem>
    </template>

    <template slot="end">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'about' }"
      >
        About Us
      </BNavbarItem>
      <BNavbarItem tag="FeedbackLink" />
    </template>
  </BNavbar>
</template>

<script>
import { mapConstants } from '@/utils'

export default {
  computed: {
    ...mapConstants(['NAME'])
  }
}
</script>
