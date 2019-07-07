import Buefy from 'buefy'
import VeeValidate from 'vee-validate'

import addStore from '~/store'
import Layout from '~/layouts/Default'
import Field from '~/components/atoms/Field'
import '~/assets/sass/main.scss'

export default (Vue, { appOptions, router, head, isClient }) => {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css'
  })
  head.bodyAttrs = { class: 'has-navbar-fixed-top' }

  addStore(Vue, { appOptions })

  Vue.use(Buefy, {
    defaultIconPack: 'fas',
    defaultContainerElement: '#content',
    defaultFieldLabelPosition: 'on-border'
  })
  Vue.use(VeeValidate)
  Vue.component('Layout', Layout)
  Vue.component('Field', Field)
}
