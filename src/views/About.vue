<template>
  <HeroSection class="is-primary is-bold">
    <MainNav slot="head" />
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
          <RoundedButton
            type="is-primary"
            size="is-medium"
            tag="router-link"
            outlined
            inverted
            :to="{ name: 'privacy' }"
          >
            Privacy Policy
          </RoundedButton>
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
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    HeroSection,
    MainNav,
    MainFoot,
    VueMarkdown
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
