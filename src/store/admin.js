import { acceptHMRUpdate, defineStore } from "pinia";
import {
  answerCreate,
  answerDelete,
  answerUpdate,
  answersGet,
  questionCreate,
  questionDelete,
  questionImageUpload,
  questionUpdate,
  questionsGet,
} from "~/api";
export const useAdminStore = defineStore("admin", {
  state: () => ({
    answers: [],
    questions: [],
    filters: {
      type: null,
      easy: null,
    },
  }),
  actions: {
    async featchAnswers() {
      try {
        const response = await answersGet();
        this.answers = response;
      } catch (error) {
        console.log(error);
      }
    },
    async featchQuestions() {
      try {
        const response = await questionsGet();
        this.questions = response;
      } catch (error) {
        console.log(error);
      }
    },
    getAnswersById(questionId) {
      return this.answers.filter((x) => x?.questionId === questionId);
    },
    getQuestionsById(questionId) {
      return this.answers.filter((x) => x?.questionId === questionId);
    },
    async saveQuestion(state) {
      try {
        const response = await questionCreate(state);
        if (response) {
          await this.questionImageUpload(response.id, state.meta.image);
          await this.featchQuestions();
        } else alert("ERROR SAVE QUESTION");
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async updateQeustion(state, newImage = false) {
      try {
        const response = await questionUpdate(state.id, state);
        if (response) {
          if (newImage)
            await this.questionImageUpload(response.id, state.meta.image);
          await this.featchQuestions();
        } else alert("ERROR UPDATE QUESTION");
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async questionImageUpload(questionId, file, screenshot = false) {
      try {
        const response = await questionImageUpload(
          questionId,
          file,
          screenshot
        );
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async deleteQuestion(id) {
      try {
        const response = await questionDelete(id);
        if (response) await this.featchQuestions();
        else alert("ERROR DELETE QUESTION");
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async saveAnswer(state) {
      try {
        const response = await answerCreate(state);
        if (response) await this.featchAnswers();
        else alert("ERROR SAVE ANSWER");
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async updateAnswer(state) {
      try {
        const response = await answerUpdate(state.id, state);
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async deleteAnswer(id) {
      try {
        const response = await answerDelete(id);
        if (response) await this.featchAnswers();
        else alert("ERROR DELETE ANSWER");
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  getters: {
    getQuestionsHelper: (state) => {
      const getQuestions = state.questions;
      return [...new Set(getQuestions)];
    },
    getAnswersHelper: (state) => {
      const getAnswers = state.answers;
      return [...new Set(getAnswers)];
    },
    getQuestionsByFilters: (state) => {
      const { type, easy } = state.filters;
      let compireData = state.questions;
      if (type) {
        if (type === "ALL") compireData = state.questions;
        else
          compireData = compireData.filter(
            (question) => question.type === type
          );
      }
      if (easy === "easy") {
        console.log(easy);
        compireData = compireData.filter((question) => question.meta?.easy);
      }
      if (easy === "hard") {
        console.log(easy);
        compireData = compireData.filter((question) => !question.meta?.easy);
      }
      return compireData;
    },
  },
});
