<template>
  <BNavbar
    type="is-primary"
    class="main-nav"
    transparent
  >
    <template slot="brand">
      <BNavbarItem
        tag="router-link"
        class="is-size-3 is-size-4-mobile is-family-secondary"
        :to="{ name: 'home' }"
      >
        Neutral.af
      </BNavbarItem>
    </template>

    <template slot="end">
      <BNavbarItem
        tag="router-link"
        :to="{ name: 'about' }"
      >
        About Us
      </BNavbarItem>
    </template>
  </BNavbar>
</template>

<script>
export default {
  components: {
  },
  props: {
    hasPreview: {
      type: Boolean,
      default: false
    }
  },
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
