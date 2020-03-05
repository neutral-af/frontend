<template>
  <HeroSection class="is-primary is-bold">
    <MainHead slot="head" />
    <div class="columns is-centered">
      <div class="column is-10-tablet is-9-desktop is-8-widescreen">
        <div class="content is-medium is-inverted">
          <h1 class="title is-1 is-family-secondary">
            {{ title }}
          </h1>
          <VueMarkdown>
            {{ text }}
          </VueMarkdown>
        </div>
        <div class="has-text-centered">
          <Button
            tag="RouterLink"
            :to="{ name: 'privacy' }"
          >
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
    <MainFoot slot="foot" />
  </HeroSection>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import text from 'raw-loader!../content/about.md' //eslint-disable-line

import HeroSection from '@/components/organisms/HeroSection'
import MainHead from '@/components/organisms/MainHead'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    HeroSection,
    MainHead,
    MainFoot,
    VueMarkdown
  },
  computed: {
    title () {
      return 'About us'
    },
    text () {
      return text
    }
  }
}
</script>
