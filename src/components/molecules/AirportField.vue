<template>
  <CustomField
    :label="label"
    :label-for="id"
    autofocus
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
import { airport as format } from '@/utils/formatters'

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
      query: '',
      airports: [],
      fetching: false
    }
  },
  created () {
    this.search(this.value)
  },
  methods: {
    async search (query) {
      this.query = query
      if (!this.query) {
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
    format,
    select (value) {
      this.$emit('update', value)
    }
  }
}
</script>
