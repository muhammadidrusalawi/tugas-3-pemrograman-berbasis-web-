<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
    <table class="min-w-full text-sm">
      <thead class="border-b border-neutral-200 bg-gray-50">
        <tr class="text-left text-gray-600">
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-3 font-medium"
            :class="col.headerClass"
          >
            {{ col.label }}
          </th>
          <th v-if="$slots.actions" class="px-4 py-3 font-medium">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-200">
        <tr
          v-for="(row, idx) in data"
          :key="row.id || idx"
          class="transition hover:bg-gray-50/60"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-2.5"
            :class="col.cellClass"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="px-4 py-2.5">
            <slot name="actions" :row="row" :index="idx" />
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td
            :colspan="columns.length + ($slots.actions ? 1 : 0)"
            class="py-8 text-center text-neutral-500"
          >
            Tidak ada data.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
