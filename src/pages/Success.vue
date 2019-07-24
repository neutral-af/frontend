<template>
  <div>
    <h1 class="title">
      Success!
    </h1>
    <h2 class="subtitle">
      You just offset {{ carbon }} kilograms of carbon!
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('estimate', ['carbon'])
  }
}
</script>
