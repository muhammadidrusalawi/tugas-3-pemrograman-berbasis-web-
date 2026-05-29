<script setup>
import Button from './Button.vue';
import { ChevronLeft, ChevronRight } from '@lucide/vue';

defineProps({
  total: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div v-if="total" class="-mt-2 flex items-center justify-between">
    <p class="pl-2 text-sm text-neutral-500">
      Menampilkan
      <span class="font-medium">
        {{ total }}
      </span>
      dari
      <span class="font-medium">
        {{ total }}
      </span>
      data
    </p>

    <div class="flex items-center gap-1">
      <Button variant="outline" class="p-2">
        <ChevronLeft size="16" />
      </Button>

      <Button class="px-3 py-1.5 text-sm font-medium"> 1 </Button>

      <Button variant="outline" class="px-3 py-1.5 text-sm font-medium">
        2
      </Button>

      <Button variant="outline" class="px-3 py-1.5 text-sm font-medium">
        3
      </Button>

      <Button variant="outline" class="p-2">
        <ChevronRight size="16" />
      </Button>
    </div>
  </div>
</template>
