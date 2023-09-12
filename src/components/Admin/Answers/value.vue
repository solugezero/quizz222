<template>
    <div class="answers-default">
        {{state}} {{ question }}
        <p class="answers-default__title">Ответы к стандартной игре</p>
        <div class="answers-default_content zx">
            <div class="answers-default_item" v-for="(answer, idx) in state" :key="`answer--default__${idx}`">
                <el-input></el-input>
            </div>
        </div>
        <UIButton @click="handleAddAnswer()">Добавить ответ</UIButton>
    </div>
</template>

<script setup>
import { useAdminStore } from '~/store/admin';
const adminStore = useAdminStore()
const { deleteAnswer, saveAnswer, updateAnswer } = useAdminStore()
const props = defineProps({
    options: {
        type: Array
    },
    question: {
        type: Object
    }
})

const state = ref([])
const stateCorrectIndex = ref(-1)

const handleChangeValidAnswer = (answer, idx) => {
    if (stateCorrectIndex.value === idx) {
        state.value[idx].isCorrect = false
        stateCorrectIndex.value = -1
        return
    }
    if (stateCorrectIndex.value !== -1) {
        state.value[idx].isCorrect = true
        state.value[stateCorrectIndex.value].isCorrect = false
        stateCorrectIndex.value = idx
    } else {
        state.value[idx].isCorrect = true
        stateCorrectIndex.value = idx
    }
}

const handleSaveAnswer = async (answer, idx) => {
    await saveAnswer({ ...answer, id: undefined }).then(data => {
        if (data) state.value[idx] = data
    })
}

const startChangeAnswer = (answer, idx) => {
    if (answer.id !== 'new') state.value[idx]["updated"] = true
}

const handleUpdateAnswer = async (answer, idx) => {
    await updateAnswer({ ...answer, updated: undefined }).then(data => {
        if (data) state.value[idx] = data
    })
}

const handleDeleteAnswer = async (answer, idx) => {
    if (answer.id !== 'new') {
        await deleteAnswer(answer.id)
    } else {
        state.value.splice(idx, 1)
    }
}

const handleAddAnswer = () => {
    state.value.push({
        correctPos: undefined,
        correctValue: undefined,
        id: "new",
        isCorrect: false,
        meta: {
            title: ''
        },
        questionId: props?.question?.id
    })
}

watch(() => props.options, () => {
    if (props.options) {
        state.value = props.options
        stateCorrectIndex.value = state.value.findIndex(item => item?.isCorrect)
    }
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
.answers-default {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    &_content {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 30px;
    }

    &_item {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;

        &__delete {
            cursor: pointer;
        }

        &__button {
            padding: 2px 6px;
            border-radius: 10px;
            width: 30px;
            height: 30px;
            background: rgb(182, 182, 182);

            &--active {
                background: rgb(21, 121, 21) !important;
            }
        }
    }
}
</style>