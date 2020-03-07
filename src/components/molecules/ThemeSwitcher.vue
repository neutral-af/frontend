<template>
  <Button
    :border="false"
    :icon-left="['far', theme === 'dark' ? 'sun' : 'moon']"
    :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
    @click="toggleTheme"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['theme'])
  },
  methods: {
    ...mapMutations(['setTheme']),
    toggleTheme () {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    }
  }
}
</script>
