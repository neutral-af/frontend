<template>
  <span>
    {{ amount }} kg CO<sub>2</sub>
  </span>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true
    }
  }
}
</script>
