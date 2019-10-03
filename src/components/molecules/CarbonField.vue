<template>
  <BField label="Carbon">
    <BField
      class="fields"
      position="is-centered"
      grouped
      group-multiline
    >
      <BField class="is-size-3">
        <Carbon :amount="value.carbon" />
      </BField>

      <CarbonBreakdownModal
        :carbon="value.carbon"
        :km="value.km"
      />
    </BField>
  </BField>
</template>

<script>
import Carbon from '@/components/atoms/Carbon'
import CarbonBreakdownModal from '@/components/molecules/CarbonBreakdown'

export default {
  components: {
    Carbon,
    CarbonBreakdownModal
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.fields {
  align-items: center;
}
</style>
