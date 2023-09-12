<template>
    <div class="inputfiles" @click="handleUploadFile">
        <div v-if="!state.src" class="inputfiles_content">
            <el-icon class="inputfiles__icon--upload"><upload-filled /></el-icon>
            <p class="inputfiles_content__title">Добавьте изображение</p>
        </div>
        <input v-if="!state.src" @change="data => onUpload(data)" ref="input" type="file" class="inputfiles__input">
        <p @click.stop="onDelete()" v-if="state.src" class="inputfiles__delete">X</p>
        <img class="inputfiles__image" v-if="state.src" :src="state.src" alt="">
    </div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue"

const emit = defineEmits(["update:modelValue", "change", "error"])
const input = ref(null)
const state = ref({
    file: undefined,
    src: undefined
})

const handleUploadFile = () => {
    if (input.value) input.value.click()
}

const onUpload = (event) => {
    const uploadedFile = event.target.files[0]
    state.value.src = URL.createObjectURL(uploadedFile)
    state.value.file = uploadedFile

    const img = document.createElement("img")
    const selectedImage = uploadedFile

    const objectURL = URL.createObjectURL(selectedImage)
    img.onload = function handleLoad() {
        if (img.width < 680 || img.height < 256) {
            state.value.file = ''
            state.value.src = ''
            emit("update:modelValue", state.value.file)
            emit("change", state.value.file)
            emit("error", true)
        } else {
            emit("update:modelValue", state.value.file)
            emit("change", state.value.file)
            emit("error", false)
        }

        URL.revokeObjectURL(objectURL)
    }
    img.src = objectURL
}

const onDelete = () => {
    state.value = {
        file: undefined,
        src: undefined
    }
    emit("update:modelValue", undefined)
}
</script>

<style lang="scss" scoped>
.inputfiles {
    height: 256px;
    width: 680px;
    border: 1px solid #dfdfdf;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
    }

    &__delete {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #ffffffd0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    &__input {
        display: none;
    }

    &__icon {

        &--upload {
            font-size: 40px;
        }
    }

    &_content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
}
</style>