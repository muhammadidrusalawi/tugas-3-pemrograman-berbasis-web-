<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Button from './Button.vue';
import { UserPen, LogOut } from '@lucide/vue';

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['logout']);

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <Button
      @click="toggleDropdown"
      variant="outline"
      class="flex h-8 w-8 items-center justify-center rounded-full"
    >
      {{ user.nama.charAt(0) }}
    </Button>

    <div
      v-if="isOpen"
      class="absolute right-0 z-50 mt-2 w-56 space-y-2 rounded-xl border border-neutral-200 bg-white shadow-lg"
    >
      <div class="flex items-center gap-3 px-3 pt-3">
        <Button
          variant="outline"
          class="flex h-8 w-8 items-center justify-center rounded-full"
        >
          {{ user.nama.charAt(0) }}
        </Button>

        <div class="text-sm">
          <p class="font-medium">{{ user.nama }}</p>

          <p class="text-xs text-neutral-500">
            {{ user.email }}
          </p>
        </div>
      </div>

      <div class="h-[1px] w-full bg-neutral-200" />

      <div class="flex flex-col gap-1 px-2 pb-3">
        <Button
          class="flex w-full items-center justify-start gap-4 border-none font-normal shadow-none"
          variant="outline"
        >
          <UserPen size="16" />
          Edit Profile
        </Button>

        <Button
          @click="$emit('logout')"
          class="flex w-full items-center justify-start gap-4 border-none font-normal shadow-none"
          variant="destructive"
        >
          <LogOut size="16" />
          Logout
        </Button>
      </div>
    </div>
  </div>
</template>
