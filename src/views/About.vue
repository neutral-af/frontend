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
    MainFoot,
    VueMarkdown
  },
  computed: {
    title () {
      return 'About Us'
    },
    text () {
      return text
    }
  }
}
</script>

<style>
.content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.75em;
    letter-spacing: -0.025em;
    margin-bottom: 0.25em;
    line-height: 1.25;
  }

  p {
    margin-bottom: 1em;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
