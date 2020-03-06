<template>
  <div class="py-2 flex flex-col text-left">
    <label
      v-if="label"
      :for="id"
      :class="`mb-2 ${labelClass}`"
    >
      <Icon
        v-if="labelIconLeft"
        :icon="labelIconLeft"
        class="mr-2"
      />
      {{ label }}
      <Icon
        v-if="labelIconRight"
        :icon="labelIconLeft"
        class="mr-2"
      />
    </label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    labelIconLeft: {
      type: String,
      default: ''
    },
    labelIconRight: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: ''
    }
  }
}
</script>
