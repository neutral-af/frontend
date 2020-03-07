import Vue from 'vue'

import Content from '@/components/atoms/Content'
import FeedbackLink from '@/components/atoms/FeedbackLink'
import Field from '@/components/atoms/Field'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import LLink from '@/components/atoms/LLink'
import Panel from '@/components/atoms/Panel'
import Select from '@/components/atoms/Select'
import Title from '@/components/atoms/Title'
import Autocomplete from '@/components/molecules/Autocomplete'
import Button from '@/components/molecules/Button'
import DatePicker from '@/components/molecules/DatePicker'
import NumberInput from '@/components/molecules/NumberInput'

export default () => {
  Vue.component('Autocomplete', Autocomplete)
  Vue.component('Button', Button)
  Vue.component('Content', Content)
  Vue.component('DatePicker', DatePicker)
  Vue.component('FeedbackLink', FeedbackLink)
  Vue.component('Field', Field)
  Vue.component('Icon', Icon)
  Vue.component('Input', Input)
  Vue.component('LLink', LLink)
  Vue.component('NumberInput', NumberInput)
  Vue.component('Panel', Panel)
  Vue.component('Select', Select)
  Vue.component('Title', Title)
}
