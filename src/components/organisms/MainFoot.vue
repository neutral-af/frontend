<template>
  <footer
    class="relative overflow-hidden text-white bg-primary-700 text-sm text-center flex items-center justify-center px-4 sm:text-base main-foot"
    :class="{
      'py-10': !compact,
      'py-4': compact
    }"
  >
    <BackgroundPicture
      class="bottom-0 top-auto h-screen opacity-75"
      :animated="false"
    />
    <div class="z-10 sm:flex sm:items-center sm:justify-center ">
      <BrandLink class="block mr-4 text-2xl sm:text-3xl" />
      <nav class="flex">
        <FootLink
          icon="fist-raised"
          as="RouterLink"
          :to="{ name: 'privacy' }"
        >
          Privacy policy
        </FootLink>
        <FootLink
          icon="code"
          href="https://www.github.com/neutral-af"
          target="_blank"
          rel="noopener"
        >
          Source code
        </FootLink>
        <FootLink
          :icon="['far', 'chart-bar']"
          href="https://simpleanalytics.com/neutral.af"
          target="_blank"
          rel="noopener"
        >
          Analytics
        </FootLink>
        <FootLink
          :icon="['far', 'comment-alt']"
          :href="`mailto:${FEEDBACK_EMAIL}`"
          rel="noopener"
        >
          Feedback
        </FootLink>
      </nav>
    </div>
  </footer>
</template>

<script>
import { mapConstants } from '@/utils'
import BrandLink from '@/components/atoms/BrandLink'
import BackgroundPicture from '@/components/organisms/BackgroundPicture'
import FootLink from '@/components/molecules/FootLink'

export default {
  components: {
    BrandLink,
    BackgroundPicture,
    FootLink
  },
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapConstants(['FEEDBACK_EMAIL'])
  }
}
</script>

<style scoped>
.main-foot {
  background: linear-gradient(141deg, theme('colors.green.900'), theme('colors.teal.500') 70%, theme('colors.teal.300'));
}
</style>
