<script setup>
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { Plus, Search } from '@lucide/vue';
import Table from '../components/Table.vue';
import Button from '../components/Button.vue';
import Dialog from '../components/Dialog.vue';
import Label from '../components/Label.vue';
import Input from '../components/Input.vue';
import Pagination from '../components/Pagination.vue';
import { trackingStore } from '../stores/tracking.store.js';
import { useTrackingForm } from '../composables/useTrackingForm.js';
import { formatRupiah } from '../utils/formatRupiah.js';
import { formatTanggal } from '../utils/formatTanggal.js';

const {
  trackingData,
  pengirimanList,
  paketList,
  search,
  selectedTracking,
  generateDONumber,
  addTracking,
  getPaketNama,
} = trackingStore();

const { form, errors, selectedPaket, validate, reset } = useTrackingForm(
  paketList,
  trackingData.value,
);

const showCreateDialog = ref(false);

const tableColumns = [
  { key: 'noDO', label: 'Nomor DO' },
  { key: 'nim', label: 'NIM' },
  { key: 'nama', label: 'Nama' },
  { key: 'ekspedisi', label: 'Ekspedisi' },
  { key: 'paketNama', label: 'Paket' },
  { key: 'tanggalKirim', label: 'Tanggal Kirim' },
  { key: 'totalHarga', label: 'Total Harga' },
  { key: 'status', label: 'Status' },
];

const openDialog = () => {
  reset();
  showCreateDialog.value = true;
};

const closeDialog = () => {
  showCreateDialog.value = false;
  reset();
};

const handleAddTracking = () => {
  if (!validate()) return;

  const noDO = generateDONumber.value;

  addTracking({
    noDO,
    nim: form.value.nim,
    nama: form.value.nama,
    ekspedisi: form.value.ekspedisi,
    paketKode: form.value.paketKode,
    paketNama: getPaketNama(form.value.paketKode),
    tanggalKirim: form.value.tanggalKirim,
    totalHarga: selectedPaket.value?.harga || 0,
    status: form.value.status,
  });

  toast.success(`${noDO} berhasil ditambahkan!`);

  closeDialog();
};
</script>

