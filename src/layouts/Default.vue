<template>
  <div class="layout">
    <header class="header navbar is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <g-link
            to="/"
            class="navbar-item"
          >
            <strong>Carbon Offset</strong>
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
      </div>
    </header>
    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Carbon Offset</strong>,
          Some footer notes
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.header,
.main {
  padding: 0 $size-7;
}

.main {
  flex: 1;
  padding-bottom: $size-2;
}
</style>
