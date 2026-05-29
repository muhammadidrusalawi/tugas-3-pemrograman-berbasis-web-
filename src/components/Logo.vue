<script setup>
import { Building2 } from '@lucide/vue';
</script>

<template>
  <div class="relative inline-block">
    <div
      class="flex w-full cursor-pointer items-center justify-between rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-neutral-100"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white"
        >
          <Building2 class="h-4 w-4" />
        </div>

        <div class="flex flex-col text-left text-sm leading-tight">
          <span class="truncate font-bold">SITTA</span>
          <span class="truncate text-xs text-gray-500">Enterprise</span>
        </div>
      </div>
    </div>
  </div>
</template>