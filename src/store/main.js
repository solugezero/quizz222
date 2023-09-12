import { acceptHMRUpdate, defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
	const currentQuestionNumber = ref(1);
	const currentQuestion = ref(null);

	const easyMode = ref(false);

	const currentPoints = ref(0);
	const totalGameTime = ref(0);
	const isSuperGame = ref(false);
    const gameStarted = ref(false);
	
    const showSuperGameEnd = ref(false);
    const superGameError = ref(false);

	return { currentQuestionNumber, currentQuestion, currentPoints, totalGameTime, isSuperGame,showSuperGameEnd, superGameError, gameStarted, easyMode };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
