<template>
  <div class="layout">
    <header class="header navbar">
      <div class="navbar-brand">
        <g-link
          to="/"
          class="navbar-item"
        >
          Carbon Offset
        </g-link>
      </div>
      <nav class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <g-link
              class="nav__link"
              to="/about"
            >
              About
            </g-link>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.header,
.main {
  max-width: $desktop;
  margin: $size-6 auto;
}
</style>
