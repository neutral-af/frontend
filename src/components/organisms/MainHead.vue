<template>
  <header class="self-stretch flex justify-between items-center">
    <BrandLink class="text-3xl p-4 sm:text-4xl" />
    <div class="flex items-center">
      <ThemeSwitcher />
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
import BrandLink from '@/components/atoms/BrandLink'
import ThemeSwitcher from '@/components/molecules/ThemeSwitcher'

export default {
  components: {
    BrandLink,
    ThemeSwitcher
  }
}
</script>
