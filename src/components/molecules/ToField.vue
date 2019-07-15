<template>
  <BField
    label="Arrival airport"
    size="is-medium"
    label-for="to"
  >
    <BAutocomplete
      name="to"
      placeholder="e.g. Toronto, Pearson or YYZ"
      size="is-medium"
      keep-first
      field="name"
      :value="to"
      :data="airports"
      :loading="fetching"
      @typing="fetch"
      @select="select"
    />
  </BField>
</template>

<script>
import { fetchAirports } from '@/api'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      airports: [],
      text: this.to,
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
        this.airports = await fetchAirports(text)
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
