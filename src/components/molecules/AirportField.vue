<template>
  <Field v-bind="fieldProps">
    <Autocomplete
      :id="id"
      :placeholder="placeholder"
      :formatter="format"
      :value="viewValue"
      :data="airports"
      data-key="icao"
      :loading="fetching"
      @input="onInput"
      @select="select"
    />
    <!-- keep-first
      open-on-focus
      required -->
  </Field>
</template>

<script>
import pickBy from 'lodash/pickBy'

// import { airports } from '@/api'
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
      airports: [],
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
      this.data = [{
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
      }]
      // try {
      //   this.airports = await airports.search(query)
      //   this.fetching = false
      // } catch (err) {
      //   this.fetching = false
      // }
    },
    format,
    onInput ({ target: { value } }) {
      this.search(value)
    },
    select (value) {
      this.$emit('input', value)
    }
  }
}
</script>
