<template>
  <Field
    :label="label"
    :label-for="id"
    :autofocus="autofocus"
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
      :value="viewValue"
      :data="airports"
      :loading="fetching"
      @typing="search"
      @select="select"
    />
  </Field>
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
      type: Object,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: '',
      viewValue: '',
      airports: [],
      fetching: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.viewValue = value ? format(value) : ''
      },
      immediate: true
    }
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
      this.$emit('input', value)
    }
  }
}
</script>
