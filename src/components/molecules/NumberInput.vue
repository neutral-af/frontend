<template>
  <div class="flex items-center justify-center">
    <Button
      :border="false"
      :rounded="false"
      @click="subtract"
    >
      -
    </Button>
    <Input
      :id="id"
      :value="value"
      type="number"
      class="w-12 text-center native-input"
      @input="set(parseInt($event.target.value))"
    />
    <Button
      :border="false"
      :rounded="false"
      @click="add"
    >
      +
    </Button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    add () {
      this.set(this.value + 1)
    },
    subtract () {
      this.set(this.value - 1)
    },
    set (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.native-input {
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
<style>
