<script setup>
    const store = useMainStore();
    const { currentQuestionNumber, currentQuestion, currentPoints, totalGameTime, isSuperGame, gameStarted } = storeToRefs(store);

    const texts = ref([
        'Время тю-тю',
        'Время на вопрос кончилось!',
        '«Финита ля комедия!»',
        'Время вышло, кончилось, истекло, пролетело',
    ]);

    const router = useRouter();

    const goToStart = () => {
        currentQuestionNumber.value = 1;
        totalGameTime.value = 0;
        currentQuestion.value = null;
        router.push('/');
        isSuperGame.value = false;
        gameStarted.value = false;
        currentPoints.value = 0;
    }

    const text = computed(() => {
        const index = Math.floor(Math.random() * texts.value.length);
        return texts[index];
    })
</script>
<template>
    <div class="final h-screen">
		<a href="https://kantiana.ru" target="_blank">
            <img src="/img/bfu-white.svg" class="fixed top-36px right-36px color-white" >
        </a>
        <div class="absolute bottom-0 left-50% translate-x-[-50%]">
            <img :src="`/img/characters/pushkin 5.png`" class="min-w-740px lt-xxxl:min-w-460px lt-xxxl:w-460px lt-lg:min-w-600px absolute bottom-0 left-[-130px] lt-lg:left-[-140px] lt-xxxl:left-0 z-1" >
            <div class="w-600px  lt-sm:w-284px  lt-lg:w-420px flex flex-col p-42px lt-lg:p-24px bg-white q-shadow-md__light-green relative z-2 mb-142px">
                <img :src="`/img/characters/pushkin_hand.png`" class="min-w-152px w-152px absolute right-[-3px] z-3 top-[calc(-100%)]" >
                <p class="font-500 text-36px lt-lg:text-30px lt-xxxl:text-22px leading-130% text-black">{{ Math.random() > 0.5 ? 'Время тю-тю!' : 'Ой, ой! Время вышло!' }}</p>
                <p class="font-400 text-26px lt-xxxl:text-18px leading-130% text-black mt-24px lt-lg:mt-18px lt-lg:w-366px">Не расстраивайся, ты можешь пройти квиз заново и проверить свои знания</p>
                <button @click="goToStart" class="p-22px lt-xxxl:p-12px bg-#71CB8A w-350px lt-xxxl:w-230px mt-32px lt-lg:mt-26px q-shadow-sm__lightest-green">
                    <p class="font-500 leading-26px text-20px lt-lg:text-18px lt-xxxl:text-14px text-white">Начать заново</p>
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .final {
        background-color:  #1E2947;
        background-image: url('/img//time-bg.svg');
        background-size: cover;
    }

    .spell {
        font-family: 'Snell';
        transform: translateX(-50%) rotate(-2deg);
        white-space: nowrap;
    }
</style>