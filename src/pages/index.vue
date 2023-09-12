<script setup>
    import { gameCreate, gameEnd, gameGetNextQuestion } from '~/api';
    const store = useMainStore();
    const { currentQuestionNumber, currentQuestion, currentPoints, totalGameTime, isSuperGame, superGameError, showSuperGameEnd, gameStarted, easyMode } = storeToRefs(store);


	useHead({
		title: "РУСКОД КВИЗ",
	});

    const question = ref(null)
    const showGuideModal = ref(false);
    const animationStart = ref(false);
    const showGagarin = ref(false);
    const questionNumber = ref(1);
	const showQuestion = ref(false);
    const questionAnswered = ref(false);

    const time = ref(0);
    const { counter, pause, resume, reset, isActive } = useInterval(1000, {
        controls: true,
    });
    pause();

    const createGame = async () => {
        const result = await gameCreate(easyMode.value);
        if (!result.success) {
            return;
        }

        localStorage.setItem('gameId', result.data.gameId);
		//setTimeout(() => {
        	currentQuestion.value = result.data.question;
			gameStarted.value = true;
            if (!result.data.question.easy) {
                reset();
                resume();
            }
			showQuestion.value = true;
			isSuperGame.value = false;
		//}, 500);
    }

    const endGame = async (time = false) => {
		if (time) {
			router.push('/time_out');
		}
		else {
			router.push('/end');
		}
		setTimeout(async () => {
			const gameId = localStorage.getItem('gameId');
			const result = await gameEnd(gameId);
			if (!result.success) {
				return;
			}
			currentQuestion.value = null;
			localStorage.removeItem('gameId');
			gameStarted.value = false;
			reset();
			pause();
		}, 1000)
    }

    const pauseTimer = () => {
        pause()
    }

    watch(
        counter,
        () => {
            if (easyMode.value) {
                return;
            }

            if (!isSuperGame.value && counter.value >= 15) {
                //endGame()
				//isSuperGame.value = true;
				router.push('/time_out', true);
            }

			if (isSuperGame.value && totalGameTime.value - counter.value <= 0) {
				endGame();
			}
        }
    )

	watch(
		totalGameTime,
		() => {
			if (totalGameTime.value <= 0) {
				endGame()
			}
		}
	)

	const router = useRouter();


    const getNextQuestion = async (correct = true) => {
        if (questionAnswered.value) {
            return;
        }

        questionAnswered.value = true;

		if (currentQuestion.value.type === 'DEFAULT' || currentQuestion.value.type === 'POSITION') {
			if (correct) {
				currentPoints.value += 1;
				totalGameTime.value += 15 - counter.value;
			}
			isSuperGame.value = false;
		}
        const gameId = localStorage.getItem('gameId');
		/* if (!correct) {
			endGame();
		} */
		showQuestion.value = false;
        const result = await gameGetNextQuestion(gameId);
        if (!result.success) {
        	questionAnswered.value = false;
            if (result.hint === 'game_ended') {
				reset();
				pause();
				endGame();
                //router.push('/end');
            }
            return;
        }
        currentQuestion.value = result.data.question;
		showQuestion.value = true;
        currentQuestionNumber.value++;
		if (currentQuestion.value.type === 'VALUE') {
			isSuperGame.value = true;
		}
        if (!result.data.question.easy) {
            reset();
            resume();
        }
        questionAnswered.value = false;
    }

    const startAnimations = () => {
        animationStart.value = true;
        setTimeout(() => {
            showGagarin.value = true;
        }, 800);
    }
</script>

