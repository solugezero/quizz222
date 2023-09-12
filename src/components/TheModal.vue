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
		<Transition name="fade">
			<div class="fixed inset-0 flex items-center justify-center z-1000 modal-bg" @click="emits('update:modelValue', false)" v-if="modelValue">
				<div class="relative max-w-full max-h-full" @click.stop v-show="modelValue">
					<!-- <IconClose
						class="w-22px text-f-gray-300 absolute top-[-2px] right-[-24px] cursor-pointer hover:text-f-gray-200 trs"
						@click="emits('update:modelValue', false)"
					/> -->
					<slot />
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
	.fade-enter-from {
		opacity: 0;
	}
	.fade-enter-to {
		opacity: 1;
	}
	.fade-enter-active {
		transition: all 0.5s ease;
	}
	.fade-leave-from {
		opacity: 1;
	}
	.fade-leave-to {
		opacity: 0;
	}
	.fade-leave-active {
		transition: all 0.5s ease;
	}

	.modal-bg {
		background: hsla(198, 21%, 9%, 0.8);
		backdrop-filter: blur(4px);
	}
</style>
