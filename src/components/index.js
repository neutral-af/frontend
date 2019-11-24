import Vue from 'vue'

import CustomField from '@/components/atoms/CustomField'
import FeedbackLink from '@/components/atoms/FeedbackLink'
import RoundedButton from '@/components/atoms/RoundedButton'

export default () => {
  Vue.component('CustomField', CustomField)
  Vue.component('FeedbackLink', FeedbackLink)
  Vue.component('RoundedButton', RoundedButton)
}
