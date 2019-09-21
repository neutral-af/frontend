<template>
  <BNavbar
    type="is-primary"
    class="main-nav"
  >
    <template slot="brand">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'home' }"
        class="is-family-secondary is-size-4"
        exact-active-class=""
      >
        Neutral a.f.
      </BNavbarItem>
    </template>

    <template slot="end">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'about' }"
      >
        About
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