<template>
    <div class="game-start bg-#fff h-full w-screen overflow-hidden flex items-center justify-center" :class="[{'bg-#71CB8A! game': gameStarted && currentQuestion && currentQuestion.type !== 'VALUE'}, { 'bg-#1E2947! bg-super': currentQuestion && currentQuestion.type === 'VALUE' }]">
		<!-- <button class="text-black fixed top-20px left-50% z-9999" @click="pause">pause</button>
		<button @click="getNextQuestion" class="text-black fixed top-20px left-60% z-9999">next question</button>
		 -->
		<a href="https://kantiana.ru" target="_blank">
        	<img v-if="!gameStarted" src="/img/bfu.svg" class="fixed bottom-40px left-50% translate-x-[-50%] lt-sm:w-150px" >
		</a>
        <div v-if="!gameStarted" class="flex flex-col max-w-1000px text-center items-center lt-xl:px-10% lt-sm:w-screen lt-sm:px-16px">
            <p class="font-700 xxxl:text-68px lt-sm:text-24px lt-xxxl:text-56px lt-xxl:text-46px lt-xl:text-42px leading-130% text-#1E2947 xxxl:w-988px lt-sm:w-full lt-xxxl:w-781px">
                Расшифруй русский код,<br> отвечая на вопросы
            </p>
            <p class="font-400 xxxl:w-1000px lt-sm:w-full lt-sm:text-16px lt-xxxl:w-800px lt-xxl:w-576px xxxl:text-34px lt-xxxl:text-28px lt-xxl:text-20px lt-xl:text-20px leading-130% text-#1E2947/80 mt-14px lt-xxxl:mt-32px">
                Русский Язык — код, в котором зашифрована мудрость веков истории России. Давай проверим,<br> насколько хорошо ты знаешь этот код!
            </p>
            <div class="flex lt-sm:flex-col items-center justify-center lt-xxl:mt-34px mt-72px gap-x-22px gap-y-14px">
                <button class="p-22px bg-#fff w-322px lt-xxxl:w-260px lt-sm:w-176px lt-sm:p-10px lt-xxxl:p-16px q-shadow-sm__light-green border-1px border-#C9C9C9" @click="easyMode = true; showGagarin = true;">
                    <p class="text-20px l t-xxxl:text-18px lt-sm:text-14px leading-26px text-black">Изи уровень</p>
                </button>
                <button class="p-22px bg-#fff w-322px lt-xxxl:w-260px lt-sm:w-176px lt-sm:p-10px lt-xxxl:p-16px q-shadow-sm border-1px border-#C9C9C9" @click="easyMode = false; showGagarin = true; ">
                    <p class="text-20px l t-xxxl:text-18px lt-sm:text-14px leading-26px text-black">Хард уровень</p>
                </button>
            </div>
        </div>

		<Transition name="fade">
			<div v-if="showGagarin && !showGuideModal && !gameStarted">
				<div class="fixed sm:hidden lt-sm:flex bottom-0 flex w-full left-0 right-0">
					<img class="xxxl:w-550px lt-sm:w-210px lt-xxxl:w-400px lt-xxl:w-380px lt-xl:w-380px lt-lg:w-478px" style="transform: scaleX(-1);" src="/img/characters/grozny-nobg.png">
					<div  class="absolute bottom-180px lt-md:bottom-80px right-100px flex lt-sm:flex-col items-center min-w-238px h-94px justify-between gap-y-7px py-10px px-20px relative border-2px border-#C9C9C9 bg-white ">
						<p class="font-500 xxxl:text-26px xxl:text-22px lt-xxl:text-16px lt-xl:text-16px leading-130%px">А как по-русски?</p>
						<button  :class="easyMode ? ['w-167px'] : ['w-176px']"  @click="showGuideModal = true; showGagarin = false" class="py-12px lt-md:py-4px lt-sm:h-40px xxxl:text-20px lt-xxl:text-14px lt-xl:text-14px bg-#71CB8A leading-140% q-shadow-sm__lightest-green text-white">{{ easyMode ? 'Не изи уровень, а легкий' : 'Не хард уровень, а сложный' }}</button>
					</div>
				</div>
				<div class="fixed left-40% lt-sm:hidden lt-sm:left-unset lt-sm:right-30px lt-sm:translate-x-unset lt-xxl:left-33% translate-x-[-50%] bottom-0 flex">
					<img class="xxxl:w-550px lt-sm:w-210px lt-xxxl:w-400px lt-xxl:w-380px lt-xl:w-380px lt-lg:w-478px" style="transform: scaleX(-1);" src="/img/characters/grozny-nobg.png">
					<div class="flex lt-sm:flex-col items-center justify-between gap-x-26px py-20px lt-lg:py-14px px-34px relative border-2px border-#C9C9C9 h-100px lt-lg:h-76px bg-white -ml-100px lt-sm:m-0! xxxl:min-w-570px lt-xxxl:min-w-520px lt-xxl:min-w-380px lt-xl:min-w-380px lt-lg:absolute lt-lg:bottom-330px lt-lg:ml-50% lt-lg:w-400px lt-lg:gap-x-0 lt-sm:max-w-230px! lt-sm:w-230px! lt-sm:min-w-230px!">
						<p class="font-500 xxxl:text-26px xxl:text-22px lt-xxl:text-16px lt-xl:text-18px leading-130%px">А как по-русски?</p>
						<button @click="showGuideModal = true; showGagarin = false" :class="easyMode ? ['w-320px'] : ['w-344px']" class="h-52px py-12px xxxl:text-18px lt-xxl:text-14px lt-xl:text-14px bg-#71CB8A w-260px lt-xxl:w-153px lt-lg:w-153px leading-140% q-shadow-sm__lightest-green text-white">{{ easyMode ? 'Не изи уровень, а легкий' : 'Не хард уровень, а сложный' }}</button>
					</div>
				</div>
			</div>
        </Transition>

		<Transition name="fade">
        	<GameQuestion v-if="showQuestion && currentQuestion" :question="currentQuestion" :time="counter" @answered="getNextQuestion($event)" :questionNumber="currentQuestionNumber" @timerStop="pauseTimer" @timerReset="reset" />
		</Transition>
        <TheModal v-model="showGuideModal">
            <GameGuideModal @submit="showGuideModal = false; createGame()" />
        </TheModal>
    </div>
</template>

<style lang="scss" scoped>
    .game-start {
        background-image: url('/img/game-bg-start.svg');
        background-size: cover;
    }
    .game {
        background-image: url('/img/game-bg.svg');
        background-size: cover;
    }

    

.to-red {
    animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;    
    background-color: #FFEAE7;
    box-shadow: 4px 4px 0 #C01E00;
    border-color: #C01E00 !important;

    p {
        color: #C01E00 !important;
    }
}

.bg-super {
	background-image: url('/img/bg-super.svg');
	background-size: cover;
}

@keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
            transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
            transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
            transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
            transform: translateX(-8px);
  }
}
</style>