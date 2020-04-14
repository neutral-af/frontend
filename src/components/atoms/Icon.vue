<template>
  <FontAwesomeIcon
    v-bind="attrs"
    role="img"
  />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    size: {
      type: String,
      default: 'base'
    }
  },
  computed: {
    attrs () {
      const attrs = { ...this.$attrs }
      if (this.size !== 'base') {
        attrs.size = this.size === 'xl' ? 'lg' : this.size
      }
      return attrs
    }
  }
}
</script>
