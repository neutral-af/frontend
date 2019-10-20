<template>
  <div>
    <div class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class=" columns">
            <div class="column">
              <h1 class="title is-1">
                {{ title }}
              </h1>
            </div>
            <div class="column is-one-fifth">
              <RoundedButton
                type="is-primary"
                size="is-medium"
                outlined
                inverted
                tag="router-link"
                :to="{ name: 'privacy' }"
              >
                Privacy Policy
              </RoundedButton>
            </div>
          </div>
          <div class="content is-medium is-inverted">
            <vue-markdown>
              {{ faq }}
            </vue-markdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import FAQ from 'raw-loader!./faq.md' //eslint-disable-line

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    VueMarkdown
  },
  computed: {
    title () {
      return 'About'
    },
    faq () {
      return FAQ
    }
  }
}
</script>
