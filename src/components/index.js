import Vue from 'vue'

import Field from '@/components/atoms/Field'
import FeedbackLink from '@/components/atoms/FeedbackLink'
import RoundedButton from '@/components/atoms/RoundedButton'

export default () => {
  Vue.component('Field', Field)
  Vue.component('FeedbackLink', FeedbackLink)
  Vue.component('RoundedButton', RoundedButton)
}
