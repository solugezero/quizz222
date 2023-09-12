<script lang="ts" setup></script>

<template>
  <span class="content-help">
    <span class="content-help__text">
      <slot />
    </span>

    <IconHelp type="secondary" class="content-help__icon" />
  </span>
</template>
<style lang="scss" scoped>
.content-help {
  // @apply flex items-center;
  @apply block;
}

.content-help__text {
  @apply align-middle
}

.content-help__icon {
  @apply ml-7px text-f-gray-400 inline-block align-middle;
}
</style>
