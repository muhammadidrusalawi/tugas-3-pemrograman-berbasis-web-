<script setup>
import { authStore } from '../stores/auth.store.js';
import DropdownMenu from '../components/DropdownMenu.vue';
import {
  House,
  Box,
  Truck,
  PanelRightOpen,
  PanelLeftOpen,
  ChartNoAxesCombined,
} from '@lucide/vue';
import Button from '../components/Button.vue';
import Logo from '../components/Logo.vue';
import { ref, watch } from 'vue';
import { Boxes } from '@lucide/vue';

const handleLogout = () => {
  authStore.logout();

  window.location.href = '/login';
};

const menus = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: House,
  },
  {
    name: 'Stock',
    to: '/stock',
    icon: Box,
  },
  {
    name: 'Tracking',
    to: '/tracking',
    icon: Truck,
  },
];

const isSidebarVisible = ref(
  (() => {
    const stored = localStorage.getItem('sidebarVisible');

    return stored === null ? true : stored === 'true';
  })(),
);

watch(isSidebarVisible, (value) => {
  localStorage.setItem('sidebar-visible', String(value));
});
</script>

<template>
  <div class="flex h-screen w-full flex-col bg-gray-50">
    <aside
      :class="[
        'fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r border-neutral-200 bg-white transition-all duration-500 ease-in-out',
        isSidebarVisible ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <nav class="flex flex-col gap-1 p-4">
        <Logo />
        <div class="flex flex-col gap-1">
          <router-link
            v-for="menu in menus"
            :key="menu.to"
            :to="menu.to"
            v-slot="{ isActive }"
          >
            <div
              :class="[
                'flex items-center gap-4 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-300 ease-in-out',
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black',
              ]"
            >
              <component :is="menu.icon" class="h-4 w-4" />
              <span>{{ menu.name }}</span>
            </div>
          </router-link>
        </div>
      </nav>

      <div class="mt-auto p-4">
        <div
          class="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-5 text-white"
        >
          <div
            class="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-white/10"
          ></div>

          <div
            class="absolute -bottom-12 -left-10 h-24 w-24 rounded-full bg-sky-300/20"
          ></div>

          <div class="relative">
            <span class="text-sm leading-relaxed">
              Monitoring stok dan delivery order bahan ajar berbasis Vue.js.
            </span>

            <div class="flex justify-end p-2">
              <ChartNoAxesCombined size="35" />
            </div>
          </div>
        </div>
      </div>
    </aside>

    <div
      v-if="isSidebarVisible"
      class="fixed inset-0 z-30 bg-black/30 md:hidden"
      @click="isSidebarVisible = false"
    ></div>

    <div
      :class="[
        'flex flex-1 flex-col gap-4 overflow-y-auto p-5 transition-all duration-500 ease-in-out',
        isSidebarVisible ? 'md:ml-64' : 'ml-0',
      ]"
    >
      <div class="flex w-full items-center justify-between">
        <Button
          @click="isSidebarVisible = !isSidebarVisible"
          variant="outline"
          class="p-2 shadow-none"
        >
          <PanelRightOpen v-if="isSidebarVisible" size="16" />
          <PanelLeftOpen v-else size="16" />
        </Button>
        <DropdownMenu :user="authStore.user" @logout="handleLogout" />
      </div>

      <main class="flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>
