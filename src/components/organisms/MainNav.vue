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
        <!-- <BButton
          type="is-primary"
          size="is-medium"
          class="is-size-4 is-family-monospace"
          rounded
        > -->
        Neutral.af
        <!-- </BButton> -->
      </BNavbarItem>
    </template>

    <template slot="end">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'about' }"
      >
        <!-- <BButton
          type="is-primary"
          size="is-medium"
          class="is-size-4 is-family-monospace"
          rounded
        > -->
        About Us
        <!-- </BButton> -->
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
  created () {
    if (process.env.VUE_APP_ENV !== 'prod') {
      this.$buefy.notification.open({
        type: 'is-warning',
        indefinite: true,
        closable: false,
        position: 'is-top',
        message: '<strong>Warning</strong>: test env, do not use a real credit card number'
      })
    }
  },
  methods: {
    toggleMenu () {
      this.menuShown = !this.menuShown
    }
  }
}
</script>
