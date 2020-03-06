<template>
  <Field v-bind="fieldProps">
    <Autocomplete
      :id="id"
      :placeholder="placeholder"
      :formatter="format"
      :value="viewValue"
      :items="airports"
      :loading="fetching"
      @input="onInput"
      @select="onSelect"
    />
    <!-- keep-first
      open-on-focus
      required -->
  </Field>
</template>

<script>
import pickBy from 'lodash/pickBy'

import { airports } from '@/api'
import { airport as format } from '@/utils/formatters'
import Field from '@/components/atoms/Field'

export default {
  props: {
    ...Field.props,
    value: {
      type: Object,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      query: '',
      viewValue: '',
      airports: [{
        id: 'test',
        name: 'Malpensa',
        icao: 'mpx',
        iata: 'mpxx',
        city: 'Milano',
        country: 'Italy'
      }, {
        id: 'test',
        name: 'Malpensa',
        icao: 'mpx2',
        iata: 'mpxx',
        city: 'Milano',
        country: 'Italy'
      }, {
        id: 'test',
        name: 'Malpensa',
        icao: 'mpx3',
        iata: 'mpxx',
        city: 'Milano',
        country: 'Italy'
      }],
      fetching: false
    }
  },
  computed: {
    fieldProps () {
      return pickBy(this.$props, (value, key) => !!Field.props[key])
    }
  },
  watch: {
    value: {
      handler (value) {
        this.viewValue = value ? this.format(value) : ''
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
    onInput (value) {
      console.log(value)
      // this.search(value)
    },
    onSelect (value) {
      this.$emit('input', value)
    }
  }
}
</script>
