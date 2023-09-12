<script setup>
	const store = useMainStore()
	const {totalGameTime, superGameError, showSuperGameEnd, currentPoints, gameStarted, isSuperGame, easyMode} = storeToRefs(store)
	const emits = defineEmits(["submit"])
	const tips = computed(() =>
		easyMode.value
			? [
					{
						image: "chat",
						title: "11 вопросов",
						text: "В игре тебя ждут вопросы про русский язык и русскую культуру",
					},
					{
						image: "star",
						title: "1 балл",
						text: "Ты получишь за каждый правильный ответ",
					},
					{
						image: "win",
						title: "Суперигра",
						text: "Отвечай как можно быстрее — сэкономленное время пригодится <br>в суперигре",
					},
			  ]
			: [
					{
						image: "chat",
						title: "11 вопросов",
						text: "В игре тебя ждут вопросы про русский язык и русскую культуру",
					},
					{
						image: "clock",
						title: "15 секунд",
						text: "Время для ответа<br> на один вопрос",
					},
					{
						image: "star",
						title: "1 балл",
						text: "Ты получишь за каждый правильный ответ",
					},
					{
						image: "win",
						title: "Суперигра",
						text: "Отвечай как можно быстрее — сэкономленное время пригодится <br>в суперигре",
					},
			  ]
	)
</script>

<template>
	<div class="relative z-2 q-shadow-md__light-green p-48px lt-xxxl:p-32px lt-lg:p-46px! lt-md:p-24px! bg-#F4F4F4 lt-lg:bg-white w-fit max-w-[calc(100vw-40px)] xxl:max-w-1153px xl:max-w-932px lt-xl:max-w-932px lt-lg:max-w-503px max-w-screen lt-sm:w-screen lt-sm:scale-80 lt-sm:-mt-30px lt-lg:shadow-none" :class="{'-mt-65px!': !easyMode}">
		<p class="font-700 xxxl:text-42px lt-xxxl:text-28px lt-xxl:text-22px lt-xl:text-22px lt-lg:text-30px leading-130% text-#1E2947 text-center mb-32px">Правила игры</p>
		<div class="flex lt-lg:flex-col items-center gap-x-32px lt-lg:gap-y-22px lt-xxxl:gap-x-24px">
			<div v-for="(tip, index) in tips" :key="index" class="q-shadow-sm__gray p-24px lt-xxxl:p-16px lt-lg:p-10px flex flex-col items-start gap-y-12px w-282px h-282px bg-white lt-lg:w-full lt-xxxl:w-200px lt-xxxl:h-200px lt-lg:h-unset lt-lg:flex-row lt-lg:gap-x-24px lt-lg:shadow-none">
				<div class="xxxl:w-62px xxxl:h-62px lt-xxxl:w-52px xxl:h-52px lt-xxl:w-42px lt-xxl:h-42px lt-xl:w-48px lt-xl:h-48x lt-xl:min-w-48px lt-xl:min-h-48x bg-#F4F4F4 color-#49CE84 lt-lg:color-#1E2947 xxxl:p-18px lt-xxxl:p-16px lt-xxl:p-12px lt-lg:p-10px">
					<IconChat v-if="tip.image === 'chat'" class="w-full h-full" />
					<IconClock v-if="tip.image === 'clock'" class="w-full h-full" />
					<IconStar v-if="tip.image === 'star'" class="w-full h-full" />
					<IconWin v-if="tip.image === 'win'" class="w-full h-full" />
				</div>
				<div class="flex flex-col gap-y-12px lt-lg:gap-y-10px">
					<p class="font-500 text-#49CE84 xxxl:text-24px lt-xxxl:text-18px lt-xxl:text-14px lt-xl:text-14px lt-lg:text-22px leading-130% lt-lg:">{{ tip.title }}</p>
					<p v-html="tip.text" class="font-500 text-#1E2947/80 xxxl:text-16px lt-xxxl:text-12px lt-xl:text-12px lt-lg:text-18px leading-130%"></p>
				</div>
			</div>
		</div>
		<div class="flex justify-center mt-40px lt-lg:mt-28px">
			<button @click="emits('submit')" class="p-22px bg-#fff w-322px lt-xxxl:w-260px lt-sm:w-80% lt-sm:p-10px lt-xxxl:p-16px lt-lg:bg-#71CB8A border-1px border-#C9C9C9 q-shadow-sm__light-green lt-lg:shadow-none">
				<p class="xxxl:text-20px lt-xxxl:text-18px lt-xxl:text-14px lt-xl:text-14px leading-140% text-#1E2947 lt-lg:text-white lt-lg:text-20px">Понятное дело</p>
			</button>
		</div>
	</div>
	<img class="fixed z-3 right-10% lt-xxxl:right-10px lt-xxxl:bottom-[-40px] bottom-0 xxxl:w-440px lt-xxxl:w-400px lt-xxl:w-300px lt-xl:w-300px pointer-events-none lt-lg:right-[-30px] lt-sm:-right-60px lt-sm:scale-80" src="/img/characters/tolstoy.png" />
	<img class="fixed z-1 right-10% lt-xxxl:right-10px lt-xxxl:bottom-[-40px] bottom-0 xxxl:w-440px lt-xxxl:w-400px lt-xxl:w-300px lt-xl:w-300px" src="/img/single-glyph.svg" />
</template>
