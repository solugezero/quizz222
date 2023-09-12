<script setup>
import { answerCreate, answersGet, questionUpdate,questionImageUpload, questionsGet, answerUpdate, questionDelete } from '~/api';
    const store = useMainStore();
    const { currentQuestionNumber, currentQuestion, currentPoints, totalGameTime, gameStarted, isSuperGame } = storeToRefs(store);
    const api = import.meta.env.VITE_API;

    const characters = ref([
        {
            value: 0,
            name: 'Незнайка',
            image: 'незнайка.png',
            text: 'По результатам квиза в русском языке ты «Незнайка». Ты - веселый человечек, но русский подтянуть нужно!'
        },
        {
            value: 1,
            name: 'Незнайка',
            image: 'незнайка.png',
            text: 'По результатам квиза в русском языке ты «Незнайка». Ты - веселый человечек, но русский подтянуть нужно!'
        },
        {
            value: 2,
            name: 'Незнайка',
            image: 'незнайка.png',
            text: 'По результатам квиза в русском языке ты «Незнайка». Ты - веселый человечек, но русский подтянуть нужно!'
        },
        {
            value: 3,
            name: 'Вовка',
            image: 'вовка.png',
            text: 'По результатам квиза в русском языке ты «Вовка в Тридевятом царстве». Твой девиз в русском языке: «И так сойдет!»'
        },
        {
            value: 4,
            name: 'Змей Горыныч',
            image: 'горыныч.png',
            text: 'По результатам квиза в русском языке ты «Третья голова Змея горыныча» - Эх читать бы побольше.'
        },
        {
            value: 5,
            name: 'Змей Горыныч',
            image: 'горыныч.png',
            text: 'По результатам квиза в русском языке ты «Третья голова Змея горыныча» - Эх читать бы побольше.'
        },
        {
            value: 6,
            name: 'Алеша Попович',
            image: 'попович.png',
            text: 'По результатам квиза в русском языке ты «Алеша Попович». Русский язык не твой конек. Твой конек - Юлий.'
        },
        {
            value: 7,
            name: 'Алеша Попович',
            image: 'попович.png',
            text: 'По результатам квиза в русском языке ты «Алеша Попович». Русский язык не твой конек. Твой конек - Юлий.'
        },
        {
            value: 8,
            name: 'Серый волк',
            image: 'серый волк.png',
            text: 'По результатам квиза в русском языке ты «Серый волк» - неожиданно, но ты хорошо знаешь русский язык.'
        },
        {
            value: 9,
            name: 'Алеша Попович',
            image: 'попович.png',
            text: 'По результатам квиза в русском языке ты «Алеша Попович». Русский язык не твой конек. Твой конек - Юлий.'
        },
        {
            value: 10,
            name: 'Баба Яга',
            image: 'баба яга.png',
            text: 'По результатам квиза в русском языке ты «Баба Яга». Русский язык для тебя не чужд.'
        },
        {
            value: 11,
            name: 'Илья Муромец',
            image: 'илья муромец.png',
            text: 'По результатам квиза в русском языке ты «Илья Муромец» - у тебя богатырский русский язык!'
        },
        {
            value: 12,
            name: 'Волк',
            image: 'волк ну погоди.png',
            text: 'По результатам квиза в русском языке ты «Волк из «Ну, погоди!»» - есть куда стремиться.'
        },
        {
            value: 13,
            name: 'Юлий',
            image: 'юлий.png',
            text: 'По результатам квиза в русском языке ты «Юлий» - любишь красиво и много поболтать про русский язык'
        },
        {
            value: 14,
            name: 'Заяц',
            image: 'заяц ну погоди.png',
            text: 'По результатам квиза в русском языке ты «Заяц из «Ну, погоди!»» - ты умен не по годам.'
        },
        {
            value: 15,
            name: 'Кот ученый',
            image: 'кот ученый.png',
            text: 'По результатам квиза в русском языке ты «Кот ученый» - сразу видно, что ты все знаешь!'
        },
    ]);

    const router = useRouter();

    const goToStart = () => {
        currentQuestionNumber.value = 1;
        totalGameTime.value = 0;
        currentQuestion.value = null;
        router.push('/');
        gameStarted.value = false;
        currentPoints.value = 0;
    }

    const character = computed(() => characters.value.find(v => v.value === currentPoints.value));

    const startCapture = async() => {
        console.log(1234)
        await html2canvas(document.body).then(function(canvas) {
            document.body.appendChild(canvas);
        });
        let image = ''
        await html2canvas(document.body).then(function(canvas) {
            image = canvas.toDataURL()
        });
        var ab = new ArrayBuffer(image.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < image.length; i++) {
            ia[i] = image.charCodeAt(i);
        }
        var imageBlob = new Blob([ab], { type: 'image/png' })
        const formData = new FormData();
        formData.append('File', imageBlob, 'screenshot.jpg')
        const img = await questionImageUpload('screenshot-', formData, true);
        const imagePath = `${api}/${img}`

        window.open(`http://vk.com/share.php?url=${encodeURIComponent('https://рускод.рф/')}&image=${encodeURIComponent(imagePath)}`, '_blank');

        onMounted(() => {
            document.getElementById('vk_share_button').innerHTML = VK.Share.button('http://mysite.com', {type: 'link'});
        })
    }
