<template>
  <div>
    <div class="hero is-primary is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            Privacy Policy
          </h1>
          <div class="content content-about is-bold">
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
import PrivacyText from 'raw-loader!./privacy-policy.md' //eslint-disable-line

export default {
  components: { VueMarkdown },
  data () {
    return {
      text: PrivacyText
    }
  }
}
</script>
