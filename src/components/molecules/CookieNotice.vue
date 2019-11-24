<template>
  <CookieLaw
    theme="dark-lime"
    button-class="button is-primary is-normal"
  >
    <div
      slot="message"
      class="has-text-light is-family-primary"
    >
      OK fine, we use cookies - but only if you want to save payment details. Learn more in our
      <router-link to="privacy">
        privacy policy
      </router-link>
    </div>
  </CookieLaw>
</template>

<script>
import CookieLaw from 'vue-cookie-law'

export default {
  components: { CookieLaw }
}
</script>
