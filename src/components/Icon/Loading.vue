<template>
	<div class="flex items-center justify-center gap-x-8px">
		<div class="dot1"></div>
		<div class="dot2"></div>
		<div class="dot3"></div>
	</div>
</template>

<script setup>
const props = defineProps({
	size: {
		type: String,
		required: true,
	},
});
</script>

<style scoped>
@keyframes ScaleInOut {
	0% {
		transform: scale(0.8);
	}

	100% {
		transform: scale(1.5);
	}
}
.dot1,
.dot2,
.dot3 {
	width: v-bind(size);
	height: v-bind(size);
	border-radius: 50%;
	background-color: white;
	opacity: 0.5;
}
.dot1 {
	animation: ScaleInOut 0.6s ease-in-out 0.2s infinite alternate;
}

.dot2 {
	animation: ScaleInOut 0.6s ease-in-out 0.4s infinite alternate;
}

.dot3 {
	animation: ScaleInOut 0.6s ease-in-out 0.6s infinite alternate;
}
</style>
