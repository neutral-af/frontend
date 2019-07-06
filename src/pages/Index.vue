<template>
  <Layout>
    <h1 class="title">
      Estimate
    </h1>
    <EstimateForm />
  </Layout>
</template>

<script>
import EstimateForm from '~/components/organisms/EstimateForm'

export default {
  components: {
    EstimateForm
  },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
