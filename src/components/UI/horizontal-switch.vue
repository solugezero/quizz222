<template>
    <div class="horizontal-switch switch">
        <p @click="handleSwitch(item, idx)" :class="{ 'switch_item--active': stateIndex === idx }" class="switch_item item"
            v-for="(item, idx) in options" :key="`switch__idx`">{{
                getValidName(item) }}</p>
    </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    options: {
        type: Array,
        default: []
    },
    titleKey: {
        type: String,
        default: 'title'
    },
    modelValue: {
        type: Object,
        default: {}
    }
})

const state = ref({})
const stateIndex = ref(-1)

const handleSwitch = (item, index) => {
    if (stateIndex === index) {
        state.value = undefined
        stateIndex.value = undefined
    } else {
        state.value = item
        stateIndex.value = index
    }
    emit("update:modelValue", state.value)
}

const getValidName = (item) => {
    const { titleKey } = props
    if (titleKey) return item[titleKey] || "ERROR"
    return item?.title
}

watch(() => props.modelValue, () => {
    if(props.modelValue) {
        state.value = props.modelValue
        stateIndex.value = props.options.findIndex(item => item?.id === props.modelValue?.id)
    }
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
.switch {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #dfdfdf;
    border-radius: 6px;
    padding: 4px;

    &_item {
        padding: 1px 4px;
        border-radius: 4px;
        width: fit-content;
        cursor: pointer;
        transition: background 0.3s ease, color 0.3s ease;
        user-select: none;

        &--active {
            background: #3d3fad !important;
            color: #fff;
        }
    }
}
</style>