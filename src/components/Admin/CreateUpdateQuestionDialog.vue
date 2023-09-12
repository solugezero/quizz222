<template>
    <div class="create-update-dialog dialog">
        <div class="dialog_header">
            <p @click="handleUpdateImage()" class="dialog_header__delete-image">X</p>
            <img v-if="getValidImage.src" class="dialog_header__image" :src="getValidImage?.src" alt="">
            <div class="dialog_header_upload" v-else>
                <UIInputfiles @change="hasNewImage = true" v-model="state.meta.image" @error="data => imageError = data" />
                <div class="dialog_header_upload_content">
                    <p class="dialog_header_upload_content__subtitle">Необходимый размер изображения: 680х256</p>
                    <p v-if="imageError" style="color: red;">Изображение неверного размера!</p>
                </div>
            </div>
        </div>
        <div class="dialog_content">
            <p>Название</p>
            <el-input placeholder="Название" v-model="state.meta.title"></el-input>
            <p>Комментарий</p>
            <el-input v-model="state.meta.comment" :rows="2" type="textarea" placeholder="Комментарий" />
            <p>Комментарий к изображению</p>
            <el-input v-model="state.meta.imageComment" :rows="2" type="textarea" placeholder="Комментарий к изображению" />
            <UIRadioButtons v-model="state.type" @change="value => state.type = value?.id" style="width: fit-content;"
                :options="typeOptions" />
            <UIButton @click="handleUpdateCreateQuestion()">{{ createMode ? 'Создать' : 'Сохранить основные данные' }}
            </UIButton>
            <component v-if="!createMode" :is='getValidAnswersType' :options="stateAnswers" :question="question">
            </component>
        </div>
    </div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue"
import AnswersDefault from "~/components/Admin/Answers/default.vue"
import AnswersPosition from "~/components/Admin/Answers/position.vue"
import AnswersValue from "~/components/Admin/Answers/value.vue"
import CreateUpdateQuestionDialog from "./CreateUpdateQuestionDialog.vue"
import { useAdminStore } from "~/store/admin";
import { useModalStore } from "~/store/modal";

const adminStore = useAdminStore()
const modalStore = useModalStore()
const { getAnswersById, updateQeustion, saveQuestion } = adminStore
const api = import.meta.env.VITE_API
const hasNewImage = ref(false)
const props = defineProps({
    question: {
        type: Object
    },
    createMode: {
        type: Boolean,
        default: false
    }
})
const imageError = ref(false)
const stateAnswers = computed(() => getAnswersById(state.value.id) || [])
const state = ref({
    id: undefined,
    type: "DEFAULT",
    meta: {
        image: undefined,
        title: undefined,
        comment: undefined,
        imageComment: undefined,
        value: [],
        positions: [],
    },
})
const typeOptions = ref([
    { title: 'Стандартный', id: "DEFAULT" },
    { title: 'Позиция', id: "POSITION" },
    { title: 'Супер-игра', id: "VALUE" },
])
const getValidAnswersType = computed(() => {
    if (state.value?.type === 'DEFAULT') return AnswersDefault
    if (state.value?.type === 'POSITION') return AnswersPosition
    if (state.value?.type === 'VALUE') return AnswersValue
    return AnswersDefault
})

watch(() => props.question, () => {
    if (!props.createMode) state.value = props.question
}, {
    immediate: true
})

const handleUpdateCreateQuestion = async () => {
    if (props.createMode) {
        await saveQuestion(state.value).then(data => {
            modalStore.open(CreateUpdateQuestionDialog, { createMode: false, question: data })
        })
    } else {
        await updateQeustion(state.value, hasNewImage.value).then(data => {
        })
    }
}

const handleUpdateImage = () => {
    hasNewImage.value = true
    state.value.meta.image = ""
}

const getValidImage = computed(() => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
    const isLinkImage = imageExtensions.test(`${api}/${state.value?.meta?.image}`)
    if (isLinkImage) return {
        src: `${api}/${state.value?.meta?.image}`,
        error: "noimage2.png",
    }
    else return {
        src: false,
        error: "noimage2.png",
    }
})
</script>

<style scoped lang="scss">
.dialog {
    border-radius: 12px;
    background: #fff;

    &_content {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        padding: 10px;
    }

    &_header {
        position: relative;

        &__delete-image {
            width: 30px;
            height: 30px;
            position: absolute;
            background: #00000057;
            display: flex;
            justify-content: center;
            cursor: pointer;
            align-items: center;
            right: 10px;
            top: 10px;
            border-radius: 50%;
            color: #fff;
        }

        &_upload {
            display: flex;
            width: 100%;
            flex-direction: column;
            gap: 10px;

            &_content {
                padding: 0px 10px;
            }
        }

        &__image {
            width: 680px;
            height: 256px;
            border-radius: 12px;
            object-fit: cover;
        }
    }
}
</style>