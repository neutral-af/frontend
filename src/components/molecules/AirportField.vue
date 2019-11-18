<template>
  <CustomField
    :label="label"
    :label-for="id"
    invert
    huge
    class="airport-field"
  >
    <BAutocomplete
      :id="id"
      :placeholder="placeholder"
      keep-first
      open-on-focus
      required
      :custom-formatter="format"
      :value="value"
      :data="airports"
      :loading="fetching"
      @typing="search"
      @select="select"
    />
  </CustomField>
</template>

<script>
import { airports } from '@/api'
import { formatAirport } from '@/utils'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
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
      fetching: false
    }
  },
  created () {
    if (this.value) {
      this.search()
    }
  },
  methods: {
    async search (query) {
      if (!query) {
        this.airports = []
        return
      }
      this.fetching = true
      try {
        this.airports = await airports.search(query)
        this.fetching = false
      } catch (err) {
        this.fetching = false
      }
    },
    format (airport) {
      return formatAirport(airport)
    },
    select (value) {
      this.$emit('update', value)
    }
  }
}
</script>
