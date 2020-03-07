<template>
  <div>
    <MainHead />
    <div class="container pb-4 sm:pb-6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      <Title
        as="h1"
        size="lg"
        class="font-brand"
      >
        {{ title }}
      </Title>
      <Content>
        {{ text }}
      </Content>
    </div>
    <MainFoot />
  </div>
</template>

<script>
import text from 'raw-loader!../content/about.md' //eslint-disable-line

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
    MainFoot
  },
  computed: {
    title () {
      return 'About us and FAQ'
    },
    text () {
      return text
    }
  }
}
</script>
