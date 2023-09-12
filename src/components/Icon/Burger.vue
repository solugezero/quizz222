<script setup>
defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(["update:modelValue"]);
</script>

<template>
	<div class="burger-menu" :class="{ active: modelValue }" @click="emits('update:modelValue', !modelValue)"><span></span></div>
</template>

<style lang="scss">
.burger-menu {
	width: 19px;
	height: 14px;

	position: relative;
	overflow: hidden;
	cursor: pointer;
	z-index: 5;
	span,
	&::before,
	&::after {
		content: "";
		transition: all 0.3s ease 0s;
		right: 0;
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: #a0b4c2;
	}
	&::before {
		top: 0;
	}
	&::after {
		bottom: 0;
	}
	span {
		top: calc(50% - 1px);
	}
	&.active {
		span {
			width: 0;
		}
		&::before,
		&::after {
		}
		&::before {
			top: calc(50% - 1px);
			transform: rotate(-45deg);
		}
		&::after {
			bottom: calc(50% - 1px);
			transform: rotate(45deg);
		}
	}
}
</style>
