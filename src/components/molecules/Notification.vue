<template>
  <div
    class="flex items-center justify-between p-4 text-white notification"
    :class="{
      'bg-primary-700': type === 'base',
      'bg-red-700': type === 'error',
      'bg-yellow-500': type === 'warning',
    }"
  >
    {{ message }}
    <Button
      variant="link"
      icon-left="times"
      title="Close"
      size="sm"
      @click="$emit('close', id)"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
