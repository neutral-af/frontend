<template>
  <div class="fixed top-0 left-0 w-full text-base">
    <Notification
      v-for="({ message, type }, id) in notifications"
      :key="id"
      v-bind="{ id, message, type }"
      @close="onClose"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import Notification from '@/components/molecules/Notification'

export default {
  components: {
    Notification
  },
  computed: {
    ...mapState('notifications', ['notifications'])
  },
  methods: {
    ...mapMutations('notifications', { remove: 'removeNotification' }),
    onClose (id) {
      this.remove(id)
    }
  }
}
</script>

<style>
.notification {
}
</style>
