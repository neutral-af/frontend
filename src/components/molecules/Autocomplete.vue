<template>
  <div class="flex-grow relative">
    <Input
      class="w-full"
      v-bind="$attrs"
      @focus="dataShown = true"
      @blur="dataShown = false"
    />
    <Panel
      v-if="data"
      v-show="dataShown"
      class="absolute z-10"
    >
      <!-- eslint-disable vue/valid-v-for -->
      <div
        v-for="item in data"
        :key="dataKey"
        class="p-4 cursor-pointer border-b last-child:border-0 hover:text-teal-500 hover:border-teal-500"
        @click="$emit('select', item)"
      >
        {{ formatter(item) }}
      </div>
      <!-- eslint-enabke vue/valid-v-for -->
    </Panel>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    dataKey: {
      type: String,
      required: true
    },
    formatter: {
      type: Function,
      default: (value) => value
    }
  },
  data () {
    return {
      dataShown: false
    }
  }
}
</script>
