import Vue from 'vue'

export default () => {
  Vue.directive('click-blur', {
    bind (el) {
      el.clickHandler = () => { el.blur() }
      el.addEventListener('click', el.clickHandler)
    },
    unbind (el) {
      el.removeEventListener('click', el.clickHandler)
    }
  })
}
