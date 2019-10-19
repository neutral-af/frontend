<template>
  <BNavbar
    type="is-primary"
    class="main-nav"
  >
    <template slot="brand">
      <BNavbarItem
        tag="router-link"
        class="is-size-5 is-family-monospace"
        :to="{ name: 'home' }"
      >
        Neutral.af
      </BNavbarItem>
    </template>

    <template slot="end">
      <BNavbarItem
        tag="router-link"
        class="is-size-5 is-family-monospace"
        :to="{ name: 'about' }"
      >
        About Us
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
  methods: {
    toggleMenu () {
      this.menuShown = !this.menuShown
    }
  }
}
</script>
