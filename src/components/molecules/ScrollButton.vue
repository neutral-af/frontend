<template>
  <BTooltip
    label="Know more"
    :type="tooltipType"
  >
    <RoundedButton
      icon-left="arrow-down"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </BTooltip>
</template>

<script>
export default {
  props: {
    tooltipType: {
      type: String,
      default: 'is-primary'
    }
  }
}
</script>
