<template>
  <component
    :is="as"
    :type="type || (as === 'button' ? 'button' : undefined)"
    :class="classes"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Icon
      v-if="iconLeft"
      :icon="iconLeft"
      :class="{
        'mr-2 md:mr-3': !!$slots.default,
        invisible: loading,
      }"
    />
    <span
      v-if="!!$slots.default"
      :class="{ invisible: loading }"
    >
      <slot />
    </span>
    <LoadingIcon
      v-if="loading"
      class="absolute"
    />
    <Icon
      v-if="iconRight"
      :icon="iconRight"
      :class="{
        'ml-2 md:ml-3': !!$slots.default,
        invisible: loading,
      }"
    />
  </component>
</template>

<script>
export const colors = ['base', 'primary', 'invert']
export const rounded = ['base', 'full', 'full-left', 'full-right', 'none']
export const sizes = ['xs', 'sm', 'base', 'lg', 'xl']
export const tags = ['button', 'a', 'div', 'RouterLink']
export const variants = ['outline', 'solid', 'link']

export default {
  props: {
    as: {
      type: String,
      default: tags[0],
      validator: (value) => tags.includes(value)
    },
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: colors[0],
      validator: (value) => colors.includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: [String, Array],
      default: ''
    },
    iconRight: {
      type: [String, Array],
      default: ''
    },
    rounded: {
      type: String,
      default: 'full',
      validator: value => rounded.includes(value)
    },
    size: {
      type: String,
      default: 'base',
      validator: value => sizes.includes(value)
    },
    type: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: variants[0],
      validator: value => variants.includes(value)
    }
  },
  computed: {
    interactive () {
      return !this.disabled && !this.loading
    },
    classes () {
      const classes = ['inline-flex justify-center items-center text-center whitespace-no-wrap align-center position-relative align-top focus:outline-none focus:shadow-outline transition-colors duration-100']
      let colorClasses = []
      switch (this.color) {
        case 'base':
          colorClasses = this.getColorBaseClasses()
          break
        case 'primary':
          colorClasses = this.getColorPrimaryClasses()
          break
        case 'invert':
          colorClasses = this.getColorInvertClasses()
          break
      }
      classes.push(...colorClasses)
      if (this.disabled) {
        classes.push('opacity-50')
      }
      classes.push(this.interactive ? 'cursor-pointer' : 'pointer-events-none')
      switch (this.rounded) {
        case 'base':
          classes.push('rounded')
          break
        case 'full':
          classes.push('rounded-full')
          break
        case 'full-left':
          classes.push('rounded-l-full')
          break
        case 'full-right':
          classes.push('rounded-r-full')
          break
      }
      switch (this.size) {
        case 'xs':
          classes.push('text-xs', 'md:text-sm', 'py-1', 'px-3')
          break
        case 'sm':
          classes.push('text-sm', 'md:text-base', 'py-1', 'px-3')
          break
        case 'base':
          classes.push('text-base', 'md:text-lg', 'py-2', 'px-4')
          break
        case 'lg':
          classes.push('text-lg', 'md:text-xl', 'py-3', 'px-6')
          break
        case 'xl':
          classes.push('text-xl', 'md:text-2xl', 'py-3', 'px-6')
          break
      }
      return classes
    }
  },
  methods: {
    getColorBaseClasses () {
      const classes = this.getActiveClasses('text-gray-800', ...this.getActiveClasses('text-gray-600'))
      switch (this.variant) {
        case 'outline':
          classes.push('border', 'border-gray-400', ...this.getActiveClasses('border-gray-600'))
          break
        case 'solid':
          classes.push('bg-white', ...this.getActiveClasses('bg-gray-200'))
          break
      }
      return classes
    },
    getColorPrimaryClasses () {
      const classes = []
      switch (this.variant) {
        case 'outline':
          classes.push(
            'text-primary-500',
            'border',
            'border-primary-500',
            ...this.getActiveClasses('text-primary-700', 'border-primary-700')
          )
          break
        case 'solid':
          classes.push(
            'text-white',
            'bg-primary-500',
            ...this.getActiveClasses('bg-primary-700')
          )
          break
        case 'link':
          classes.push('text-primary-500')
          break
      }
      return classes
    },
    getColorInvertClasses () {
      const classes = ['text-white', ...this.getActiveClasses('text-gray-300')]
      switch (this.variant) {
        case 'outline':
          classes.push('border', 'border-white', ...this.getActiveClasses('border-gray-300'))
          break
        case 'solid':
          classes.push('bg-gray-800', ...this.getActiveClasses('bg-gray-900'))
          break
      }
      return classes
    },
    getActiveClasses (...classes) {
      if (this.active) {
        return classes
      }
      return Array.from(classes)
        .reduce((acc, cls) => acc.concat([`hover:${cls}`, `focus:${cls}`]), [])
    }
  }
}
</script>
