<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'right',
  },
})

const classes = computed(() => ({
  'rotate-90': props.type === 'right',
  'rotate-[-90deg]': props.type === 'left',
  'rotate-[-180deg]': props.type === 'bottom',
  // 'rotate-[-180]': props.type === 'left',
}))
</script>

<template>
  <BaseIcon width="16" height="16" :class="classes">
    <path d="M2.22999 9.61508L7.37768 4.2811C7.55355 4.08913 7.76325 4 8 4C8.23675 4 8.45321 4.09599 8.62909 4.2811L13.77 9.61509C13.9188 9.76592 14 9.95789 14 10.1841C14 10.6435 13.6483 11 13.2018 11C12.9853 11 12.7756 10.9177 12.6201 10.7532L8.00676 5.94711L3.37993 10.7532C3.23111 10.9109 3.02142 11 2.79819 11C2.35175 11 2 10.6435 2 10.1841C2 9.96474 2.08117 9.76592 2.22999 9.61508Z" />
  </BaseIcon>
</template>
