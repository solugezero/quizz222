<template>
	<div class="rs-card">
		{{ question }}
		<el-dialog v-model="dialogVisible">
			<AdminCreateUpdateQuestionDialog :question="question" v-if="dialogVisible" />
		</el-dialog>
		<img v-lazy="getImageUrl" class="rs-img rounded-2 mb-5px min-h-255px" />
		<div class="flex-wr">
			<table id="customers" class="w100_pers flex-wr">
				<tr class="min-w-200">
					<th>Название</th>
					<th>Коментарий</th>
					<th>Тип</th>
					<th>Номер Вопроса</th>
					<th>Легкий Вопрос?</th>
					<th>Коментарий к Картинке</th>
				</tr>
				<tr class="w100_pers">
					<td>{{ question.meta?.title || "—" }}</td>
					<td>{{ question.meta?.comment || "—" }}</td>
					<td>
						{{ question?.type }}
					</td>
					<td>{{ question?.id }}</td>
					<td>{{ question.meta?.easy || "false" }}</td>
					<td>{{ question.meta?.imageComment || "Без комментариев..." }}</td>
				</tr>
			</table>
		</div>

		<h2>Ответы</h2>
		<div class="d-flex gap-10">
			<div v-for="(answers, idx) in getAnswersById(question.id)" :key="idx" class="w100_pers">
				<el-button class="w100_pers" :type="!answers?.isCorrect || 'success'">
					<span v-html="answers?.meta?.title" />
					<el-tag v-if="answers?.correctValue">{{ answers?.correctValue }}</el-tag>
				</el-button>
			</div>
		</div>
		<el-row class="relative justify-end items-end h-87px">
			<el-button @click="handleOpenDialog" class="w-135px">Редактировать</el-button>
			<el-button @click="handleDeleteQuestion" class="w-135px">Удалить</el-button>
		</el-row>
	</div>
</template>

<script setup>
const adminStore = useAdminStore()
const api = import.meta.env.VITE_API
const { getAnswersById } = toRefs(adminStore)
const { deleteQuestion } = adminStore
const dialogVisible = ref(false)
const props = defineProps({
	question: {
		type: Object,
		default: {}
	},
})
const getImageUrl = computed(() => {
	return {
		src: `${api}/${props?.question?.meta?.image}`,
		error: "noimage2.png",
	}
})
const getAnswers = getAnswersById.value(props.question.id)

const handleDeleteQuestion = async () => {
	await deleteQuestion(props.question).then((data) => {
		if (data) {
			console.log("DELETED!")
		} else {
			console.log({ error: data })
		}
	})
}
const handleOpenDialog = (data) => {
	dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.rs-card {
	padding: 15px;
}

.w100_pers {
	width: 100%;
}

#customers {
	font-size: 14px;
	border-collapse: collapse;
	width: 100%;
}

#customers tr {
	float: left;
}

#customers td,
#customers th {
	border: 1px solid #ddd;
	padding: 3px;
	display: block;
	text-align: left;
}

#customers tr:nth-child(even) {
	background-color: #f2f2f2;
}

#customers th {
	padding: 3px 10px;
	text-align: left;
	color: rgb(0, 0, 0);
}

.gap-10 {
	gap: 10px;
}

.flex-wr {
	flex-wrap: nowrap;
	display: flex;
}

.min-w-200 {
	min-width: 250px;
}</style>
