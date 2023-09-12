<script setup>
	import { gameGetQuestionAnswers } from '~/api'
	import lodash from 'lodash'

	const store = useMainStore()
	const { totalGameTime, superGameError, showSuperGameEnd, currentPoints, gameStarted, isSuperGame, easyMode, currentQuestionNumber, currentQuestion } = storeToRefs(store)
	const { counter, pause, resume, reset, isActive } = useInterval(1000, {
		controls: true,
	})
	pause()

	const router = useRouter()

	const resultCounter = ref(null)

	const startResultCount = () => {
		showSuperGameEnd.value = false
		showCountingModal.value = true
		setTimeout(() => {
			isSuperGame.value = false
			emits('answered', true)
			emits('timerReset')
		}, 20500)
	}

	const emits = defineEmits(['answered', 'timerStop', 'timerReset'])
	const props = defineProps({
		question: [Object],
		questionNumber: [Number],
		time: [Number],
	})
	const show = ref(true)
	const totalTime = ref(15)

	const draggableElement = ref(null)

	const dragStart = (item, index, ev, isClick = false) => {
		console.log(ev, item, index)
		const element = ev.target

		if (!ev.dataTransfer) {
			draggableElement.value = null
			draggableElement.value = {
				item,
				index,
			}
		} else {
			ev.dataTransfer.clearData()
			ev.dataTransfer.dropEffect = 'move'
			ev.dataTransfer.effectAllowed = 'move'
			ev.dataTransfer.setData('type', 'question_drag')
			ev.dataTransfer.setData('item', JSON.stringify(item))
			ev.dataTransfer.setData('index', JSON.stringify(index))
		}

		console.log(444, element, index)

		if (index === null || index === undefined) {
			if (isClick) {
				element.classList.add('clicked')
			} else {
				element.classList.add('hide')
			}
		}
	}

	const dragEnd = (id, ev) => {
		const element = ev.srcElement
		const index = positionAnswers.value.findIndex((v) => v && v.id === id)
		console.log('index', index)
		if (index === -1) {
			element.classList.remove('hide')
			element.classList.remove('over')
		}
	}

	const dragOver = (ev) => {
		const element = ev.srcElement
		element.classList.add('over')
	}

	const dragLeave = (ev) => {
		const element = ev.srcElement
		element.classList.remove('over')
	}

	const stickerDrag = (i, ev) => {
		console.log(i)
		let type = null
		if (ev.dataTransfer) {
			type = ev.dataTransfer.getData('type')
		} else if (draggableElement.value) {
			type = 'question_drag'
		}
		if (!type || type !== 'question_drag') {
			console.error('Unknown type')
			return
		}

		let index = null
		let item = null

		if (ev.dataTransfer) {
			item = JSON.parse(ev.dataTransfer.getData('item'))
			index = JSON.parse(ev.dataTransfer.getData('index'))
		} else if (draggableElement.value) {
			item = draggableElement.value.item
			index = draggableElement.value.index
		}
		console.log(index, positionAnswers.value[i])
		ev.target.classList.remove('over')
		console.log(ev)

		if (index !== null && index !== undefined) {
			const copy = lodash.cloneDeep(positionAnswers.value[i])
			if (copy !== undefined) {
				positionAnswers.value[index] = copy
			} else {
				positionAnswers.value[index] = null
			}
			positionAnswers.value[i] = item
			return
		}
		if (index === null && positionAnswers.value[i]) {
			return
		}
		positionAnswers.value[i] = item
		if (
			positionAnswers.value[0] !== null &&
			positionAnswers.value[0] !== undefined &&
			positionAnswers.value[1] !== null &&
			positionAnswers.value[1] !== undefined &&
			positionAnswers.value[2] !== null &&
			positionAnswers.value[2] !== undefined
		) {
			answerEmit(positionAnswers.value)
		}
	}

	const answers = ref([])
	const positionAnswers = ref([])

	const getAnswers = async () => {
		const result = await gameGetQuestionAnswers(props.question.id)
		if (!result.success) {
			return
		}

		answers.value = result.data
	}

	const openedLetterIndex = ref(0)

	const openRandomLetter = () => {
		if (totalGameTime.value - 10 < 0) {
			return
		}

		if (!props.question.meta.value[openedLetterIndex.value] || openedLetterIndex.value >= props.question.meta.value.length) {
			letterHandler()
			return
		}

		if (letterModel.value[openedLetterIndex.value]) {
			openedLetterIndex.value++
		}

		letterModel.value[openedLetterIndex.value] = props.question.meta.value[openedLetterIndex.value].answer
		totalGameTime.value -= 10
		openedLetterIndex.value++
		letterHandler()
	}

	const getAnswerById = (id) => {
		return answers.value.find((v) => v.id === id)
	}

	const letterModel = ref([])
	const revealLetters = ref(false)

	const selectedAnswer = ref(null)

	const showCountingModal = ref(false)

	const answerEmitting = ref(false)

	const answerEmit = async (answer) => {
		answerEmitting.value = true
		selectedAnswer.value = answer
		emits('timerStop')
		await getAnswers()
		if (answer && !Array.isArray(answer) && !getAnswerById(answer.id).isCorrect) {
			selectedAnswer.value.wrong = true
			setTimeout(() => {
				emits('answered', false)
			}, 2000)
			answerEmitting.value = false
			return
		}

		if (answer && Array.isArray(answer)) {
			let correct = true
			answers.value.forEach((v) => {
				const a = answer.findIndex((t) => t.id === v.id)
				if (a === -1 || v.correctPos !== a + 1) {
					correct = false
				}
			})
			setTimeout(() => {
				emits('answered', correct)
			}, 2000)
			answerEmitting.value = false
			return
		}

		setTimeout(() => {
			emits('answered', true)
		}, 2000)
		answerEmitting.value = false
	}

	const letterHandler = (el, index) => {
		let correct = true
		props.question.meta.value.forEach((v, index) => {
			if (!letterModel.value[index] || (letterModel.value[index] && v.answer.toLowerCase() !== letterModel.value[index].toLowerCase())) {
				correct = false
			}
		})
		superGameError.value = !correct
		let finished = true
		props.question.meta.value.forEach((v, index) => {
			if (!letterModel.value[index]) {
				finished = false
			} else {
				finished = true
			}
		})
		if (finished) {
			if (correct) {
				currentPoints.value += 5
			}
			emits('timerStop')
			revealLetters.value = true
			showSuperGameEnd.value = true
		} else if (el && el.target && letterModel.value[index]) {
			el.target.blur()
			if (props.question.meta.easy) {
				el.target.parentElement.parentElement.parentElement.children[index + 1].children[0].children[0].focus()
			} else {
				el.target.parentElement.parentElement.parentElement.children[index + 1].children[1].children[0].focus()
			}
		}
	}

	const countingInfo = computed(() => {
		return Math.random() > 0.5
			? {
					image: '/img/characters/belinsky.png',
					text: 'Наша игра призвана популяризировать русский язык, как культурный феномен, ведь как говорил Виссарион Белинский: «Русский язык — один из богатейших языков в мире, в этом нет никакого сомнения»',
			  }
			: {
					image: '/img/characters/gorky.png',
					text: 'Наша игра призвана популяризировать русский язык, как культурный феномен, ведь как говорил Максим Горький: «Русский язык неисчерпаемо богат,и всё обогащается  с поражающей быстротой»',
			  }
	})

	const goToStart = () => {
		currentQuestionNumber.value = 1
		totalGameTime.value = 0
		currentQuestion.value = null
		router.push('/')
		gameStarted.value = false
		currentPoints.value = 0
	}
