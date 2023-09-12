<template>
	<div>
		<el-row class="gap-2">
			<el-col class="relative" :span="24">
				<img v-if="getImgUrl" :src="getImage" class="pointer-events-none absolute z-99999 rs-img mb-2 rounded-2" />
				<el-upload ref="upload" :on-change="(data) => handleChangeImage(data)" drag :auto-upload="false">
					<el-icon class="el-icon--upload"><upload-filled /></el-icon>
					<div class="el-upload__text">
						Перетащите файл сюда или
						<em>нажмите для загрузки</em>
					</div>
					<template #tip>
						<div class="el-upload__tip">Необходимый размер изображения: 680х256</div>
						<p v-if="imageError">Неподходящее разрешение загруженного фото</p>
					</template>
					<template #file="{ file }">
						<div></div>
					</template>
				</el-upload>
			</el-col>
			<el-col :span="24">
				<p>Название</p>
				<el-input placeholder="Название" v-model="state.meta.title"></el-input>
			</el-col>
			<el-col :span="24">
				<p>Комментарий</p>
				<el-input v-model="state.meta.comment" :rows="2" type="textarea" placeholder="Комментарий" />
			</el-col>
			<el-col :span="24" v-if="getImgUrl">
				<p>Комментарий к изображению</p>
				<el-input v-model="state.meta.imageComment" :rows="2" type="textarea"
					placeholder="Комментарий к изображению" />
			</el-col>
			<el-col :span="24">
				<el-row class="justify-between">
					<el-radio-group v-model="state.type">
						<el-radio-button label="DEFAULT">Стандартный</el-radio-button>
						<el-radio-button label="POSITION">Позиция</el-radio-button>
						<el-radio-button label="VALUE">Супер-игра</el-radio-button>
					</el-radio-group>
					<el-checkbox v-model="state.meta.easy">Легкий вопрос</el-checkbox>
				</el-row>
			</el-col>
			<el-col>
				<div class="w-100% flex flex-col gap-10px" v-if="state.type === 'DEFAULT'">
					Ответы к стандартной игре
					<div class="flex gap-10px"
						v-for="(answers, idx) in getAnswersById(props.createMode ? 'new' : props.question?.id) || []"
						:key="idx">
						<el-input class="w-4/5 max-w-555px" @change="value => handleChangeAnswerTitle(value, answers)"
							v-model="answers.meta.title" :rows="1" placeholder="ответ" />
						<el-checkbox @change="(data) => validateCorrect(data, answers)" v-model="answers.isCorrect"
							:label="true">Правильный Ответ</el-checkbox>
						<el-button class="w-fit" @click="deleteAnswer(answers.id)" plain>Удалить</el-button>
					</div>
					<el-button @click="addAnswer" plain>Добавить Ответ</el-button>
				</div>
				
				<div v-if="state.type === 'POSITION'">
					Позиции
					<div class="w-100% flex flex-row gap-20px" v-for="(questions, idx) in state.meta.positions" :key="idx">
						<el-input v-model="questions.title" clearable class="w-4/5 max-w-600px" :rows="1"
							placeholder="Вопрос" />
						<div class="w-1/5 max-w-50px">{{ questions.position }}</div>
					</div>
					<el-button @click="addPosition" plain>Добавить Позицию</el-button>
					Ответы к позиции
					<div class="gap-5px"
						v-for="(answers, idx) in getAnswersById(props.createMode ? 'new' : props.question.id) || []"
						:key="idx">
						<el-input clearable class="w-4/5 max-w-600px" v-model="answers.meta.title" :rows="1"
							placeholder="ответ" />
						<el-input :maxlength="1" class="w-1/5 max-w-50px" v-model="answers.correctPos" :rows="1"></el-input>
					</div>
					<el-button @click="addAnswer" plain>Добавить Ответ</el-button>
				</div>
				
				<div v-if="state.type === 'VALUE'">
					Ответ к супер-игре
					<el-input v-model="state.valueWord" :rows="1" placeholder="ответ"></el-input>
				</div>
			</el-col>
			<el-row>
				<el-button @click="handleSaveOrUpdateQuestion">Сохранить</el-button>
			</el-row>
		</el-row>
	</div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue"
import { get } from "lodash"
const api = import.meta.env.VITE_API

const adminStore = useAdminStore()
const { getQuestionsById, getAnswersById, answers } = toRefs(adminStore)
const { saveQuestion, updateQeustion, saveAnswer, updateAnswer, deleteAnswer, deleteQuestion } = adminStore
const tempListFile = ref([])
const props = defineProps({
	question: [Object],
	createMode: {
		type: Boolean,
		default: false,
	},
})

const handleChangeAnswerTitle = (value, answer) => {
	if (!props.createMode) answers.value = answers.value.map(item => {
		if (item.id === answer.id) return { ...item, title: value, type: 'change' }
		return item
	})
}
const state = ref({
	id: undefined,
	type: "DEFAULT",
	meta: {
		image: undefined,
		title: undefined,
		comment: undefined,
		imageComment: undefined,
		value: [],
		positions: [],
	},
	valueWord: "",
	valueChars: [],
})

