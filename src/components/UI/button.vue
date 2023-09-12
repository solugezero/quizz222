<template>
    <div class="button">
        <button :style="buttonStyles">
            <slot v-if="!hideText" />
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    rounded: {
        type: Boolean,
        default: false
    },
    hideText: {
        type: Boolean,
        default: false
    },
    background: {
        type: String,
        default: "unset"
    },
    color: {
        type: String,
        default: "#000"
    },
})

const buttonStyles = computed(() => {
    return {
        background: props.background,
        borderRadius: props.rounded ? "50%" : "6px",
        width: props.rounded ? "32px" : "100%",
        height: props.rounded ? "32px" : "100%",
        padding: props.rounded ? "0px" : "2px 10px",
        color: props.color
    }
})
</script>

<style lang="scss" scoped>
.button {
    button {
        border: 1px solid #dfdfdf;
        padding: 0px 4px;
    }
}
</style>