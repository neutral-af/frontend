<template>
  <Layout class="about">
    <Hero>
      <h1 class="title is-1">
        About
      </h1>
      <p class="subtitle is-4">
        What is Neutral (as f**k)?
      </p>
    </Hero>
    <Hero>
      <vue-markdown>{{ faqText }}</vue-markdown>
    </Hero>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Content'
import Hero from '@/components/organisms/Hero'

import VueMarkdown from 'vue-markdown'
import FAQ from 'raw-loader!./faq.md' //eslint-disable-line

export default {
  components: {
    Layout,
    VueMarkdown,
    Hero
  },
  data () {
    return {
      faqText: FAQ
    }
  }
}
</script>
