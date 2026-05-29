<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { authStore } from '../stores/auth.store.js';
import { Mail, Lock } from '@lucide/vue';

import Input from '../components/Input.vue';
import Label from '../components/Label.vue';
import Button from '../components/Button.vue';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = () => {
  const success = authStore.login(email.value, password.value);

  if (success) {
    router.push('/dashboard');
  }
};
</script>

<template>
  <section class="flex h-screen items-center justify-center bg-gray-50">
    <div
      class="flex w-full max-w-md flex-col gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div class="space-y-0.5">
        <h1 class="text-2xl font-bold">Login Page</h1>
        <p class="text-sm text-neutral-500">
          Please enter your credentials to login.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div class="space-y-1">
          <Label for="email">Email</Label>
          <div class="relative">
            <Mail
              size="18"
              class="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
            />
            <Input
              type="email"
              v-model="email"
              placeholder="Masukkan email anda"
              class="pl-10"
            />
          </div>
          <p
            v-if="authStore.errors.email"
            class="text-sm font-medium text-red-500"
          >
            {{ authStore.errors.email }}
          </p>
        </div>
        <div class="space-y-1">
          <Label for="password">Password</Label>
          <div class="relative">
            <Lock
              size="18"
              class="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
            />
            <Input
              type="password"
              v-model="password"
              placeholder="Masukkan password anda"
              class="pl-10"
            />
          </div>
          <p
            v-if="authStore.errors.password"
            class="text-sm font-medium text-red-500"
          >
            {{ authStore.errors.password }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <Input type="checkbox" class="h-3 w-3" />
            <Label for="remember-me">Ingat saya</Label>
          </div>
          <a
            href="#"
            class="text-sm font-medium text-neutral-700 hover:text-blue-500"
            >Lupa password?</a
          >
        </div>

        <Button type="submit" class="w-full py-2">Masuk</Button>
      </form>
    </div>
  </section>
</template>
