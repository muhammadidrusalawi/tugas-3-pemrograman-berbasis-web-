<script setup>
import { cn } from '../lib/utils.js';

defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    @input="emit('update:modelValue', $event.target.value)"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-neutral-200 bg-gray-50 px-3 py-2 text-sm transition outline-none focus:ring-1 focus:ring-blue-500',
        $props.class,
      )
    "
  />
</template>
