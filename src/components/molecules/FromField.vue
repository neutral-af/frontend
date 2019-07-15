<template>
  <BField
    label="Departure airport"
    size="is-medium"
    label-for="from"
  >
    <BAutocomplete
      name="from"
      placeholder="e.g. Milan, Malpensa or MXP"
      size="is-medium"
      keep-first
      field="name"
      :value="from"
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
    from: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      airports: [],
      text: this.from,
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
