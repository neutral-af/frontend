<template>
  <RouterLink
    v-click-blur
    :to="{ name: 'home' }"
    class="font-brand leading-none transition-colors duration-100 hover:text-primary-500 focus:text-primary-500"
  >
    {{ NAME }}
  </RouterLink>
</template>

<script>
import { mapConstants } from '@/utils'

export default {
  computed: {
    ...mapConstants(['NAME'])
  }
}
</script>
