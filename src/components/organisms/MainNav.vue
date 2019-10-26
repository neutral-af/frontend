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
        {{ brandText }}
      </BNavbarItem>
    </template>

    <template slot="end">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'about' }"
      >
        About Us
      </BNavbarItem>
    </template>
  </BNavbar>
</template>

<script>
import { NAME_COMPACT } from '@/constants'

export default {
  computed: {
    brandText () {
      return NAME_COMPACT
    }
  }
}
</script>
