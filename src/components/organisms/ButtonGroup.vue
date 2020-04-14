<script>
export default {
  render (create) {
    const data = {
      attrs: this.$attrs,
      on: this.$listeners,
      class: 'button-group'
    }
    return create('div', data, this.$slots.default)
  }
}
</script>

<style scoped>
.button-group > :first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.button-group > :not(:first-child):not(:last-child) {
  border-radius: 0;
}

.button-group > :last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
