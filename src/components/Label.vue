<script setup>
defineProps({
  htmlFor: String,
});
</script>

<template>
  <label :for="htmlFor" class="block text-sm font-medium text-neutral-500">
    <slot />
  </label>
</template>
