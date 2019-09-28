<template>
  <div>
    <div class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            About Us
          </h1>
          <div class="content content-about is-bold">
            <vue-markdown>
              {{ faqText }}
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
  components: { VueMarkdown },
  data () {
    return {
      faqText: FAQ
    }
  }
}
</script>
