<template>
  <BField label="Carbon amount">
    <p class="is-size-3">
      <Carbon :amount="value" />
    </p>
  </BField>
</template>

<script>
import Carbon from '@/components/atoms/Carbon'

export default {
  components: {
    Carbon
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>
