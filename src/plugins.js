import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueMeta from 'vue-meta'

export default () => {
  Vue.use(VueCookies)
  Vue.use(VueMeta, { keyName: 'head' })
}
