<script setup>
  const show = ref(true);
  const totalTime = ref(12);
  const time = ref(8);
</script>
<template>
  <div class="main flex flex-col items-center justify-center h-screen">
    <div class="card p-42px pb-48px w-770px max-h-820px">
      <div class="flex items-center gap-x-9px">
        <div class="timer q-shadow-sm">
          <img class="w-24px h-24px" src="/img/clock.png" alt="таймер">
          <div class="time bg-#D1EAD8!">
            <div class="inner h-full bg-#71CB8A" :style="`width: ${(100 * time) / totalTime}%`"></div>
          </div>
          <p>10</p>
        </div>
        <div class="flex-1"></div>
        <div class="w-98px py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
          <p class="text-22px font-500 text-#1E2947 leading-25px">1</p>
          <p class="text-18px text-#C9C9C9 leading-21px mt-2px">баллы</p>
        </div>
        <div class="w-98px py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
          <p class="text-22px font-500 text-#1E2947 leading-25px">+4</p>
          <p class="text-18px text-#C9C9C9 leading-21px mt-2px">доп.сек</p>
        </div>
      </div>
      <div class="flex flex-col gap-y-18px mt-42px mb-38px">
        <p @click="show = !show" class="font-500 text-18px text-#A5A9B5">1 вопрос из 10</p>
        <p class="text-40px font-700 leading-46px">Выберите правильный вариант написания слова</p>
        <img v-if="show" class="w-full h-256px object-cover q-shadow-sm" src="/img/pen.png" >
      </div>
      <div class="flex flex-wrap gap-16px">
        <div class="q-answer q-shadow-sm" :class="{ 'correct q-shadow-sm__green': !show}">
          <p class="text-20px leading-26px text-center py-22px p-18px">Будущий</p>
        </div>
        <div class="q-answer q-shadow-sm">
          <p class="text-20px leading-26px text-center py-22px p-18px">Будущий</p>
        </div>
        <div class="q-answer q-shadow-sm">
          <p class="text-20px leading-26px text-center py-22px p-18px">Будущий</p>
        </div>
        <div class="q-answer q-shadow-sm" :class="{ 'wrong q-shadow-sm__red': !show}">
          <p class="text-20px leading-26px text-center py-22px p-18px">Будущий</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  background-color: #71CB8A;
	background-image: url('/img/glyph.svg'), url('/img/texture.svg');
}
.card {
  background-color: #FBFBFB;
  box-shadow: 8px 2px 0 #1E2947;
}
.time {
  background-color: #71CB8A;
  width: 260px;
  height: 14px;
  clip-path: polygon(0% 4px, 4px 4px, 4px 0%, calc(100% - 4px) 0%, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0% calc(100% - 4px));
}
.timer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25.5px 24px;
  width: 380px;
  height: 72px;
  border: 2px solid #C9C9C9;
}
</style>