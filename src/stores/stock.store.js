import { ref, computed } from 'vue';
import dummyData from '../data/dataBahanAjar.json';

export function stockStore() {
  const stokData = ref(
    dummyData.stok.map((item, index) => ({
      ...structuredClone(item),
      id: crypto.randomUUID?.() || `stok-${index + 1}`,
    })),
  );

  const filters = ref({
    upbjj: '',
    kategori: '',
    stok: '',
    sortBy: 'judul',
  });

  const upbjjList = dummyData.upbjjList;
  const kategoriList = dummyData.kategoriList;

  const filteredSortedStok = computed(() => {
    let data = [...stokData.value];

    const { upbjj, kategori, stok, sortBy } = filters.value;

    const filterMap = {
      upbjj: (item) => item.upbjj === upbjj,
      kategori: (item) => item.kategori === kategori,
      menipis: (item) => item.qty < item.safety && item.qty > 0,
      kosong: (item) => item.qty === 0,
    };

    if (upbjj) data = data.filter(filterMap.upbjj);
    if (kategori) data = data.filter(filterMap.kategori);
    if (stok) data = data.filter(filterMap[stok]);

    const sorters = {
      judul: (a, b) => a.judul.localeCompare(b.judul),
      qty: (a, b) => a.qty - b.qty,
      harga: (a, b) => a.harga - b.harga,
    };

    data.sort(sorters[sortBy] ?? (() => 0));

    return data;
  });

  const addStock = (payload) => {
    stokData.value.unshift({
      id: crypto.randomUUID?.() || `stok-${Date.now()}`,
      ...payload,
    });
  };

  const updateStock = (id, updatedData) => {
    const index = stokData.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      stokData.value[index] = {
        ...stokData.value[index],
        ...updatedData,
        id: stokData.value[index].id,
      };
    }
  };

  const deleteStock = (id) => {
    stokData.value = stokData.value.filter((item) => item.id !== id);
  };

  const resetFilters = () => {
    filters.value = {
      upbjj: '',
      kategori: '',
      stok: '',
      sortBy: 'judul',
    };
  };

  return {
    stokData,
    filters,
    upbjjList,
    kategoriList,
    filteredSortedStok,
    resetFilters,
    deleteStock,
    addStock,
    updateStock,
  };
}
