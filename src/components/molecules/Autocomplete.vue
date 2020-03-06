<template>
  <div class="relative">
    <div class="relative">
      <Input
        v-model="query"
        v-bind="$attrs"
        class="w-full"
        @input="onInput"
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
        class="p-4"
        :class="{ 'is-active': index === selected }"
        @click="setItem(item)"
      >
        {{ item }}
      </li>
    </Panel>
  </div>
</template>

<script>
export default {
  props: {
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
    onInput () {
      this.$emit('input', this.query)
      this.filterItems()
      this.open = true
    },
    filterItems () {
      this.filtered = this.items.filter((item) => {
        return Object.values(item).join('').toLowerCase().indexOf(this.query.toLowerCase()) > -1
      })
    },
    setItem (item) {
      this.query = item
      this.open = false
      this.$emit('set', item)
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
      this.query = this.filtered[this.selected]
      this.open = false
      this.selected = -1
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
