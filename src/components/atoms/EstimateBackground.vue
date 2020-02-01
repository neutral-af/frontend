<template>
  <div
    class="estimate-background"
    :class="type"
  />
</template>

<script>
export default {
  computed: {
    type () {
      return this.$route.name === 'success' ? 'is-primary' : 'is-dark'
    }
  }
}
</script>

<style lang="scss" scoped>
.estimate-background {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-image: linear-gradient(
    141deg,
    saturate(darken($dark, 10%), 12%) 0%,
    $dark 23.4%,
    saturate(lighten($dark, 5%), 6%) 33.3%,
    saturate(darken($primary, 10%), 12%) 66.6%,
    $primary 90%,
    saturate(lighten($primary, 5%), 6%) 100%,
  );
  background-size: 400% 400%;
  transition: background-position 2s 1s ease-in-out;

  &.is-dark {
    background-position: 0% 0%;
  }

  &.is-primary {
    background-position: 66.6% 100%;
  }
}
</style>
