<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { authStore } from '../stores/auth.store.js';

const now = ref(new Date());

let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const greeting = computed(() => {
  const hour = now.value.getHours();

  if (hour >= 4 && hour < 11) {
    return 'Selamat Pagi';
  }

  if (hour >= 11 && hour < 15) {
    return 'Selamat Siang';
  }

  if (hour >= 15 && hour < 18) {
    return 'Selamat Sore';
  }

  return 'Selamat Malam';
});

const currentTime = computed(() => {
  return now.value.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
});

const currentDate = computed(() => {
  return now.value.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});

const userName = computed(() => {
  return authStore.user?.nama || 'Guest';
});
</script>

<template>
  <section class="flex h-full w-full flex-col gap-5">
    <div
      class="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 text-white shadow-sm"
    >
      <div
        class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10"
      ></div>

      <div
        class="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-white/10"
      ></div>

      <div
        class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ greeting }}, {{ userName }}👋
          </h1>

          <p class="max-w-xl text-sm leading-relaxed text-white/80">
            Pantau stok bahan ajar, lakukan pengelolaan inventaris, dan cek
            kondisi stok terbaru secara realtime.
          </p>
        </div>

        <div class="w-full max-w-fit p-5">
          <h2 class="text-4xl font-bold tracking-tight">
            {{ currentTime }}
          </h2>

          <p class="mt-1 text-sm text-white/80">
            {{ currentDate }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
