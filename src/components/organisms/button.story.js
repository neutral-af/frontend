// import mapValues from 'lodash/mapValues'
// import startCase from 'lodash/startCase'
import { boolean, select, text } from '@storybook/addon-knobs'
import '../../assets/css/main.css'
import DefaultButton, { colors, sizes, tags, variants } from './Button.vue'

const { props } = DefaultButton

export default {
  component: DefaultButton,
  title: 'Button'
}

// const getProps = (componentProps) => {
//   return mapValues(componentProps, (definition, name) => {
//     const label = startCase(name)
//     const options = []
//     let knob = 'text'
//     if (definition.type === String) {
//       if (definition.default && definition.options) {
//         knob = 'select'
//         options.push(definition.options, definition.default)
//       } else {
//         knob = 'text'
//         options.push(definition.default)
//       }
//     } else if (definition.type === Boolean) {
//       knob = 'boolean'
//       options.push(definition.default || false)
//     }
//     const knobFn = knobs[knob]
//     return {
//       default: knobFn(label, ...options)
//     }
//   })
// }

export const all = () => ({
  components: { DefaultButton },
  props: {
    as: {
      default: select('As', tags, props.as.default)
    },
    active: {
      default: boolean('Active', props.active.default)
    },
    color: {
      default: select('Color', colors, props.color.default)
    },
    loading: {
      default: boolean('Loading', props.loading.default)
    },
    disabled: {
      default: boolean('Disabled', props.disabled.default)
    },
    iconLeft: {
      default: text('Icon Left', props.iconLeft.default)
    },
    iconRight: {
      default: text('Icon Right', props.iconRight.default)
    },
    rounded: {
      default: boolean('Rounded', props.rounded.default)
    },
    size: {
      default: select('Size', sizes, props.size.default)
    },
    variant: {
      default: select('Variant', variants, props.variant.default)
    },
    text: {
      default: text('Text', 'Click me!')
    }
  },
  template: `
    <div :class="['p-4', color === 'invert' || variant === 'solid' ? 'bg-primary-600' : 'bg-white']">
      <DefaultButton v-bind="$props">{{ text }}</DefaultButton>
    </div>
  `
})
