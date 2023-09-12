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
	<Teleport to="body">
		<Transition name="fade">
			<div
				class="fixed top-64px right-0 bottom-0 left-0 bg-black/80 flex justify-start z-1000"
				@click="emits('update:modelValue', false)"
				v-if="modelValue"
			>
				<div
					class="w-420px lt-sm:w-full h-full bg-f-gray-800 relative inner text-16px"
					@click.stop
					v-show="modelValue"
				>
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

.fade-enter-active .inner,
.fade-leave-active .inner {
	transition: all 0.3s ease-in-out;
}

.fade-enter-from .inner,
.fade-leave-to .inner {
	transform: translateX(-100%);
	opacity: 0;
}
</style>
