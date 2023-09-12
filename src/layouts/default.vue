<script setup>
	const isMobile = ref(false)
	const lndsc = ref(false)

	onMounted(() => {
		lndsc.value = window.orientation === 90
		window.addEventListener(
			"orientationchange",
			function () {
				lndsc.value = window.orientation === 90
				console.log(window.orientation)
			},
			false
		)
		isMobile.value = !!navigator.userAgent.match(/Android/i) || !!navigator.userAgent.match(/webOS/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPod/i) || !!navigator.userAgent.match(/BlackBerry/i) || !!navigator.userAgent.match(/Windows Phone/i)
	})
</script>

<template>
	<div class="flex flex-col h-100vh overflow-hidden">
		<!-- <TheHeader /> -->
		<!-- <pre>{{ isMobile }} lndsc:{{ lndsc }}</pre> -->
		<RouterView v-show="!isMobile || !lndsc" class="overflow-hidden" />
		<div v-show="isMobile && lndsc" class="flex flex-col h-full w-full items-center justify-center p-20px text-center relative">
			<p class="relative z-2 bg-white">
				Пока ты можешь разгадать русский код только в
				<b>вертикальном положении устройства.</b>
				<br />
				<p class="mt-18px">Извини 😓. И наше почтение!</p>
			</p>
			<img class="absolute z-1 top-50% left-50% translate-[-50%]" src="/img/single-glyph.svg" />
		</div>
	</div>
</template>
