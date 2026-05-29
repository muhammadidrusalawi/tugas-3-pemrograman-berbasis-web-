<script setup>
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { Plus, PencilLine, Trash2 } from '@lucide/vue';
import Button from '../components/Button.vue';
import Table from '../components/Table.vue';
import Label from '../components/Label.vue';
import Dialog from '../components/Dialog.vue';
import Input from '../components/Input.vue';
import Tooltip from '../components/Tooltip.vue';
import Pagination from '../components/Pagination.vue';
import StatusBadge from '../components/StatusBadge.vue';
import { stockStore } from '../stores/stock.store.js';
import { useStockForm } from '../composables/useStockForm.js';
import { formatRupiah } from '../utils/formatRupiah.js';

const {
  filters,
  upbjjList,
  kategoriList,
  filteredSortedStok,
  stokData,
  resetFilters,
  deleteStock,
  addStock,
  updateStock,
} = stockStore();

const { form, errors, validate, fill, reset } = useStockForm();

const tableColumns = [
  { key: 'kode', label: 'Kode' },
  { key: 'judul', label: 'Judul' },
  { key: 'kategori', label: 'Kategori' },
  { key: 'upbjj', label: 'UPBJJ' },
  { key: 'lokasiRak', label: 'Rak' },
  { key: 'harga', label: 'Harga' },
  { key: 'qty', label: 'Qty' },
  { key: 'safety', label: 'Safety' },
  { key: 'status', label: 'Status' },
];

const dialog = ref({
  open: false,
  type: 'create',
  stock: null,
});

const openDialog = (type, stock = null) => {
  dialog.value = {
    open: true,
    type,
    stock,
  };

  if (type === 'create') {
    reset();
    return;
  }

  if (stock) {
    fill(stock);
  }
};

const closeDialog = () => {
  dialog.value.open = false;
  dialog.value.stock = null;

  reset();
};

const handleSubmit = () => {
  const currentId =
    dialog.value.type === 'edit' ? dialog.value.stock?.id : null;

  if (!validate(stokData.value, currentId)) return;

  if (dialog.value.type === 'create') {
    addStock({ ...form.value });

    toast.success(
      `${form.value.kode} - ${form.value.judul} berhasil ditambahkan!`,
    );
  }

  if (dialog.value.type === 'edit') {
    updateStock(dialog.value.stock.id, { ...form.value });

    toast.success(
      `${form.value.kode} - ${form.value.judul} berhasil diperbarui!`,
    );
  }

  closeDialog();
};

const handleDelete = () => {
  const stock = dialog.value.stock;

  if (!stock) return;

  deleteStock(stock.id);

  toast.success(`${stock.kode} - ${stock.judul} berhasil dihapus!`);

  closeDialog();
};
</script>

