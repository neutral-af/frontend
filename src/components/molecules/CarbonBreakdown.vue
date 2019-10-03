<template>
  <div>
    <BButton
      class="field"
      rounded
      icon-right="question"
      @click="show = true"
    />
    <BModal
      :active.sync="show"
      has-modal-card
    >
      <div
        class="modal-card"
        style="width: auto"
      >
        <div class="modal-content modal-card-body">
          <div class="title has-text-grey-dark">
            Carbon Estimate Breakdown
          </div>
          <div class="has-text-grey-darker">
            The estimated carbon emissions of <strong>{{ carbon }} kilograms CO<sub>2</sub></strong> is based on a flight distance of <strong>{{ km }} kilometres</strong>, incorporating a "radiative forcing factor" of <strong>1.9x</strong> to account for the increased damage of carbon released at high altitudes.
          </div>
        </div>
      </div>
    </BModal>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    carbon: {
      type: Number,
      default: null
    },
    km: {
      type: Number,
      default: null
    }
  },
  data () {
    return { show: false }
  },
  computed: {
  }
}
</script>
