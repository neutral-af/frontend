<template>
  <a
    :href="`mailto:${FEEDBACK_EMAIL}`"
    rel="noopener"
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