<template>
  <section class="flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold tracking-tight text-gray-800">
          Tracking Delivery Order
        </h2>

        <p class="text-sm text-neutral-500">
          Daftar pengiriman bahan ajar mahasiswa
        </p>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative w-md">
          <Search
            size="18"
            class="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
          />

          <Input
            v-model="search"
            @keydown.esc="search = ''"
            placeholder="Cari berdasarkan NIM atau Nomor DO..."
            class="w-full bg-white pl-10"
          />
        </div>

        <Button @click="openDialog" class="flex items-center gap-2">
          <Plus size="16" />
          Tambah DO
        </Button>
      </div>
    </div>

    <div v-if="search.trim()">
      <div
        v-if="selectedTracking"
        class="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold text-neutral-800">
              {{ selectedTracking.noDO }}
            </h3>

            <p class="text-sm text-neutral-500">
              {{ selectedTracking.nama }} • {{ selectedTracking.nim }}
            </p>
          </div>

          <span
            class="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-500"
          >
            {{ selectedTracking.status }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-neutral-500">Ekspedisi</p>

            <p class="font-medium text-neutral-800">
              {{ selectedTracking.ekspedisi }}
            </p>
          </div>

          <div>
            <p class="text-neutral-500">Tanggal Kirim</p>

            <p class="font-medium text-neutral-800">
              {{ formatTanggal(selectedTracking.tanggalKirim) }}
            </p>
          </div>

          <div>
            <p class="text-neutral-500">Paket</p>

            <p class="font-medium text-neutral-800">
              {{ selectedTracking.paketNama }}
            </p>
          </div>

          <div>
            <p class="text-neutral-500">Total Harga</p>

            <p class="font-medium text-neutral-800">
              Rp{{ formatRupiah(selectedTracking.totalHarga) }}
            </p>
          </div>
        </div>

        <div class="">
          <h4 class="font-semibold text-neutral-800">Riwayat Pengiriman</h4>

          <div
            v-for="(item, index) in selectedTracking.perjalanan"
            :key="index"
            class="relative flex gap-4"
          >
            <div class="relative flex flex-col items-center pl-2">
              <div
                class="absolute top-4 z-10 h-3 w-3 rounded-full bg-blue-500"
              ></div>

              <div
                v-if="index !== selectedTracking.perjalanan.length - 1"
                class="absolute top-4 h-full w-px bg-neutral-300"
              ></div>
            </div>

            <div class="p-1.5">
              <p class="text-sm font-medium text-neutral-800">
                {{ item.keterangan }}
              </p>

              <p class="text-xs text-neutral-500">
                {{ item.waktu }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center"
      >
        <p class="text-sm text-neutral-500">Data tidak ditemukan</p>
      </div>
    </div>

    <Table v-else :columns="tableColumns" :data="trackingData">
      <template #cell-totalHarga="{ row }">
        <span> Rp{{ formatRupiah(row.totalHarga) }} </span>
      </template>

      <template #cell-tanggalKirim="{ row }">
        <span>
          {{ formatTanggal(row.tanggalKirim) }}
        </span>
      </template>

      <template #cell-status="{ row }">
        <span
          class="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-500"
        >
          {{ row.status }}
        </span>
      </template>
    </Table>

    <Pagination v-if="!search.trim()" :total="trackingData.length" />

    <Dialog v-model="showCreateDialog" title="Tambah Delivery Order" size="xl">
      <template #body>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <Label>NIM</Label>

            <Input
              v-model="form.nim"
              type="text"
              placeholder="Masukkan NIM"
              :class="errors.nim && 'border-red-500'"
            />

            <p v-if="errors.nim" class="text-sm text-red-500">
              {{ errors.nim }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Nama</Label>

            <Input
              v-model="form.nama"
              type="text"
              placeholder="Masukkan nama"
              :class="errors.nama && 'border-red-500'"
            />

            <p v-if="errors.nama" class="text-sm text-red-500">
              {{ errors.nama }}
            </p>
          </div>

          <div class="col-span-2 grid grid-cols-3 gap-4">
            <div class="space-y-1">
              <Label>Ekspedisi</Label>

              <select
                v-model="form.ekspedisi"
                :class="[
                  'flex h-10 w-full rounded-md border bg-gray-50 px-3 py-2 text-sm',
                  errors.ekspedisi ? 'border-red-500' : 'border-neutral-200',
                ]"
              >
                <option value="">Pilih Ekspedisi</option>

                <option
                  v-for="item in pengirimanList"
                  :key="item.kode"
                  :value="item.nama"
                >
                  {{ item.nama }}
                </option>
              </select>

              <p v-if="errors.ekspedisi" class="text-sm text-red-500">
                {{ errors.ekspedisi }}
              </p>
            </div>

            <div class="space-y-1">
              <Label>Paket</Label>

              <select
                v-model="form.paketKode"
                :class="[
                  'flex h-10 w-full rounded-md border bg-gray-50 px-3 py-2 text-sm',
                  errors.paketKode ? 'border-red-500' : 'border-neutral-200',
                ]"
              >
                <option value="">Pilih Paket</option>

                <option
                  v-for="item in paketList"
                  :key="item.kode"
                  :value="item.kode"
                >
                  {{ item.kode }} - {{ item.nama }}
                </option>
              </select>

              <p v-if="errors.paketKode" class="text-sm text-red-500">
                {{ errors.paketKode }}
              </p>
            </div>

            <div class="space-y-1">
              <Label>Tanggal Kirim</Label>

              <Input v-model="form.tanggalKirim" type="date" />
            </div>
          </div>

          <div
            v-if="selectedPaket"
            class="col-span-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
          >
            <p class="text-sm font-medium text-neutral-700">Isi Paket:</p>

            <ul class="mt-2 list-disc pl-5 text-sm text-neutral-600">
              <li v-for="isi in selectedPaket.isi" :key="isi">
                {{ isi }}
              </li>
            </ul>

            <p class="mt-3 text-sm font-semibold">
              Total Harga: Rp{{ formatRupiah(selectedPaket.harga) }}
            </p>
          </div>
        </div>
      </template>

      <template #footer>
        <Button variant="outline" @click="closeDialog"> Batal </Button>

        <Button @click="handleAddTracking"> Simpan </Button>
      </template>
    </Dialog>
  </section>
</template>
