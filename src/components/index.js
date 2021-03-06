import Vue from 'vue'

import AnimatedValue from '@/components/atoms/AnimatedValue'
import Content from '@/components/atoms/Content'
import Checkbox from '@/components/atoms/Checkbox'
import Field from '@/components/atoms/Field'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import InlineLink from '@/components/atoms/InlineLink'
import Message from '@/components/atoms/Message'
import Panel from '@/components/atoms/Panel'
import Select from '@/components/atoms/Select'
import Title from '@/components/atoms/Title'
import Autocomplete from '@/components/molecules/Autocomplete'
import DatePicker from '@/components/molecules/DatePicker'
import LoadingIcon from '@/components/molecules/LoadingIcon'
import NumberInput from '@/components/molecules/NumberInput'
import Button from '@/components/organisms/Button'
import ScrollButton from '@/components/organisms/ScrollButton'

export default () => {
  Vue.component('AnimatedValue', AnimatedValue)
  Vue.component('Autocomplete', Autocomplete)
  Vue.component('Button', Button)
  Vue.component('Checkbox', Checkbox)
  Vue.component('Content', Content)
  Vue.component('DatePicker', DatePicker)
  Vue.component('Field', Field)
  Vue.component('Icon', Icon)
  Vue.component('Input', Input)
  Vue.component('InlineLink', InlineLink)
  Vue.component('LoadingIcon', LoadingIcon)
  Vue.component('Message', Message)
  Vue.component('NumberInput', NumberInput)
  Vue.component('Panel', Panel)
  Vue.component('ScrollButton', ScrollButton)
  Vue.component('Select', Select)
  Vue.component('Title', Title)
}
