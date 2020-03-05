<template>
  <div class="md:text-lg lg:text-xl">
    <MainHead />
    <div class="container pb-4 sm:pb-6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      <Title
        as="h1"
        size="lg"
        class="font-brand"
      >
        {{ title }}
      </Title>
      <VueMarkdown class="content mb-6">
        {{ text }}
      </VueMarkdown>
    </div>
    <MainFoot />
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import text from 'raw-loader!../content/privacy-policy.md' //eslint-disable-line

import MainHead from '@/components/organisms/MainHead'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    MainHead,
    MainFoot,
    VueMarkdown
  },
  computed: {
    title () {
      return 'Privacy Policy'
    },
    text () {
      return text
    }
  }
}
</script>
