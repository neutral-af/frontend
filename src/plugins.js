import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueMeta from 'vue-meta'
import Buefy from 'buefy'

export default () => {
  Vue.use(VueCookies)
  Vue.use(VueMeta)
  Vue.use(Buefy, {
    defaultIconPack: 'fas',
    defaultContainerElement: '#content',
    defaultUseHtml5Validation: false
  })
}
