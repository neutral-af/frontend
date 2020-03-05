import Vue from 'vue'

import Field from '@/components/atoms/Field'
import FeedbackLink from '@/components/atoms/FeedbackLink'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/molecules/Button'

export default () => {
  Vue.component('Field', Field)
  Vue.component('FeedbackLink', FeedbackLink)
  Vue.component('Button', Button)
  Vue.component('Icon', Icon)
}
