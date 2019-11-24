<template>
  <CookieLaw theme="dark-lime">
    <div slot="message">
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
