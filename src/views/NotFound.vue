<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-col flex-grow">
      <MainHead />
      <div class="container text-center">
        <Title as="h1">
          {{ title }} {{ subtitle }}
        </Title>
      </div>
    </div>
    <MainFoot compact />
  </div>
</template>

<script>
import MainHead from '@/components/organisms/MainHead'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  head () {
    return {
      title: `${this.title} ${this.subtitle}`
    }
  },
  components: {
    MainHead,
    MainFoot
  },
  computed: {
    title () {
      return 'Ouch!'
    },
    subtitle () {
      return 'The page was not found'
    }
  }
}
</script>
