<script setup>
const props = defineProps({
	modelValue: [Array, Boolean],
	margin: {
		type: String,
		default: "12px",
	},
	isDisabled: {
		type: Boolean,
		default: false
	},
	isChecked: {
		type: Boolean,
		default: null
	}
});
const emits = defineEmits(["update:modelValue"]);
const modelValueComputed = computed({
	get: () => props.modelValue,
	set: (value) => {
		if (!props.isDisabled) {
			emits("update:modelValue", value);
		}
	},
});
</script>

<template>
	<label class="cursor-pointer inline-flex select-none items-center"
		:class="{ 'cursor-default' : isDisabled }"
	>
		<div
			class="w-22px h-22px relative flex"
			:style="`margin-right: ${margin}`"
		>
			<input
				type="checkbox"
				class="peer hidden"
				v-model="modelValueComputed"
				v-bind="$attrs"
			/>
			<div
				v-if="!isDisabled"
				class="basis-22px flex-shrink-0 items-center justify-center w-22px h-22px border-2px border-f-gray-500 rounded-4px grid place-content-center peer-checked:bg-f-blue peer-checked:border-f-blue"
			></div>
			<!--Поменять иконку, с фигмы не экспортится-->
			<IconLock
				v-if="isDisabled"
				class="w-15px text-white p-0 m-0 leading-none absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]"
			/>
			<IconCheck
				v-else
				class="w-15px text-white p-0 m-0 leading-none hidden peer-checked:block absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]"
			/>
			<div
				v-if="!isDisabled && isChecked"
				class="basis-22px flex-shrink-0 items-center justify-center w-22px h-22px border-2px border-f-gray-500 rounded-4px grid place-content-center bg-f-blue border-f-blue peer-checked:hidden absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]"
			></div>
			<IconCheck
				v-if="isChecked"
				class="w-15px text-white p-0 m-0 leading-none peer-checked:hidden absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]"
			/>
		</div>
		<slot></slot>
	</label>
</template>