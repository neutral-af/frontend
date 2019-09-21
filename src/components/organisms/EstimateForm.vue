<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ invalid }"
    slim
  >
    <form
      novalidate
      class="estimate-form"
      @submit.prevent="onSubmit"
    >
      <div class="flights">
        <div
          v-for="flight in flights"
          :key="flight.id"
          class="field flight"
        >
          <EstimateFormFlight
            :removeable="flight.id > 1"
            v-bind="flight"
          />
          <hr class="separator">
        </div>
      </div>
      <hr>
      <BField>
        <BButton
          icon-left="plus"
          @click="addFlight"
        >
          Add flight
        </BButton>
      </BField>
      <BField>
        <BButton
          native-type="submit"
          type="is-primary"
          size="is-medium"
          :disabled="invalid || loading"
          :class="{ 'is-loading': loading }"
        >
          Calculate
        </BButton>
      </BField>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapState } from 'vuex'

import EstimateFormFlight from '@/components/organisms/EstimateFormFlight'

export default {
  components: {
    EstimateFormFlight
  },
  computed: {
    ...mapState('estimate', ['loading']),
    flights () {
      return this.$store.state.estimateForm.flights.map(({ id, type }) => ({ id, type }))
    }
  },
  methods: {
    addFlight () {
      this.$store.commit('estimateForm/addFlight')
    },
    showError (message = '') {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom',
        actionText: 'Retry',
        indefinite: true,
        onAction: this.onSubmit.bind(this)
      })
    },
    async validate () {
      const result = await this.$refs.observer.validate()
      if (!result) {
        this.$toast.open({
          message: 'Form is not valid! Please check the fields.',
          type: 'is-danger',
          position: 'is-bottom'
        })
        return false
      }
      return true
    },
    async onSubmit () {
      if (this.loading) {
        return
      }
      const valid = await this.validate()
      if (!valid) {
        return
      }
      try {
        await this.$store.dispatch('estimate/create')
        this.promptActive = true
      } catch (err) {
        this.showError('Ouch, there was an error while trying to get an estimate')
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flight:last-child {
  .separator {
    display: none;
  }
}
</style>
