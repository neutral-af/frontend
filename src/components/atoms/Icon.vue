<template>
  <FontAwesomeIcon
    v-bind="$attrs"
    :size="size !== 'base' ? size : null"
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
  }
}
</script>
