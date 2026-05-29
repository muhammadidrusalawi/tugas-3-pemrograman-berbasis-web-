<script setup>
import { computed } from 'vue';
import { X } from '@lucide/vue';
import Button from './Button.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Dialog' },
  size: { type: String, default: 'md' }, // sm, md, lg, xl
  disableOutsideClick: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-md';
    case 'md':
      return 'max-w-lg';
    case 'lg':
      return 'max-w-2xl';
    case 'xl':
      return 'max-w-4xl';
    default:
      return 'max-w-lg';
  }
});

const close = () => {
  emit('update:modelValue', false);
};

const handleOutsideClick = () => {
  if (!props.disableOutsideClick) {
    close();
  }
};
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-50"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-50"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-[3px]"
        @click="handleOutsideClick"
      />
    </Transition>

    <!-- Dialog -->
    <Transition
      enter-active-class="transition duration-[45ms] ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-[35ms] ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="max-h-[90vh] w-full space-y-3 overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
          :class="sizeClass"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-black">
              {{ title }}
            </h3>

            <!--            <button-->
            <!--              @click="close"-->
            <!--              class="rounded-full p-1 text-neutral-500 hover:bg-gray-100 hover:text-gray-600"-->
            <!--            >-->
            <!--              <X size="20" />-->
            <!--            </button>-->
          </div>

          <div>
            <slot name="body" />
          </div>

          <div class="mt-6 flex justify-end gap-2">
            <slot name="footer">
              <Button @click="close" variant="outline"> Batal </Button>
              <Button @click="emit('confirm')"> Simpan </Button>

              <!--              <button-->
              <!--                @click="emit('confirm')"-->
              <!--                class="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"-->
              <!--              >-->
              <!--                Simpan-->
              <!--              </button>-->
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
