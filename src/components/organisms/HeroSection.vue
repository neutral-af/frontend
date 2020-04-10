<template>
  <component
    :is="as"
    class="hero is-fullheight hero-section"
  >
    <header
      v-if="$slots.head"
      class="hero-head"
    >
      <slot name="head" />
    </header>
    <div class="hero-body">
      <slot />
    </div>
    <div
      v-if="$slots.foot"
      class="has-text-centered hero-foot hero-section-foot"
    >
      <slot name="foot" />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'div'
    },
    background: {
      type: Boolean,
      default: false
    }
  }
}
</script>
