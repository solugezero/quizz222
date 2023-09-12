<script setup>
	defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
	})
	const emits = defineEmits(["update:modelValue"])
</script>

<template>
	<Teleport to="body">
		<Transition name="slide-b">
			<div class="modal-b fixed top-0 bottom-0 right-0 left-0 z-15 flex items-end" v-if="modelValue">
				<div class="w-full relative inner text-16px" @click.stop v-show="modelValue">
					<slot />
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
	.slide-b-enter-from {
		opacity: 0;
	}
	.slide-b-enter-to {
		opacity: 1;
	}
	.slide-b-enter-active {
		transition: all 0.5s ease;
	}
	.slide-b-leave-from {
		opacity: 1;
	}
	.slide-b-leave-to {
		opacity: 0;
	}
	.slide-b-leave-active {
		transition: all 0.5s ease;
	}

	.slide-b-enter-active .inner,
	.slide-b-leave-active .inner {
		transition: all 0.3s ease-in-out;
	}

	.slide-b-enter-from .inner,
	.slide-b-leave-to .inner {
		transform: translateY(100%);
		opacity: 0;
	}

	.modal-b {
		backdrop-filter: blur(5px);
		background: rgba(9, 9, 9, 0.7) !important;
	}
</style>
