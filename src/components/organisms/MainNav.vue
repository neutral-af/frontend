<template>
  <BNavbar
    type="is-primary"
    class="main-nav"
  >
    <template slot="brand">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'home' }"
      >
        <BButton
          type="is-primary"
          size="is-medium"
          class="is-size-4 is-family-monospace"
          rounded
        >
          Neutral.af
        </BButton>
      </BNavbarItem>

      <BNavbarItem
        v-if="!showTestWarning"
      >
        <BButton
          type="is-warning"
          href="https://github.com/neutral-af/frontend"
          class="is-warning"
        >
          WARNING: TEST ENV, DO NOT USE A REAL CREDIT CARD NUMBER
        </BButton>
      </BNavbarItem>
    </template>

    <template slot="end">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'about' }"
      >
        <BButton
          type="is-primary"
          size="is-medium"
          class="is-size-4 is-family-monospace"
          rounded
        >
          About Us
        </BButton>
      </BNavbarItem>
    </template>
  </BNavbar>
</template>

<script>
export default {
  data () {
    return {
      menuShown: false
    }
  },
  computed: {
    showTestWarning () {
      return process.env.VUE_APP_ENV === 'prod'
    }
  },
  methods: {
    toggleMenu () {
      this.menuShown = !this.menuShown
    }
  }
}
</script>
