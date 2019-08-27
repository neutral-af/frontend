<template>
  <main>
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="box">
      <EstimateForm v-if="!hasEstimate" />
      <EstimatePreview v-else />
    </div>
  </main>
</template>

<script>
import EstimateForm from '@/components/organisms/EstimateForm'
import EstimatePreview from '@/components/organisms/EstimatePreview'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    EstimateForm,
    EstimatePreview
  },
  computed: {
    hasEstimate () {
      return !!this.$store.state.estimate.id
    },
    title () {
      return this.hasEstimate ? 'Estimate Preview' : 'Estimate'
    }
  }
}
</script>