</script>
<template>
	<div class="flex flex-col w-screen items-center max-h-90vh relative z-1">
		<div
			v-if="question.meta && !question.meta.easy"
			class="flex items-center gap-x-9px scale-90 sm:hidden w-100%"
			:class="{ 'pointer-events-none!': answerEmitting }"
		>
			<div class="timer bg-white lt-xxxl:h-55px! lt-xxxl:max-w-310px q-shadow-sm lt-xxxl:p-10px!">
				<img
					class="w-24px h-24px lt-xxxl:w-18px lt-xxxl:h-18px"
					src="/img/clock.png"
					alt="таймер"
				/>
				<div class="time lt-xxxl:h-13px! lt-xxxl:w-220px! lt-xxxl:min-w-220px! bg-#D1EAD8!">
					<div
						v-if="question.type !== 'VALUE'"
						class="inner h-full bg-#71CB8A trs"
						:style="`width: ${100 - (100 * time) / totalTime}%`"
					></div>
					<div
						v-else
						class="inner h-full bg-#71CB8A trs"
						:style="`width: ${100 - (100 * time) / totalGameTime}%`"
					></div>
				</div>
				<!-- TODO: more font -->
				<p
					class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end"
					v-if="question.type !== 'VALUE'"
				>
					{{ totalTime - time }}
				</p>
				<p
					class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end"
					v-else
				>
					{{ totalGameTime - time }}
				</p>
			</div>
			<div class="flex-1"></div>
			<div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
				<p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
				<p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
			</div>
			<template v-if="!question.meta && !question.meta.easy">
				<div
					v-if="question.type !== 'VALUE'"
					class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm"
				>
					<p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">+{{ totalGameTime }}</p>
					<p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">доп.сек</p>
				</div>
			</template>
		</div>
		<div
			v-if="question.meta && question.meta.easy"
			class="flex items-center gap-x-9px scale-90 sm:hidden w-full"
			:class="{ 'pointer-events-none!': answerEmitting }"
		>
			<div
				@click="goToStart"
				class="timer bg-white lt-xxxl:h-55px! w-unset! q-shadow-sm p-25px! w-98px! h-82px! px-12px! cursor-pointer"
			>
				<img
					src="/img/logo.svg"
					class="w-46px h-30px"
				/>
			</div>
			<div class="flex-1"></div>
			<div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
				<p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
				<p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
			</div>
			<template v-if="!question.meta && !question.meta.easy">
				<div
					v-if="question.type !== 'VALUE'"
					class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm"
				>
					<p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">+{{ totalGameTime }}</p>
					<p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">доп.сек</p>
				</div>
			</template>
		</div>
		<div
			class="card p-42px lt-xxxl:p-33px pb-48px w-770px lt-xxxl:w-610px lt-xxl:scale-90 lg:scale-100! max-h-[calc(100vh-50px)] scroll-y max-w-full lt-sm:-mt-20px"
			:class="[
				{ 'w-1120px! max-w-1120px! lt-lg:max-w-700px! lt-sm:max-w-full!': question.type === 'POSITION' },
				{ 'q-shadow-md__light-green': question.type === 'VALUE' },
				{ 'q-shadow-md': question.type !== 'VALUE' },
				{ 'pointer-events-none!': answerEmitting },
			]"
		>
			<div
				v-if="question.meta && !question.meta.easy"
				class="flex items-center gap-x-9px lt-sm:hidden"
			>
				<div class="timer bg-white lt-xxxl:h-55px! lt-xxxl:max-w-310px q-shadow-sm lt-xxxl:p-10px!">
					<img
						class="w-24px h-24px lt-xxxl:w-18px lt-xxxl:h-18px"
						src="/img/clock.png"
						alt="таймер"
					/>
					<div class="time lt-xxxl:h-13px! lt-xxxl:w-220px! lt-xxxl:min-w-220px! bg-#D1EAD8!">
						<div
							v-if="question.type !== 'VALUE'"
							class="inner h-full bg-#71CB8A trs"
							:style="`width: ${100 - (100 * time) / totalTime}%`"
						></div>
						<div
							v-else
							class="inner h-full bg-#71CB8A trs"
							:style="`width: ${100 - (100 * time) / totalGameTime}%`"
						></div>
					</div>
					<!-- TODO: more font -->
					<p
						class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end"
						v-if="question.type !== 'VALUE'"
					>
						{{ totalTime - time }}
					</p>
					<p
						class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end"
						v-else
					>
						{{ totalGameTime - time }}
					</p>
				</div>
				<div class="flex-1"></div>
				<div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
					<p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
					<p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
				</div>
				<template v-if="!question.meta && !question.meta.easy">
					<div
						v-if="question.type !== 'VALUE'"
						class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm"
					>
						<p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">+{{ totalGameTime }}</p>
						<p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">доп.сек</p>
					</div>
				</template>
			</div>
			<div
				v-if="question.meta && question.meta.easy"
				class="flex items-center gap-x-9px lt-sm:hidden"
			>
				<div
					@click="goToStart"
					class="timer bg-white lt-xxxl:h-55px! q-shadow-sm p-25px! max-w-98px! h-82px! cursor-pointer"
				>
					<img
						src="/img/logo.svg"
						class="w-46px h-30px"
					/>
				</div>
				<div class="flex-1"></div>
				<div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
					<p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
					<p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
				</div>
			</div>
			<div class="">
				<template v-if="question.meta">
					<div class="flex flex-col mt-42px mb-38px lt-xxxl:mb-22px lt-sm:mt-0!">
						<p
							v-if="question.type !== 'VALUE'"
							class="font-500 text-18px lt-xxxl:text-14px text-#A5A9B5"
						>
							{{ questionNumber }} вопрос из 10
						</p>
						<p
							v-else
							class="font-500 text-18px lt-xxxl:text-14px text-#A5A9B5"
						>
							Суперигра
						</p>
						<p
							v-html="question.meta.title"
							class="text-40px lt-xxxl:text-28px font-700 leading-130% mt-16px"
						></p>
						<div class="relative">
							<img
								v-if="question.meta.image && question.type !== 'POSITION'"
								class="w-full h-256px lt-xxxl:h-200px object-cover q-shadow-sm mt-24px"
								:src="`https://api.рускод.рф/${question.meta.image}`"
							/>
							<p
								class="absolute bottom-14px lt-sm:left-8px lt-sm:bottom-8px lt-sm:right-unset right-14px text-white text-14px lt-sm:text-8px leading-130%"
								v-if="question.meta.imageComment"
							>
								{{ question.meta.imageComment }}
							</p>
						</div>
						<p
							v-if="question.meta.comment"
							v-html="question.meta.comment"
							class="font-500 text-26px lt-xxxl:text-22px leading-130% text-#1E2947 mt-42px lt-xxxl:mt-32px"
						></p>
						<p
							v-else
							class="font-500 text-26px lt-xxxl:text-22px leading-130% text-#1E2947 mt-28px lg:hidden"
						>
							Выберите ответ
						</p>
					</div>
					<!-- TODO: переносы -->
					<div
						v-if="question.type === 'DEFAULT'"
						class="flex flex-wrap gap-16px"
						:class="{ 'mt-22px!': question.meta && question.meta.comment }"
					>
						<div
							v-for="answer in question.answers"
							@click="answerEmit(answer)"
							class="q-answer q-shadow-sm flex items-center justify-center max-h-70px lt-xxxl:max-h-56px overflow-hidden lt-md:w-full!"
							:class="[
								{ 'correct q-shadow-sm__green': getAnswerById(answer.id) && getAnswerById(answer.id).isCorrect },
								{ 'wrong q-shadow-sm__red': selectedAnswer && answer.id === selectedAnswer.id && selectedAnswer.wrong },
							]"
						>
							<p
								v-html="answer.meta.title"
								class="text-20px lt-xxxl:text-14px leading-130% text-center py-22px p-18px"
							></p>
						</div>
					</div>
					<div
						v-else-if="question.type === 'VALUE'"
						class=""
					>
						<p class="font-500 text-26px lt-xxxl:text-22px leading-34px">Шифр:</p>
						<div class="flex items-start gap-12px mt-10px lt-sm:flex-wrap">
							<div
								class="flex flex-col items-center gap-y-8px"
								v-for="(letter, index) in question.meta.value"
							>
								<p
									v-if="!question.meta.easy"
									class="font-500 text-26px lt-xxxl:text-22px leading-34px"
								>
									{{ letter.question }}
								</p>
								<div
									class="h-66px lt-xxxl:h-55px w-66px lt-xxxl:w-55px flex items-center border-1px border-dashed border-#1E2947 text-#1E2947"
									:class="[
										{ 'correct q-shadow-sm__green': revealLetters && letterModel[index] === letter.answer },
										{ 'wrong q-shadow-sm__red': revealLetters && letterModel[index] !== letter.answer },
									]"
								>
									<input
										class="h-full w-full text-center text-26px lt-xxxl:text-22px font-100 placeholder:text-#787F91 uppercase hover:placeholder:text-#fff focus:placeholder:text-#fff"
										maxlength="1"
										v-model="letterModel[index]"
										placeholder="+"
										@input="letterHandler($event, index)"
									/>
								</div>
							</div>
						</div>
						<template v-if="question.meta && !question.meta.easy">
							<button
								v-if="totalGameTime - 10 > 0"
								@click="openRandomLetter"
								class="flex items-center p-12px gap-x-12px border-1px border-#D1EAD8 mt-38px lt-xxxl:mt-22px bg-white"
							>
								<p class="text-#1E2947 text-16px leading-20px font-500">Открыть букву</p>
								<div class="bg-#FFEAE7 w-82px h-32px flex items-center justify-center text-#C01E00">
									<p class="font-700 text-15px leading-20px">-10 сек</p>
								</div>
							</button>
						</template>
					</div>
					<div
						v-else-if="question.type === 'POSITION'"
						class="flex flex-col lt-lg:flex-row flex-wrap lt-lg:gap-x-8px lt-sm:w-full"
					>
						<div class="flex flex-wrap gap-16px lt-lg:flex-col lt-lg:w-[calc(100%/2-4px)]">
							<div
								v-for="(position, index) in question.meta.positions"
								class="bg-white q-answer q-shadow-sm w-[calc(100%/3-12px)]! lt-lg:w-full! lt-sm:max-h-73.3px flex items-center"
							>
								<p class="text-20px lt-xxxl:text-18px lt-sm:text-14px leading-26px text-center py-22px p-18px lt-sm:px-12px my-auto w-full pointer-events-none">
									{{ position.title }}
								</p>
							</div>
						</div>
						<div class="flex flex-wrap gap-16px mt-18px lt-lg:mt-0 lt-lg:flex-col lt-lg:w-[calc(100%/2-4px)]">
							<div
								class="bg-white border-1px border-dashed border-#1E2947 h-74px min-h-74px lt-xxxl:max-h-56px w-[calc(100%/3-12px)]! lt-lg:w-full! cursor-grab! flex items-center justify-center"
								:class="[
									{ 'q-answer q-shadow-sm': positionAnswers[zone - 1] },
									{
										'correct q-shadow-sm__green':
											positionAnswers[zone - 1] && getAnswerById(positionAnswers[zone - 1].id) && getAnswerById(positionAnswers[zone - 1].id).correctPos === zone,
									},
									{
										'wrong q-shadow-sm__red':
											positionAnswers[zone - 1] && getAnswerById(positionAnswers[zone - 1].id) && getAnswerById(positionAnswers[zone - 1].id).correctPos !== zone,
									},
								]"
								v-for="zone in 3"
								@dragover.prevent="dragOver"
								@dragleave="dragLeave"
								@drop="stickerDrag(zone - 1, $event)"
								draggable="true"
								@dragstart="dragStart(positionAnswers[zone - 1], zone - 1, $event)"
								@click="stickerDrag(zone - 1, $event)"
							>
								<p class="text-20px lt-xxxl:text-18px leading-23px text-center pointer-events-none">
									{{ positionAnswers[zone - 1] ? positionAnswers[zone - 1].meta.title : '' }}
								</p>
							</div>
						</div>
						<div class="flex flex-wrap gap-16px lt-lg:gap-6px mt-18px w-full">
							<div
								class="bg-white q-answer w-[calc(100%/3-12px)]! lt-lg:w-[calc(100%/2-3px)]! hover:scale-100! lt-lg:border-none cursor-grab"
								v-for="(answer, index) in question.answers"
								draggable="true"
								@dragend="dragEnd(answer.id, $event)"
								@dragstart="dragStart(answer, null, $event)"
								@click.self="dragStart(answer, null, $event, true)"
							>
								<div class="flex items-center justify-center py-22px p-18px pointer-events-none">
									<IconDrag class="lt-lg:w-4px lt-lg:h-10px" />
									<p class="text-20px lt-xxxl:text-18px leading-130% text-center ml-10px">{{ answer.meta.title }}</p>
								</div>
							</div>
						</div>
					</div>
				</template>
			</div>
			<TheModalBottom v-model="showSuperGameEnd">
				<div class="absolute bottom-0 left-50% translate-x-[-50%] z-1010101001">
					<img
						class="absolute right-[-35%] lt-lg:right-[-15%] lt-lg:bottom-50% bottom-0 z-1 w-700px lt-lg:w-500px"
						src="/img/characters/pushkin-bg.png"
					/>
					<div
						class="flex lt-sm:flex-col h-full lt-lg:max-h-166px! lt-sm:max-h-310px! lt-lg:min-h-166px items-center justify-between p-55px lt-lg:p-36px! gap-x-44px w-886px max-w-screen! lt-lg:w-672px min-h-223px relative z-2"
						:class="[{ 'bg-#D1EAD8': !superGameError }, { 'bg-#FFEAE7': superGameError }]"
					>
						<div class="">
							<p
								class="text-#08882C font-500 text-36px lt-lg:text-30px leading-130%"
								:class="{ 'text-#C01E00': superGameError }"
							>
								{{ !superGameError ? 'Красавчик!' : 'Правильный ответ:' }}
							</p>
							<p
								v-if="question.meta && question.meta.comment"
								class="text-26px leading-130% mt-18px lt-lg:text-18px lt-lg:mt-11px"
							>
								{{ question.meta.comment }}
							</p>
						</div>
						<button
							@click="startResultCount"
							class="p-22px w-332px lt-xxxl:w-270px lt-sm:w-186px lt-sm:p-10px lt-xxxl:p-16px text-center lt-sm:mt-24px lt-sm:max-w-178px lt-sm:h-40px flex items-center"
							:class="[
								{ 'bg-white q-shadow-sm__light-green text-#08882C border-1px border-#08882C': !superGameError },
								{ 'bg-#FFEAE7! q-shadow-sm__red text-#C01E00 border-1px border-#C01E00': superGameError },
							]"
						>
							<p class="font-500 text-20px leading-26px lt-sm:text-14px w-full">Узнать результаты</p>
						</button>
					</div>
				</div>
			</TheModalBottom>
			<TheModalBottom v-model="showCountingModal">
				<div class="flex w-screen justify-center items-end">
					<img
						class="w-700px lt-lg:w-600px lt-lg:ml-[-130px] lt-xxxl:w-500px object-contain"
						:src="countingInfo.image"
					/>
					<div
						class="relative bg-white p-42px lt-lg:p-24px w-760px lt-xxxl:w-568px lt-lg:max-w-500px min-h-420px lt-lg:min-h-350px q-shadow-md__light-green mb-300px -ml-150px lt-lg:ml-[-280px] lt-lg:mb-450px lt-sm:scale-85 lt-sm:mb-300px lt-sm:min-h-fit"
					>
						<p class="font-500 text-36px lt-lg:text-30px lt-xxxl:text-28px lt-sm:text-20px leading-130%">
							Пару минут, мы считаем результаты<span class="lg:hidden">, а пока почитай, для чего мы сделали этот квиз</span>
						</p>
						<p class="text-26px lt-xxxl:text-22px lt-lg:text-18px lt-sm:text-14px leading-130% mt-32px lt-lg:mt-18px">{{ countingInfo.text }}</p>

						<div class="count-time bg-#D1EAD8!">
							<div class="inner h-full bg-#71CB8A"></div>
						</div>
					</div>
					<a
						href="https://kantiana.ru"
						target="_blank"
					>
						<img
							src="/img/bfu-white.svg"
							class="fixed bottom-40px left-50% translate-x-[-50%] color-white z-100"
						/>
					</a>
				</div>
			</TheModalBottom>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.card {
		background-color: #fbfbfb;
	}
	.time {
		background-color: #71cb8a;
		min-width: 260px;
		max-width: 260px;
		width: 260px;
		height: 14px;
		clip-path: polygon(
			0% 4px,
			4px 4px,
			4px 0%,
			calc(100% - 4px) 0%,
			calc(100% - 4px) 4px,
			100% 4px,
			100% calc(100% - 4px),
			calc(100% - 4px) calc(100% - 4px),
			calc(100% - 4px) 100%,
			4px 100%,
			4px calc(100% - 4px),
			0% calc(100% - 4px)
		);

		.inner {
			transition: all 0.05s;
		}
	}
	.timer {
		display: flex;
		gap: 4px;
		align-items: center;
		justify-content: space-between;
		padding: 25.5px 24px;
		width: 385px;
		@apply lt-sm:w-285px;
		height: 72px;
		border: 2px solid #c9c9c9;
	}

	.count-time {
		margin-top: 34px;
		background-color: #71cb8a;
		width: 100%;
		height: 14px;
		clip-path: polygon(
			0% 4px,
			4px 4px,
			4px 0%,
			calc(100% - 4px) 0%,
			calc(100% - 4px) 4px,
			100% 4px,
			100% calc(100% - 4px),
			calc(100% - 4px) calc(100% - 4px),
			calc(100% - 4px) 100%,
			4px 100%,
			4px calc(100% - 4px),
			0% calc(100% - 4px)
		);
		.inner {
			animation: loading 20s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
		}
	}

	@keyframes loading {
		0% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}

	.hide {
		opacity: 0;
	}

	.over {
		@apply bg-#DFDEE24D border-none;
	}

	.clicked {
		@apply opacity-50 pointer-events-none;
		box-shadow: 2px 2px 0 #000;
	}
</style>