let imageError = ref(false)
const getImage = computed(() => {
	if (props?.question?.meta?.image) return getImageUrl.value.src
	return getImgUrl.value
})
const getImageUrl = computed(() => {
	return {
		src: `${api}/${props?.question?.meta?.image}`,
		error: "noimage2.png",
	}
})

const stateAnswers = ref([])

const validateCorrect = (data, answer) => {
	const full = getAnswersById.value(props.createMode ? "new" : props.question?.id)
	const isCorrectAnswer = full.filter((item) => item.isCorrect)

	if (isCorrectAnswer.length > 1) {
		const extraAnswer = isCorrectAnswer.find((item) => item.id !== answer.id)
		answers.value = answers.value.map((item) => {
			if (item.id === extraAnswer.id) return { ...item, isCorrect: false }
			return item
		})
	}
}

const addPosition = () => {
	if (!state.value.meta.positions) {
		state.value.meta["positions"] = []
	}
	state.value.meta.positions.push({
		title: "",
		position: state.value.meta.positions.length + 1,
	})
}

const addAnswer = () => {
	answers.value.push({
		id: Math.random(),
		isCorrect: false,
		questionId: props.createMode ? "new" : props.question?.id,
		meta: { title: "" },
		type: "new"
	})
}

const getCurrentAnswers = computed(() => {
	stateAnswers.value = getAnswersById.value(props.question?.id)
})
const getImgUrl = computed(() => {
	if (!state?.value?.meta?.image) return
	return typeof state.value.meta.image === "string" ? state.value.meta.image : URL.createObjectURL(state?.value?.meta?.image)
})

const charToString = ([]) => {
	for (let index = 0; index < array.length; index++) {
		let chars = []
		chars.push(state.value[index].answer)
	}
	return chars.join("")
}
const handleChangeImage = (data) => {
	delete state.value.meta.image
	const img = document.createElement("img")

	const selectedImage = data?.raw

	const objectURL = URL.createObjectURL(selectedImage)
	img.onload = function handleLoad() {
		if (img.width < 680 || img.height < 256) {
			imageError.value = true
		} else {
			state.value.meta.image = data.raw
			imageError.value = false
		}

		URL.revokeObjectURL(objectURL)
	}
	img.src = objectURL
}
const handleSaveOrUpdateQuestion = async () => {
	if (props.createMode) {
		console.log("CREATE MOD")
		await saveQuestion(state.value).then(async (data) => {
			if (data) {
				const newAnswers = answers.value.filter(item => item.questionId === 'new')
				console.log(newAnswers)
				newAnswers.forEach(async (ans) => {
					try {
						await saveAnswer(ans).then((zxc) => {
							console.log("SAVED ANSWER", zxc)
						})
					} catch (err) {
						console.log({ error: err })
					}
				})
			} else {
				console.log({ error: data })
			}
		})
	} else {
		console.log("NOT CREATE MOD")
		await updateQeustion(state.value).then(async (data) => {
			if (data) {
				const newAnswers = answers.value.filter(item => {
					if (item.questionId === props.question.id && (item?.type === 'new' || !item?.type)) return item
				})?.map(item => {
					return {
						...item,
						questionId: props.question.id,
						id: undefined,
						type: undefined
					}
				})
				const updatedAnswers = answers.value.filter(item => {
					if (item.questionId === props.question.id && item?.type === 'change') return item
				})?.map(item => {
					return {
						...item,
						change: undefined
					}
				})
				newAnswers.forEach(async (ans) => {
					try {
						await saveAnswer(ans).then((zxc) => {
							console.log("SAVED ANSWER", zxc)
						})
					} catch (err) {
						console.log({ error: err })
					}
				})
				updatedAnswers.forEach(async (ans) => {
					try {
						await updateAnswer(ans).then((zxc) => {
							console.log("SAVED ANSWER", zxc)
						})
					} catch (err) {
						console.log({ err })
					}
				})
			} else {
				console.log({ error: data })
			}
		})
	}
}
// onMounted(() => {
// 	if (props.question) {
// 		state.value = props.question
// 	}
// })

watch(
	() => props.question,
	() => {
		if (props.question) state.value = { ...props.question }
	},
	{
		immediate: true,
	}
)
watch(
	() => state.value.valueWord,
	() => {
		state.value.valueChars = state.value.valueWord.split("")
		console.log(state.value.value)
		for (let i = 0; i < state.value.meta.value?.length; i++) {
			state.value.meta.value[i].answer = state.value.valueChars[i]
		}
	}
)
onUnmounted(() => {
	state.value = {
		id: null,
		meta: {
			comment: null,
			easy: false,
			image: null,
			imageComment: null,
			title: null,
		},
		type: "DEFAULT",
		questions: [],
	}
})
</script>

<style lang="scss" scoped>
// .rs-image{
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   aspect-ratio: 16/9;
// }
</style>
