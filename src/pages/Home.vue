<template>
  <main>
    <transition name="fadeDown">
      <h1 class="title is-1">
        Neutral (as f**k)
      </h1>
    </transition>
    <p class="subtitle is-4">
      Reclaim your CO<sub>2</sub> now.
    </p>
    <BButton
      tag="router-link"
      size="is-medium"
      type="is-primary"
      inverted
      outlined
      rounded
      :to="{ name: 'estimate' }"
    >
      Start now
    </BButton>
  </main>
</template>

<style lang="scss" scoped>
.title {
  font-family: $family-secondary;
}
</style>
