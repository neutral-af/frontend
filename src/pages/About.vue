<template>
  <div>
    <div class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class=" columns">
            <div class="column">
              <h1 class="title is-1">
                About Us
              </h1>
            </div>
            <div
              class="column is-one-fifth"
            >
              <RoundedButton
                class="is-primary is-medium"
                tag="router-link"
                :to="{ name: 'privacy' }"
                inverted
              >
                Privacy Policy
              </RoundedButton>
            </div>
          </div>

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
