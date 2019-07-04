// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Layout from '~/layouts/Default.vue'

export default (Vue, { router, head, isClient }) => {
  // Set default layout as a global component
  Vue.component('Layout', Layout)
}
