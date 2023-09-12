<template>
	<div class="adm-layout items-center">
		<el-dialog v-model="dialogVisible">
			<AdminCreateUpdateQuestionDialog createMode v-if="dialogVisible" />
		</el-dialog>
		<!-- <div class="btn btn-primary shadow-md py-2 px-4">btn btn-primary</div> -->
		<div class="layout-filters rs-container">
			<el-radio-group v-model="localState.type" @change="handleChangeFilters">
				<el-radio-button :label="null">Все</el-radio-button>
				<el-radio-button label="DEFAULT">Стандартный</el-radio-button>
				<el-radio-button label="POSITION">Позиция</el-radio-button>
				<el-radio-button label="VALUE">Супер-игра</el-radio-button>
			</el-radio-group>
			<el-radio-group @change="handleChangeFilters" v-model="localState.easy">
				<el-radio border label="true">Легкие Вопросы</el-radio>
				<el-radio border label="false">Сложные Вопросы</el-radio>
			</el-radio-group>
			<el-button type="success" :icon="CirclePlus" circle @click="handleOpenDialog" />
		</div>
		<main class="adm-layout-main">
			<RouterView />
		</main>
	</div>
</template>

<script setup>
	import "element-plus/dist/index.css"
	import {CirclePlus} from "@element-plus/icons-vue"
	const localState = ref({
		type: null,
		easy: null,
	})
	const dialogVisible = ref(false)
	const adminStore = useAdminStore()
	const {filters} = toRefs(adminStore)
	const handleChangeFilters = () => {
		filters.value = localState
	}
	const handleOpenDialog = () => {
		dialogVisible.value = true
	}
</script>

<style lang="scss">
	.adm-layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		align-content: center;
		justify-content: center;
		justify-items: center;
		margin: 0;
		padding: 20px 10px;
	}
	.adm-layout-aside {
		background-color: red;
		//   position: absolute;
		//   left: 0;
		//   top: 0;
		//   bottom: 0;
		//   width: 250px;
		position: relative;
		float: left;
		width: 170px;
		top: 0px;
		bottom: 0px;
	}
	.adm-layout-main {
		width: 100%;
		height: 100%;
		max-height: 100vh;
		overflow: auto;
	}
	.layout-filters {
		padding-top: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
</style>
