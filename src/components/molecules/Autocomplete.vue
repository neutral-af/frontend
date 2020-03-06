<template>
  <div class="relative">
    <div class="relative">
      <Input
        v-model="query"
        v-bind="$attrs"
        class="w-full"
        @input="onInput"
        @focus="onFocus"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
      />
      <Icon
        v-if="loading"
        icon="circle-notch"
        spin
        class="absolute right-0 text-gray-500"
        style="top: 25%"
      />
    </div>
    <Panel
      v-show="open"
      as="ul"
      class="absolute z-10"
    >
      <li
        v-for="(item, index) in filtered"
        :key="index"
        tabindex="0"
        class="cursor-pointer p-4 border-b hover:text-teal-500 hover:border-teal-500 focus:text-teal-500 focus:border-teal-500"
        :class="{ 'text-teal-500 border-teal-500': index === selected }"
        @click="setItem(item)"
      >
        {{ formatter(item) }}
      </li>
    </Panel>
  </div>
</template>

<script>
export default {
  props: {
    formatter: {
      type: Function,
      default: value => value
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false,
      filtered: [],
      query: '',
      selected: 0
    }
  },
  watch: {
    items: function (value, oldValue) {
      if (value.length !== oldValue.length) {
        this.filtered = value
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.onClickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.onClickOutside)
  },
  methods: {
    filterItems () {
      this.filtered = this.query.length > 0
        ? this.items.filter((item) => (
          Object.values(item).join('').toLowerCase().includes(this.query.toLowerCase())
        ))
        : []
    },
    setQuery (value) {
      this.query = this.formatter(value)
    },
    setItem (item) {
      this.setQuery(item)
      this.open = false
      this.$emit('set', item)
    },
    onInput () {
      this.$emit('input', this.query)
      this.filterItems()
      this.open = true
    },
    onFocus () {
      this.open = true
    },
    onArrowDown (evt) {
      if (this.selected < this.filtered.length) {
        this.selected = this.selected + 1
      }
    },
    onArrowUp () {
      if (this.selected > 0) {
        this.selected = this.selected - 1
      }
    },
    onEnter () {
      this.selected = -1
      this.setItem(this.filtered[this.selected])
    },
    onClickOutside ({ target }) {
      if (!this.$el.contains(target)) {
        this.open = false
        this.selected = -1
      }
    }
  }
}
</script>
