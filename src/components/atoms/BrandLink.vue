<template>
  <NavbarButton
    v-click-blur
    as="RouterLink"
    :to="{ name: 'home' }"
    v-bind="$attrs"
    class="font-brand leading-none"
  >
    {{ NAME }}
  </NavbarButton>
</template>

<script>
import { mapConstants } from '@/utils'

export default {
  computed: {
    ...mapConstants(['NAME'])
  }
}
</script>
