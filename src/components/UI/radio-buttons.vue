<template>
    <div class="radio-buttons radio">
        <div class="radio_item item" :class="{ 'item--active': stateIndex === idx }" @click="handleSwitch(item, idx)"
            v-for="(item, idx) in options" :key="`radio__${idx}`">
            <div class="item__check" />
            <p class="item__title">{{ getValidName(item) }}</p>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"], "change")
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
        type: Object
    }
})

const state = ref({})
const stateIndex = ref(-1)

const handleSwitch = (item, index) => {
    state.value = item
    stateIndex.value = index

    emit("update:modelValue", state.value)
    emit("change", state.value)
}

const getValidName = (item) => {
    const { titleKey } = props
    if (titleKey) return item[titleKey] || "ERROR"
    return item?.title
}

watch(() => props.modelValue, () => {
    if (props.modelValue) {
        if (typeof props.modelValue === 'string') {
            state.value = props.modelValue
            stateIndex.value = props.options.findIndex(item => item?.id === props.modelValue)
        } else {
            state.value = props.modelValue
            stateIndex.value = props.options.findIndex(item => item?.id === props.modelValue?.id)
        }
    }
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
.item {
    &__check {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid gray;
    }

    // background: #dfdfdf;
    padding: 1px 4px;
    border-radius: 4px;
    width: fit-content;
    cursor: pointer;
    transition: background 0.3s ease,
    color 0.3s ease;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 10px;

    &__check {
        transition: background 0.3s ease;
    }

    &--active {
        .item__check {
            background: #3d3fad;
        }
    }
}

.radio {
    display: flex;
    align-items: center;
    gap: 10px;
    // background: #dfdfdf;
    border: 1px solid #dfdfdf;
    border-radius: 6px;
    padding: 4px;
}
</style>