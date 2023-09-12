<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'asc' | 'desc'>,
    default: 'up',
  },
  lang: {
    type: String as PropType<'ru' | 'en'>,
    default: 'en',
  },
})
</script>

<template>
  <BaseIcon width="24" height="24">
    <template v-if="lang === 'en'">
      <path
        v-if="type === 'desc'"
        d="M19 7H22L18 3L14 7H17V21H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3ZM9 7H7V5H9V7Z"
      />
      <path
        v-else
        d="M19 17H22L18 21L14 17H17V3H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3ZM9 7H7V5H9V7Z"
      />
    </template>
    <template v-else>
      <path
        v-if="type === 'asc'"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 7H19V21H17V7H14L18 3L22 7ZM7 3H9C10.11 3 11 3.9 11 5V11H9V9H7V11H5V5C5 3.9 5.9 3 7 3ZM7 7H9V5H7V7ZM5 15C5 13.36 6.36 12 8 12H12C12 13.09 11.09 14 10 14H8C7.44 14 7 14.44 7 15H9C10.65 15 12 16.36 12 18C12 19.65 10.65 21 9 21H8C6.36 21 5 19.65 5 18V15ZM10 18C10 17.43 9.57 17 9 17H7V18C7 18.57 7.43 19 8 19H9C9.57 19 10 18.57 10 18Z"
      />
      <path
        v-else
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17 17H14L18 21L22 17H19L19 3L17 3L17 17ZM9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3ZM9 7H7V5H9V7ZM8 12C6.36 12 5 13.36 5 15V18C5 19.65 6.36 21 8 21H9C10.65 21 12 19.65 12 18C12 16.36 10.65 15 9 15H7C7 14.44 7.44 14 8 14H10C11.09 14 12 13.09 12 12H8ZM9 17C9.57 17 10 17.43 10 18C10 18.57 9.57 19 9 19H8C7.43 19 7 18.57 7 18V17H9Z"
      />
    </template>
  </BaseIcon>
</template>
