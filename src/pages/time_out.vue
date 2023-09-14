<script setup>
	const store = useMainStore()
	const { currentQuestionNumber, currentQuestion, currentPoints, totalGameTime, isSuperGame, gameStarted } = storeToRefs(store)

	const router = useRouter()

	const goToStart = () => {
		currentQuestionNumber.value = 1
		totalGameTime.value = 0
		currentQuestion.value = null
		router.push('/')
		isSuperGame.value = false
		gameStarted.value = false
		currentPoints.value = 0
	}

	const titlePhrase = ['Время вышло, кончилось, истекло, пролетело', 'Время тю-тю!', 'Ой, ой... Время вышло!', '«Финита ля комедия!»', 'Время на вопрос кончилось!']
	const phraseToUse = titlePhrase[Math.floor(Math.random() * titlePhrase.length)]
</script>
<template>
	<div class="final h-screen">
		<a
			href="https://kantiana.ru"
			target="_blank"
		>
			<img
				src="/img/bfu-white.svg"
				class="final_bfuLogo"
			/>
		</a>

		<div class="final_timeout">
			<div class="final_timeout_pusskin">
				<img
					:src="`/img/characters/pushkin 5.png`"
					class="final_timeout_pusskin-full"
				/>
				<img
					:src="`/img/characters/pushkin_hand.png`"
					class="final_timeout_pusskin-hand"
				/>
			</div>
			<div class="final_timeout_window q-shadow-md__light-green">
				<p class="final_timeout_window_title text-black">{{ phraseToUse }}</p>
				<p class="final_timeout_window_description text-black">
					Не расстраивайся, ты можешь пройти квиз заново и проверить свои знания
				</p>
				<button
					@click="goToStart"
					class="final_timeout_window_button bg-#71CB8A q-shadow-sm__lightest-green"
				>
					<!-- p-22px lt-xxxl:p-12px w-350px lt-xxxl:w-230px mt-32px lt-lg:mt-26px  -->
					<p class="final_timeout_window_button-title text-white">Начать заново</p>
					<!-- font-500 leading-26px text-20px lt-lg:text-18px lt-xxxl:text-14px -->
				</button>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>

	.final {
		background-color: #1e2947;
		background-image: url('/img//time-bg.svg');
		background-size: cover;
		&_bfuLogo {
			position: fixed;
			top: 36px;
			right: 3%;
			color: white;
		}
		&_timeout {
			position: absolute;
			bottom: 0;
			left: 50%;
			translate: -50% 0;
			max-width: 600px;
			&_pusskin {
				&-full {
					position: absolute;
					bottom: 0;
					translate: -12%;
					width: 38.5vw;
					height: 86vh;
					z-index: 1;
				}

				&-hand {
					position: absolute;
					left: 50%;
					translate: 64.5% -84.5%;
					width: 8vw;
					height: 41.61vh;
					z-index: 91919;
				}
			}
			&_window {
				display: flex;
				flex-direction: column;
				padding: 42px;
				background: white;
				position: relative;
				z-index: 2;
				margin-bottom: 12vh;
				height: 34vh;
				width: 31.25vw;
				&_title{
					font-weight: 500;
					font-size: 34px;
					line-height: 130%;
				}
				&_description{
					font-weight: 400;
					font-size: 23px;
					line-height: 130%;
					margin-top: 15px;
				}
				&_button{
					padding: 20px;
					margin-top: 32px;
					&-title{

					}
				}
			}
		}
	}
	@media screen and (max-width: 1230px) {
		.final_timeout_window {
			width: 41vw;
			padding: 7%;
		}
		.final_timeout_window_title{
			font-size: 27px;
		}
		.final_timeout_window_description{
			font-size: 20px;
			margin-top: 3%;
		}.final_timeout_window_button{
			padding: 10px;
			margin-top: 15px;
		}
	}
	@media screen and (max-width: 683px) {
		.final_timeout_window {
			width: 44.375vw;
			padding: 5%;
		}
		.final_timeout_window_title{
			font-size: 24px;
		}
		.final_timeout_window_description{
			font-size: 18px;
			margin-top: 4.5%;
		}
		.final_timeout_pusskin-full{
			width: 40.7vw;
		}
	}
	@media screen and (max-width: 576px) {
		.final_timeout_window {
			width: 50vw;
		}
		.final_timeout_window_title{
			font-size: 23px;
		}
		.final_timeout_window_description{
		font-size: 16px;	
		}
		.final_timeout_pusskin-full{
			width: 45vw;
		}
		.final_timeout_pusskin-hand{
			width: 9vw;
			translate: 56.8% -84.5%;
		}
	}
	@media screen and (max-width: 450px) {
		.final_timeout_window {
			width: 60vw;
		}
		.final_timeout_window_title{
			font-size: 19px;
		}
		.final_timeout_window_description{
			font-size: 17px;
		}.final_timeout_window_button{
			padding: 14px;
			margin-top: 16px;
		}
		.final_timeout_pusskin-full{
			width: 57vw;
		}
		.final_timeout_pusskin-hand{
			width: 12.2vw;
			translate: 65% -84.5%;
		}
	}
	.spell {
		font-family: 'Snell';
		transform: translateX(-50%) rotate(-2deg);
		white-space: nowrap;
	}
</style>
