<template>
  <BButton
    rounded
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </BButton>
</template>
