<script setup>
defineProps({
  content: {
    type: String,
    default: '',
  },

  maxWidth: {
    type: String,
    default: 'max-w-xs',
  },
});
</script>

<template>
  <div class="group relative inline-block">
    <slot />

    <div
      v-if="content"
      :class="maxWidth"
      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max -translate-x-1/2 scale-95 rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
    >
      <div v-html="content"></div>

      <div
        class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900"
      ></div>
    </div>
  </div>
</template>
