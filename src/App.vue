<template>
  <div class="w-screen h-screen bg-slate-800 flex items-end justify-center pb-32">
    <div class="items-center flex flex-col">
      <div class="z-20 bg-red-600 w-10 absolute -translate-y-24 rounded-t-2xl bar"></div>
      <div class="absolute z-0 bg-gray-600 w-10 outline-white outline outline-offset-0 outline-4 rounded-t-2xl bar2"></div>
      <div class="z-10 bg-red-600 w-24 h-24 rounded-full outline-white outline outline-offset-0 outline-4"></div>
    </div>
    <div class="text-white font-semibold flex items-end flex-col gap-12 -translate-y-24">
      <h1>30°C</h1>
      <h1>20°C</h1>
      <h1>10°C</h1>
      <h1>0°C</h1>
      <h1>-10°C</h1>
      <h1>-20°C</h1>
      <h1>-30°C</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';
const socket = io('http://localhost:4001');
import anime from 'animejs';

const temperature = ref('');
let height = ref('1rem');
let translate = ref('-1rem');

height.value = '10rem';

// Inicjalizacja animacji Anime.js po zamontowaniu komponentu
onMounted(() => {
  anime({
    targets: '.bar',
    height: height.value, // Początkowa wysokość
    easing: 'easeInOutSine',
    duration: 1000,
  });
});

socket.on('dane', async (dane) => {
  temperature.value = dane;
  const targetHeight = (dane / 2 + 15) + 'rem';

  // Dynamiczna aktualizacja wysokości
  anime({
    targets: '.bar',
    height: targetHeight,
    easing: 'easeInOutSine',
    duration: 1000,
  });

  // Aktualizacja wartości przesunięcia
  translate.value = (-(dane / 2 + 14.5)) + 'rem';

  // Animacja przesunięcia
  anime({
    targets: '.bar',
    translateY: translate.value,
    easing: 'easeInOutSine',
    duration: 1000,
  });
});
</script>

<style>
.bar {
  transform: translateY(v-bind(translate));
}

.bar2 {
  height: 30rem;
  transform: translateY(-29rem);
}
</style>