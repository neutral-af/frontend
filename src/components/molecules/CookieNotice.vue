<template>
  <CookieLaw class="text-base">
    <div
      slot-scope="{ accept }"
      class="flex flex-grow items-center justify-between"
    >
      <div>
        OK fine, we use cookies – but only if you want to save payment details. Learn more in our
        <LLink
          as="RouterLink"
          :to="{ name: 'privacy' }"
        >
          Privacy Policy
        </LLink>
      </div>
      <div>
        <Button
          size="sm"
          @click="accept"
        >
          Got it
        </Button>
      </div>
    </div>
  </CookieLaw>
</template>

<script>
import CookieLaw from 'vue-cookie-law'

export default {
  components: { CookieLaw }
}
</script>

<style>
.Cookie--base {
  background: white;
  color: inherit;
  padding: 1rem;
}
</style>
