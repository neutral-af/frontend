<template>
  <div>
    <div class="hero is-primary is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            Privacy Policy
          </h1>
          <div class="content is-medium is-inverted">
            <vue-markdown>
              {{ text }}
            </vue-markdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import text from 'raw-loader!./privacy-policy.md' //eslint-disable-line

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
      return 'Privacy policy'
    },
    text () {
      return text
    }
  }
}
</script>
