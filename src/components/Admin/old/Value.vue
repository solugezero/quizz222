<script setup>
	const emits = defineEmits(["remove"])
	const props = defineProps({
		answer: [Object],
	})
</script>
<template>
	<div class="rounded-10px border-2px border-f-gray-900 px-6px py-6px flex items-center justify-between">
		<div class="w-full flex flex-col items-center gap-6px">
			<div class="flex">
				<p class="text-14px mr-2">{{ answer.question }}</p>
				<p class="text-14px mr-2">{{ answer.answer }}</p>
			</div>
		</div>
		<button @click="emits('remove')" class="w-18px h-18px">
			<IconCloseBold class="w-full h-full" />
		</button>
	</div>
</template>
