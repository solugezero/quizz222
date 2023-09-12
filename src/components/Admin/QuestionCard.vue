<template>
    <div class="question-card card">
        <img class="card__image" v-lazy="getImageUrl" alt="">
        <div class="card_content">
            <table id="customers" class="w100_pers flex-wr">
                <tr>
                    <th>Название</th>
                    <td>{{ question?.meta?.title || "—" }}</td>
                </tr>
                <tr>
                    <th>Комментарий</th>
                    <td>{{ question?.meta?.comment || "—" }}</td>
                </tr>
                <tr>
                    <th>Тип</th>
                    <td>{{ getValidType(question?.type) }}</td>
                </tr>
                <tr>
                    <th>Номер вопроса</th>
                    <td>{{ question?.id }}</td>
                </tr>
                <tr>
                    <th>Легкий вопрос</th>
                    <td>{{ question?.meta?.easy ? 'Да' : 'Нет' }}</td>
                </tr>
                <tr>
                    <th>Комментарий к картинке</th>
                    <td>{{ question?.meta?.imageComment || "Без комментариев..." }}</td>
                </tr>
            </table>
        </div>

        <div class="card_actions">
            <UIButton @click="handleDeleteQuestion()">Удалить</UIButton>
            <UIButton @click="handleOpenModal()">Редактировать
            </UIButton>
        </div>
    </div>
</template>

<script setup>
import { getValidType } from "~/helpers/getValidType.js"
import { useModalStore } from "~/store/modal";
import { useAdminStore } from "~/store/admin";
import CreateUpdateQuestionDialog from "./CreateUpdateQuestionDialog.vue";

const adminStore = useAdminStore()
const modalStore = useModalStore()
const api = import.meta.env.VITE_API
const { deleteQuestion } = adminStore
const props = defineProps({
    question: {
        type: Object
    }
})

const handleOpenModal = () => {
    modalStore.open(CreateUpdateQuestionDialog, { question: props.question })
}

const handleDeleteQuestion = async () => {
    await deleteQuestion(props.question?.id)
}

const getImageUrl = computed(() => {
    return {
        src: `${api}/${props?.question?.meta?.image}`,
        error: "noimage2.png",
    }
})
</script>

<style lang="scss" scoped>
.card {
    background: rgb(235, 235, 235);
    width: 680px;
    height: fit-content;
    border-radius: 12px;

    &__image {

        height: 256px;
        width: 680px;
        object-fit: cover;
        border-radius: 12px;
    }

    table {
        height: 100%;

        th {
            text-align: left;
            padding: 0px 5px;
            border: 1px solid black;
            width: 30%;
        }

        td {
            padding: 0px 15px;
            width: 70%;

        }

        tr {
            border: 1px solid black;
        }
    }
}
</style>