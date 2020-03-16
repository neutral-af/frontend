<template>
  <Button
    variant="link"
    :rounded="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </Button>
</template>
