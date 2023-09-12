<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'up' | 'down'>,
    default: 'up',
  },
  default: {
    type: Boolean,
    default: true,
  },
})

const color = computed(() => {
  if (props.default) {
    return props.type === 'up' ? '#3DC67D' : '#E9585B'
  }

  return 'currentColor'
})
</script>

<template>
  <BaseIcon width="24" height="24" :color="color">
    <path
      v-if="type === 'up'"
      d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
    />
    <path
      v-if="type === 'down'"
      d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z"
    />
  </BaseIcon>
</template>
