<template>
    <div class="answers-position">
        <p class="answers-position__title">Ответы для позиций</p>
        <div class="answers-position_content zx">
            <div class="answers-position_item" v-for="(answer, idx) in state" :key="`answer--position__${idx}`">
                <p @click="handleDeleteAnswer(answer, idx)" class="answers-position_item__delete">X</p>
                <el-input @change="startChangeAnswer(answer, idx)" v-model="answer.meta.title" :rows="1"
                    placeholder="Ответ" />
                <button @click="handleUpdateAnswer(answer, idx)"
                    v-if="answer.id !== 'new' && answer?.updated">Сохранить</button>
                <button @click="handleSaveAnswer(answer, idx)" v-if="answer.id === 'new'">Сохранить</button>
                <p>{{ answer.correctPos }}</p>
            </div>
        </div>
        <UIButton @click="handleAddAnswer()">Добавить ответ</UIButton>

        <p class="answers-position__title">Позиции</p>
        <div class="answers-position_content zx">
            <div class="answers-position_item" v-for="(position, idx) in questionState?.meta?.positions"
                :key="`answer--position__${idx}`">
                <p @click="handleDeletePosition(position, idx)" class="answers-position_item__delete">X</p>
                <el-input @change="startUpdatePosition(position, idx)" v-model="position.title" :rows="1"
                    placeholder="Название позиции" />
                <button @click="handleSaveUpdatePosition(position, idx)"
                    v-if="position?.type !== 'new' && position?.updated">Сохранить</button>
                <button @click="handleSavePosition(position, idx)" v-if="position.type === 'new'">Сохранить</button>
                <el-input @change="startUpdatePosition(position, idx)" style="max-width: 30px;"
                    v-model="position.position" />
            </div>
        </div>
        <UIButton @click="handleAddPosition()">Добавить позицию</UIButton>
    </div>
</template>

<script setup>
import { useAdminStore } from '~/store/admin';
const adminStore = useAdminStore()
const { deleteAnswer, saveAnswer, updateAnswer, updateQeustion } = useAdminStore()
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

const questionState = ref({})

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

const startUpdatePosition = (position, idx) => {
    if (position?.type !== 'new') questionState.value.meta.positions[idx]["updated"] = true
}

const handleSaveUpdatePosition = async (position, idx) => {
    console.log(position)
    if (position?.updated) await updateQeustion({
        id: props.question.id, meta: {
            ...questionState.value.meta,
            positions: questionState.value.meta.positions.map(item => {
                return { ...item, updated: undefined }
            })
        }
    }).then(data => {
        if (data) questionState.value = data
    })
}

const handleAddPosition = () => {
    questionState.value.meta.positions.push({
        title: '',
        position: "0",
        type: "new"
    })
}

const handleSavePosition = async (position, idx) => {
    if (!position?.updated) await updateQeustion({
        id: props.question.id, meta: {
            ...questionState.value.meta,
            positions: questionState.value.meta.positions.map(item => {
                return { ...item, type: undefined }
            })
        }
    }).then(data => {
        if (data) questionState.value = data
    })
}

const handleDeletePosition = async (position, idx) => {
    if (position.type === 'new') {
        questionState.value.meta.positions.splice(idx, 1)
    } else {
        questionState.value.meta.positions.splice(idx, 1)
        await updateQeustion({
            id: props.question.id, meta: {
                ...questionState.value.meta,
            }
        }).then(data => {
            if (data) questionState.value = data
        })
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
        correctPos: state.value.length + 1,
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

watch(() => props.question, () => {
    if (props.question) questionState.value = props.question
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
.answers-position {
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