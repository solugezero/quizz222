<script setup>
defineProps({
	asc: {
		type: Boolean,
		default: true,
	},
});
</script>

<template>
	<div class="w-16px h-16px px-1px py-2px flex flex-col gap-y-3px">
		<span class="h-2px bg-f-gray-300 transition-[width] duration-300" :class="!asc ? 'w-12px' : 'w-4px'"></span>
		<span class="w-8px h-2px bg-f-gray-300"></span>
		<span class="h-2px bg-f-gray-300 transition-[width] duration-300" :class="!asc ? 'w-4px' : 'w-12px'"></span>
	</div>
</template>
