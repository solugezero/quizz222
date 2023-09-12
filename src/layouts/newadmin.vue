<template>
    <div class="newadmin-layout scroll-y">
        <div class="newadmin-layout_header content-box">
            <div class="newadmin-layout_header_filters">
                <UISwitch class="switch" v-model="filtersState.type" :options="typeOptions" />
                <UIRadioButtons v-model="filtersState.easy" :options="easyOptions" />
            </div>
            <UIButton @click="handleStartCreateQuestion()" rounded background="#67C23A" color="#fff">+</UIButton>
        </div>
        <div class="newadmin-layout_content content-box">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import UISwitch from "~/components/UI/horizontal-switch.vue"
import UIRadioButtons from "~/components/UI/radio-buttons.vue"
import UIButton from "~/components/UI/button.vue"
import { useModalStore } from "~/store/modal";
import CreateUpdateQuestionDialogVue from "~/components/Admin/CreateUpdateQuestionDialog.vue";
import { useAdminStore } from "~/store/admin";

const { filters } = toRefs(useAdminStore())
const adminStore = useAdminStore()
const modalStore = useModalStore()
const handleStartCreateQuestion = () => modalStore.open(CreateUpdateQuestionDialogVue, { createMode: true })

useHead({
    title: "Admin Page",
});

const filtersState = ref({
    type: undefined,
    easy: undefined
})

watch(() => filtersState.value, () => {
    if (filtersState.value.easy?.id) filters.value.easy = filtersState.value.easy?.id
    if (filtersState.value.type?.id) filters.value.type = filtersState.value.type?.id
}, {
    immediate: true,
    deep: true
})
const typeOptions = ref([
    { title: 'Все', id: "ALL" },
    { title: 'Стандартный', id: "DEFAULT" },
    { title: 'Позиция', id: "POSITION" },
    { title: 'Супер-игра', id: "VALUE" },
])
const easyOptions = ref([
    { title: 'Легкие вопросы', id: "easy" },
    { title: 'Сложные вопросы', id: "hard" },
])
</script>

<style scoped lang="scss">
.switch {
    width: fit-content;
}

.newadmin-layout {
    &_header {
        width: 100%;
        height: 105px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &_filters {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
}
</style>