<template>
  <div>
    <HomeHero class="section" />
    <main>
      <HomeBadNews class="section" />
      <HomeGoodNews class="section" />
    </main>
    <MainFoot />
  </div>
</template>

<script>
import { NAME } from '@/../constants'
import HomeHero from '@/components/organisms/HomeHero'
import HomeBadNews from '@/components/organisms/HomeBadNews'
import HomeGoodNews from '@/components/organisms/HomeGoodNews'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  head: {
    title: NAME,
    titleTemplate: null
  },
  components: {
    HomeHero,
    HomeBadNews,
    HomeGoodNews,
    MainFoot
  }
}
</script>

<style>
.section {
  min-height: -webkit-fill-available;
}
</style>
