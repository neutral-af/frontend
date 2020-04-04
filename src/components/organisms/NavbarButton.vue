<template>
  <Button
    variant="link"
    rounded="base"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </Button>
</template>