<template>
  <section class="flex flex-col gap-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold tracking-tight text-gray-800">
          Manajemen Stok Bahan Ajar
        </h2>

        <p class="text-sm text-neutral-500">
          Daftar bahan ajar yang ada di inventaris
        </p>
      </div>

      <Button @click="openDialog('create')" class="flex items-center gap-2">
        <Plus size="16" />
        Tambah Bahan Ajar
      </Button>
    </div>

    <!-- Filter -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="space-y-1">
        <Label>UPBJJ</Label>

        <select
          v-model="filters.upbjj"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Semua Daerah</option>

          <option v-for="ut in upbjjList" :key="ut" :value="ut">
            {{ ut }}
          </option>
        </select>
      </div>

      <div class="space-y-1">
        <Label>Kategori</Label>

        <select
          v-model="filters.kategori"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Semua Kategori</option>

          <option v-for="kat in kategoriList" :key="kat" :value="kat">
            {{ kat }}
          </option>
        </select>
      </div>

      <div class="space-y-1">
        <Label>Filter Stok</Label>

        <select
          v-model="filters.stok"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Semua Stok</option>
          <option value="menipis">Menipis</option>
          <option value="kosong">Kosong</option>
        </select>
      </div>

      <div class="space-y-1">
        <Label>Urutkan</Label>

        <div class="flex gap-2">
          <select
            v-model="filters.sortBy"
            class="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="judul">Judul (A-Z)</option>
            <option value="qty">Stok (Qty)</option>
            <option value="harga">Harga (Rp)</option>
          </select>

          <Button @click="resetFilters" variant="outline"> Reset </Button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <Table :columns="tableColumns" :data="filteredSortedStok">
      <template #cell-status="{ row }">
        <Tooltip :content="row.catatanHTML">
          <StatusBadge :qty="row.qty" :safety="row.safety" />
        </Tooltip>
      </template>

      <template #cell-harga="{ row }">
        <span> Rp{{ formatRupiah(row.harga) }} </span>
      </template>

      <template #actions="{ row }">
        <div class="flex items-center gap-2">
          <Button
            @click="openDialog('edit', row)"
            variant="secondary"
            class="p-2"
          >
            <PencilLine size="12" />
          </Button>

          <Button
            @click="openDialog('delete', row)"
            variant="destructive"
            class="p-2"
          >
            <Trash2 size="12" />
          </Button>
        </div>
      </template>
    </Table>

    <Pagination :total="filteredSortedStok.length" />

    <!-- Form Dialog -->
    <Dialog
      v-if="dialog.type !== 'delete'"
      v-model="dialog.open"
      :title="
        dialog.type === 'create' ? 'Tambah Bahan Ajar' : 'Edit Bahan Ajar'
      "
      size="xl"
    >
      <template #body>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <Label>Kode Bahan Ajar</Label>

            <Input
              type="text"
              v-model="form.kode"
              placeholder="Masukkan kode bahan ajar"
              :class="errors.kode && 'border-red-500'"
            />

            <p v-if="errors.kode" class="text-sm text-red-500">
              {{ errors.kode }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Judul Bahan Ajar</Label>

            <Input
              type="text"
              v-model="form.judul"
              placeholder="Masukkan judul bahan ajar"
              :class="errors.judul && 'border-red-500'"
            />

            <p v-if="errors.judul" class="text-sm text-red-500">
              {{ errors.judul }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Kategori</Label>

            <select
              v-model="form.kategori"
              :class="[
                'flex h-10 w-full rounded-md border bg-gray-50 px-3 py-2 text-sm',
                errors.kategori ? 'border-red-500' : 'border-neutral-200',
              ]"
            >
              <option value="">Pilih Kategori</option>

              <option v-for="kat in kategoriList" :key="kat" :value="kat">
                {{ kat }}
              </option>
            </select>

            <p v-if="errors.kategori" class="text-sm text-red-500">
              {{ errors.kategori }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>UPBJJ</Label>

            <select
              v-model="form.upbjj"
              :class="[
                'flex h-10 w-full rounded-md border bg-gray-50 px-3 py-2 text-sm',
                errors.upbjj ? 'border-red-500' : 'border-neutral-200',
              ]"
            >
              <option value="">Pilih UPBJJ</option>

              <option v-for="ut in upbjjList" :key="ut" :value="ut">
                {{ ut }}
              </option>
            </select>

            <p v-if="errors.upbjj" class="text-sm text-red-500">
              {{ errors.upbjj }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Lokasi Rak</Label>

            <Input
              type="text"
              v-model="form.lokasiRak"
              placeholder="Masukkan lokasi rak"
              :class="errors.lokasiRak && 'border-red-500'"
            />

            <p v-if="errors.lokasiRak" class="text-sm text-red-500">
              {{ errors.lokasiRak }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Harga</Label>

            <Input
              type="number"
              v-model.number="form.harga"
              placeholder="Masukkan harga"
              :class="errors.harga && 'border-red-500'"
            />

            <p v-if="errors.harga" class="text-sm text-red-500">
              {{ errors.harga }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Quantity</Label>

            <Input
              type="number"
              v-model.number="form.qty"
              placeholder="Masukkan quantity"
              :class="errors.qty && 'border-red-500'"
            />

            <p v-if="errors.qty" class="text-sm text-red-500">
              {{ errors.qty }}
            </p>
          </div>

          <div class="space-y-1">
            <Label>Safety Stock</Label>

            <Input
              type="number"
              v-model.number="form.safety"
              placeholder="Masukkan safety stok"
              :class="errors.safety && 'border-red-500'"
            />

            <p v-if="errors.safety" class="text-sm text-red-500">
              {{ errors.safety }}
            </p>
          </div>

          <div class="col-span-2 space-y-1">
            <Label>Catatan HTML</Label>

            <textarea
              v-model="form.catatanHTML"
              rows="5"
              placeholder="Masukkan catatan HTML..."
              class="w-full rounded-md border border-neutral-200 bg-gray-50 px-3 py-2 text-sm"
            />

            <p class="text-xs text-neutral-500">
              Contoh: &lt;b&gt;Stok prioritas&lt;/b&gt; atau &lt;span
              style='color:red'&gt;Segera restock&lt;/span&gt;
            </p>
          </div>
        </div>
      </template>

      <template #footer>
        <Button variant="outline" @click="closeDialog"> Batal </Button>

        <Button @click="handleSubmit">
          {{ dialog.type === 'create' ? 'Simpan' : 'Perbarui' }}
        </Button>
      </template>
    </Dialog>

    <!-- Delete Dialog -->
    <Dialog
      v-else
      v-model="dialog.open"
      title="Apakah Anda benar-benar yakin?"
      size="lg"
    >
      <template #body>
        <p class="text-sm leading-relaxed text-neutral-500">
          Tindakan ini tidak dapat dibatalkan. Data bahan ajar

          <span class="font-semibold text-black">
            {{ dialog.stock?.kode }}
          </span>

          <span class="pl-1 font-semibold text-black">
            {{ dialog.stock?.judul }}
          </span>

          akan dihapus secara permanen dari sistem.
        </p>
      </template>

      <template #footer>
        <Button variant="outline" @click="closeDialog"> Batal </Button>

        <Button variant="destructive" @click="handleDelete"> Hapus </Button>
      </template>
    </Dialog>
  </section>
</template>
