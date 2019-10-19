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

    <div slot="start">
      <EstimatePreview2 v-if="hasPreview" />
    </div>

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
import EstimatePreview2 from '@/components/organisms/EstimatePreview2'

export default {
  components: {
    EstimatePreview2
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
