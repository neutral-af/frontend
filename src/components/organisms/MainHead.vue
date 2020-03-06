<template>
  <header class="self-stretch flex justify-between items-center">
    <RouterLink
      class="font-brand text-3xl leading-none p-4 sm:text-4xl"
      :to="{ name: 'home' }"
    >
      {{ NAME }}
    </RouterLink>
    <div>
      <RouterLink
        :to="{ name: 'about' }"
        class="text-lg py-4 px-2 transition-colors duration-100 hover:text-primary-500 focus:text-primary-500"
      >
        About Us
      </RouterLink>
      <FeedbackLink class="text-lg py-4 px-2 pr-4 transition-colors duration-100 hover:text-primary-500 focus:text-primary-500" />
    </div>
  </header>
</template>

<script>
import { mapConstants } from '@/utils'

export default {
  computed: {
    ...mapConstants(['NAME'])
  }
}
</script>
