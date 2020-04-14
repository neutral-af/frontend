import { createId, createSetMutation } from '@/utils/store'

const AUTOCLOSE_DELAY = 5000
const createNotification = (notification) => ({
  message: '',
  type: 'base',
  autoclose: AUTOCLOSE_DELAY,
  ...notification
})

export default {
  namespaced: true,
  state: {
    notifications: {}
  },
  mutations: {
    setNotifications: createSetMutation('notifications'),
    removeNotification (state, id) {
      delete state.notifications[id]
      state.notifications = { ...state.notifications }
    }
  },
  actions: {
    showNotification: {
      root: true,
      handler ({ commit, state }, data) {
        const id = createId(state.notifications)
        const notification = createNotification(data)
        const notifications = { ...state.notifications, [id]: notification }
        commit('setNotifications', notifications)
        if (notification.autoclose !== false) {
          setTimeout(() => {
            commit('removeNotification', id)
          }, notification.autoclose)
        }
        return id
      }
    }
  }
}
