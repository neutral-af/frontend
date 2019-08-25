<template>
  <BField
    size="is-medium"
    :label-for="name"
  >
    <BAutocomplete
      :name="name"
      :placeholder="placeholder"
      size="is-medium"
      keep-first
      field="name"
      :value="value"
      :data="airports"
      :loading="fetching"
      @typing="fetch"
      @select="select"
    />
  </BField>
</template>

<script>
import { airports } from '@/api'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      airports: [],
      text: this.value,
      fetching: false
    }
  },
  methods: {
    async fetch (text) {
      if (!text) {
        this.airports = []
        return
      }
      this.fetching = true
      try {
        this.airports = await airports.fetch(text)
        this.fetching = false
      } catch (err) {
        this.fetching = false
      }
    },
    select (value) {
      const option = value ? value.name : ''
      this.$emit('update', option)
    }
  }
}
</script>
