import Layout from '~/layouts/Default'
import '~/assets/sass/main.scss'

export default (Vue, { router, head, isClient }) => {
  Vue.component('Layout', Layout)
}
