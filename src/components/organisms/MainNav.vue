<template>
  <nav
    class="navbar"
    role="navigation"
  >
    <div class="navbar-brand">
      <router-link
        to="/"
        class="navbar-item"
      >
        <strong>Carbon Offset</strong>
      </router-link>
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
        <router-link
          class="navbar-item"
          to="/about"
        >
          About
        </router-link>
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
