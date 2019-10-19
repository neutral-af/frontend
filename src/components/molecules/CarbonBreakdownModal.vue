<template>
  <div
    class="modal-card"
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
</template>

<script>
export default {
  props: {
    carbon: {
      type: Number,
      required: true
    },
    km: {
      type: Number,
      required: true
    }
  }
}
</script>
