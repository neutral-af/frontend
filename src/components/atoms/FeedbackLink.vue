<template>
  <a
    :href="`mailto:${email}`"
    rel="noopener"
    class="main-foot-link"
  >
    Feedback
  </a>
</template>

<script>
import { FEEDBACK_EMAIL } from '@/constants'

export default {
  computed: {
    email () {
      return FEEDBACK_EMAIL
    }
  }
}
</script>