</script>
<template>
    <div class="final h-screen">
        <a href="https://kantiana.ru" target="_blank" class="z-1000 fixed top-36px lt-lg:top-unset lt-lg:bottom-20px lt-lg:w-185px lt-lg:h-25px lt-lg:z-100 lt-lg:left-50% lt-lg:-translate-50% right-36px hover:scale-100">
            <img src="/img/bfu-white.svg" class="color-white" >
        </a>
        <div class="flex lt-lg:flex-col-reverse h-full w-full">
            <div class="w-50% lt-lg:w-full lt-xxxl:w-55% lt-xxxl:h-full relative">
                <img :src="`/img/finals/${character.image}`" class="h-full lt-lg:w-full object-contain lt-xxxl:object-cover scale-110 lt-xxxl:scale-101 absolute right-0 top-0 bottom-0">
            </div>
            <div class="w-50% lt-lg:w-full! lt-lg:justify-end lt-lg:pb-50px lt-lg:px-30px! lt-xxxl:w-45% flex flex-col justify-center h-full pl-200px lt-xxxl:pl-80px pr-100px lt-sm:px-10px relative lt-sm:z-10 lt-sm:mt-100px">
                <p class="font-500 text-40px lt-lg:text-30px lt-xxxl:text-22px lt-sm:text-20px leading-140% text-white">Ты набрал(-а) {{ currentPoints  }} из 15</p>
                <p class="font-400 text-32px lt-lg:w-414px lt-xxxl:text-18px lt-sm:text-16px leading-140% text-white mt-21px lt-sm:w-full!">{{ character.text }}</p>
                <div class="flex items-center mt-70px lt-xxxl:mt-32px gap-x-25px lt-sm:gap-x-12px">
                    <button @click="goToStart" class="p-22px bg-#fff w-322px lt-xxxl:w-260px lt-sm:w-176px lt-sm:p-10px lt-xxxl:p-12px q-shadow-sm__green">
                        <p class="font-500 leading-28px lt-lg:leading-26px lt-sm:leading-18px text-20px lt-xxxl:text-14px lt-lg:text-18px lt-sm:text-14px">Начать заново</p>
                    </button>
                    <a :href="`http://vkontakte.ru/share.php?url=http://рускод.рф/&image=https://api.xn--d1almgfl.xn--p1ai/end_${currentPoints}.png&title=Я ${character.name}`" target="_blank" class="p-22px bg-white flex items-center justify-center q-shadow-sm__green lt-sm:p-10px lt-xxxl:p-12px ">
                        <IconShare class="w-28px h-28px lt-lg:w-26px lt-lg:h-26px lt-sm:w-18px lt-sm:h-18px" />
                    </a>
                </div>
            </div>
        </div>
        <p class="spell fixed bottom-[-60px] left-50% text-white text-217px lt-xxxl:text-158px leading-140% pointer-events-none lt-sm:hidden">{{ character.name }}</p>
    </div>
</template>
<style lang="scss" scoped>
    .final {
        background-color: #49CE84;
        background-image: url('/final-bg.svg');
        background-size: cover;
    }

    .spell {
        font-family: 'Snell';
        transform: translateX(-50%) rotate(-2deg);
        white-space: nowrap;
    }
</style>