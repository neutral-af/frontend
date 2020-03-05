<template>
  <div class="level actions">
    <div class="level-item actions-item sm:mr-4">
      <slot name="left" />
    </div>
    <div class="level-item actions-item sm:mr-4">
      or
    </div>
    <div class="level-item actions-item">
      <slot name="right" />
    </div>
  </div>
</template>
