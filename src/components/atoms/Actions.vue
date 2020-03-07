<template>
  <div class="sm:flex sm:items-center sm:justify-center">
    <div class="">
      <slot name="left" />
    </div>
    <div class="my-2 sm:my-0 sm:mx-4">
      or
    </div>
    <div class="">
      <slot name="right" />
    </div>
  </div>
</template>
