<template>
  <nav
    class="navbar"
    role="navigation"
  >
    <div class="navbar-brand">
      <RouterLink
        :to="{ name: 'estimate' }"
        class="navbar-item"
        exact-active-class=""
      >
        <strong>Carbon Offset</strong>
      </RouterLink>
      <span
        class="navbar-burger"
        :class="{ 'is-active': menuShown }"
        @click="toggleMenu"
      >
        <span />
        <span />
        <span />
      </span>
    </div>
    <div
      class="navbar-menu"
      :class="{ 'is-active': menuShown }"
    >
      <div class="navbar-end">
        <RouterLink
          class="navbar-item"
          :to="{ name: 'about' }"
        >
          About
        </RouterLink>
      </div>
    </div>
  </nav>
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

    }
  }
}
</script>
