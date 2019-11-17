<template>
  <a
    :href="`mailto:${FEEDBACK_EMAIL}`"
    rel="noopener"
    class="main-foot-link"
  >
    Feedback
  </a>
</template>

<script>
import { mapConstants } from '@/utils'

export default {
  computed: {
    ...mapConstants(['FEEDBACK_EMAIL'])
  }
}
</script>
