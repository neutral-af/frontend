<template>
  <ValidationProvider
    v-slot="{ errors }"
    slim
  >
    <BField
      size="is-medium"
      :label="label"
      :label-for="name"
      :type="{ 'is-danger': errors[0] }"
      :message="errors[0]"
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
  </ValidationProvider>
</template>

<script>
import { airports } from '@/api'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
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
      this.$emit('update', value || null)
    }
  }
}
</script>
