<template>
    <div class="newadmin-page">
        <AdminQuestionCard v-for="(question, idx) in getQuestionsByFilters" :key="`question__${idx}`"
            :question="question" />
    </div>
</template>

<script setup>
import { useAdminStore } from '~/store/admin';

const adminStore = useAdminStore()
const { questions, getQuestionsByFilters } = toRefs(adminStore)
const { featchQuestions, featchAnswers } = adminStore

onMounted(async () => {
    try {
        await featchQuestions()
        await featchAnswers()
    } catch (err) {
        console.log({ err })
    }
})
</script>

<style scoped lang="scss">
.newadmin-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 50px;
}
</style>

<route lang="yaml">
    meta:
      layout: newadmin
</route>