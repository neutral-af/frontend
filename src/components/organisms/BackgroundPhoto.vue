<template>
  <div class="absolute w-full h-full background-photo">
    <SectionCredits
      compact
      class="absolute bottom-0 right-0"
    >
      <LLink
        href="https://unsplash.com/@josswoodhead?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        noreferrer
        target="_blank"
      >
        Joss Woodhead
      </LLink> · <LLink
        href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        noreferrer
        target="_blank"
      >
        Unsplash
      </LLink>
    </SectionCredits>
  </div>
</template>

<script>
import SectionCredits from '@/components/molecules/SectionCredits'

export default {
  components: {
    SectionCredits
  }
}
</script>

<style lang="scss" scoped>
.background-photo {
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    mix-blend-mode: soft-light;
    filter: grayscale(50);
    background: url(../../assets/img/background.jpg) no-repeat center / cover,
  }
}
</style>
