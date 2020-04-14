<template>
  <Button
    icon-left="chevron-down"
    variant="link"
    size="2xl"
    class="transform transition-transform duration-100 hover:scale-125 focus:scale-125"
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
      console.log(this.to)
      console.log(document.querySelector(this.to))
      const $to = document.querySelector(this.to)
      if ($to) {
        $to.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>
