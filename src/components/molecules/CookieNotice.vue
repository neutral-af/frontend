<template>
  <CookieLaw
    class="text-base"
    transition-name="fade"
  >
    <div
      slot-scope="{ accept }"
      class="flex flex-col items-center justify-between sm:flex-grow sm:flex-row"
    >
      <div>
        OK fine, we use cookies – but only if you want to save payment details. Learn more in our
        <InlineLink
          as="RouterLink"
          :to="{ name: 'privacy' }"
        >
          Privacy Policy
        </InlineLink>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-4">
        <Button
          color="invert"
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
  background: rgba(49, 151, 149, .8) !important;
  color: white !important;
  padding: 1rem !important;

  > * {
    margin: 0 !important;
  }
}
</style>
