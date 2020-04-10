<template>
  <Button
    icon-left="arrow-down"
    v-bind="$attrs"
    v-on="listeners"
    @click="onClick"
  />
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    listeners () {
      const { click, ...listeners } = this.$listeners
      return listeners
    }
  },
  methods: {
    onClick () {
      const $to = document.querySelector(this.to)
      if ($to) {
        $to.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>
