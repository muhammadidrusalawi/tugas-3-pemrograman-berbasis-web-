<script setup>
import { computed } from 'vue';

const props = defineProps({
  qty: {
    type: Number,
    required: true,
  },
  safety: {
    type: Number,
    required: true,
  },
});

const status = computed(() => {
  if (props.qty === 0) {
    return {
      text: 'Kosong',
      class: 'bg-red-100 text-red-600',
    };
  }

  if (props.qty < props.safety) {
    return {
      text: 'Menipis',
      class: 'bg-yellow-100 text-yellow-700',
    };
  }

  return {
    text: 'Aman',
    class: 'bg-green-100 text-green-700',
  };
});
</script>

<template>
  <span
    :class="status.class"
    class="inline-flex cursor-pointer items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
  >
    {{ status.text }}
  </span>
</template>
