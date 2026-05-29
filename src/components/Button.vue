<script setup>
import { cn } from '../lib/utils';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  class: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <button
    :type="type"
    :class="
      cn(
        'cursor-pointer rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200',

        variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',

        variant === 'secondary' &&
          'bg-yellow-400 text-neutral-700 hover:bg-yellow-500',

        variant === 'outline' &&
          'border border-neutral-200 bg-white text-black hover:bg-neutral-50',

        variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700',

        $props.class,
      )
    "
  >
    <slot />
  </button>
</template>
