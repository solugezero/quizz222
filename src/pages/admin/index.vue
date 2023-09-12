<script setup>
// import { gameAxios, questionsGet, questionCreate, answerCreate, answersGet } from '~/api';
const adminStore = useAdminStore();
const {
  featchAnswers,
  featchQuestions,
  getQuestionsHelper,
  getAnswersHelper,
  filters,
  getQuestionsByFilters,
} = toRefs(adminStore);

useHead({
  title: "admin page",
});

const LazyCompQuestionCard = defineAsyncComponent({
  loader: () => import("~/components/Admin/QuestionCard.vue"),
  delay: 1000 /* delay in ms before showing loading component */,
  timeout: 3000 /* timeout after this many ms */,
});

featchAnswers.value();
featchQuestions.value();
onMounted(async () => {
  // const password = await prompt('Enter password (ultra bezopasnost from hackers):');
  // const result = await gameAxios.get(`/api/v1/password?passphrase=${password}`);
  // console.log(result)
  // if (!result.success) {
  // 	window.location.reload();
  // 	return;
  // }
  // questions.value = await questionsGet();
  // answers.value = await answersGet();
});

// const sortedQuestions = computed(() => questions.value.sort((a, b) => a.id - b.id))

// const createQuestion = async () => {
// 	const result = await questionCreate({
// 		type: 'POSITION'
// 	});
// 	if (!result) {
// 		return;
// 	}
// 	console.log(result)

// 	questions.value.push(result);
// }

// const getQuestions = async () => {
// 	questions.value = await questionsGet();
// }
</script>
<template>
  <div h-full flex all:transition-400>
    <div ma class="scroll-x">
      <div
        class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-30px"
      >
        <div v-for="(question, idx) in getQuestionsByFilters">
          <LazyCompQuestionCard :question="question" :key="idx" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
meta:
  layout: admin
</route>
