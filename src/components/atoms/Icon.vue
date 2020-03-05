<template>
  <FontAwesomeIcon
    v-bind="$props"
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
    ...FontAwesomeIcon.props
  }
}
</script>
