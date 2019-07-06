<template>
  <article class="card estimate-form-flight">
    <header class="card-header">
      <div class="card-header-title">
        Flight {{ id }}
      </div>
      <a
        v-if="removeable"
        class="card-header-icon"
        @click="remove"
      >
        <span class="icon">
          <i
            class="fas fa-trash"
            aria-hidden="true"
          />
        </span>
      </a>
    </header>
    <div class="card-content">
      <template v-if="type === 'number'">
        <EstimateFormNumber :id="id" />
        <p class="field">
          Missing flight number? Insert
          <a @click="toggleType">
            airports
          </a>
          instead
        </p>
      </template>
      <template v-else>
        <EstimateFormLocations :id="id" />
        <p class="field">
          Have a
          <a @click="toggleType">
            flight number
          </a>
          instead?
        </p>
      </template>
    </div>
  </article>
</template>

<script>
import EstimateFormNumber from '~/components/molecules/EstimateFormNumber'
import EstimateFormLocations from '~/components/molecules/EstimateFormLocations'

export default {
  components: {
    EstimateFormNumber,
    EstimateFormLocations
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    removeable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleType () {
      const type = this.type === 'number' ? 'locations' : 'number'
      this.$store.commit('estimateForm/updateFlight', {
        id: this.id,
        data: { type }
      })
    },
    remove () {
      this.$store.commit('estimateForm/removeFlight', this.id)
    }
  }
}
</script>

<style lang="scss">
.estimate-form-flight {
  min-height: 250px;
}
</style>
