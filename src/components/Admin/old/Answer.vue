<script setup>
	import {answerCreate, answersGet, questionUpdate, answerUpdate, answerDelete} from "~/api"
	const adminStore = useAdminStore()
	const {answers} = storeToRefs(adminStore)

	const emits = defineEmits(["edit"])
	const props = defineProps({
		answer: [Object],
		position: {
			type: Boolean,
			default: false,
		},
	})

	const isCorrect = ref(false)

	const answerEditCorrect = async () => {
		const result = await answerUpdate(props.answer.id, {
			isCorrect: !isCorrect.value,
		})
		isCorrect.value = !isCorrect.value
		answers.value = await answersGet()
	}

	const answerRemove = async () => {
		const result = await answerDelete(props.answer.id)
		answers.value = await answersGet()
	}

	onMounted(() => {
		isCorrect.value = props.answer.isCorrect
	})
</script>
<template>
	<div class="rounded-10px border-2px border-f-gray-900 px-6px py-6px flex items-center justify-between">
		<div class="w-full flex flex-col items-center gap-6px">
			<div class="flex items-center gap-6px">
				<p v-if="position">{{ answer.correctPos }}</p>
				<TheInput
					class="w-full"
					v-model="answer.meta.title"
					@change="
						emits('edit', {
							id: answer.id,
							data: {
								meta: {
									title: answer.meta.title,
								},
								isCorrect: answer.isCorrect,
							},
						})
					"
				/>
			</div>
			<div v-if="!position" class="flex">
				<p class="text-14px mr-2">Правильный ответ:</p>
				<TheCheckbox
					v-model="answer.isCorrect"
					@change="
						emits('edit', {
							id: answer.id,
							data: {
								meta: {
									title: answer.meta.title,
								},
								isCorrect: answer.isCorrect,
							},
						})
					"
				/>
			</div>
		</div>
		<button @click="answerRemove" class="w-18px h-18px">
			<IconCloseBold class="w-full h-full" />
		</button>
	</div>
</template>
