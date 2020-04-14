<template>
  <div class="py-2 flex flex-col text-left">
    <label
      v-if="label"
      :for="id"
      :class="`text-sm md:text-base lg:text-lg mb-1 ${labelClass}`"
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
      type: [String, Array],
      default: ''
    },
    labelIconRight: {
      type: [String, Array],
      default: ''
    },
    labelClass: {
      type: String,
      default: ''
    }
  }
}
</script>
