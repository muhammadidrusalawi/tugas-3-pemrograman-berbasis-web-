import { ref, watch } from 'vue';

const FORM_DEFAULT = {
  kode: '',
  judul: '',
  kategori: '',
  upbjj: '',
  lokasiRak: '',
  harga: 0,
  qty: 0,
  safety: 0,
  catatanHTML: '',
};

export function useStockForm() {
  const form = ref({ ...FORM_DEFAULT });
  const errors = ref({});

  watch(
    form,
    (f) => {
      if (errors.value.kode && f.kode.trim()) delete errors.value.kode;
      if (errors.value.judul && f.judul.trim()) delete errors.value.judul;
      if (errors.value.kategori && f.kategori) delete errors.value.kategori;
      if (errors.value.upbjj && f.upbjj) delete errors.value.upbjj;
      if (errors.value.lokasiRak && f.lokasiRak.trim())
        delete errors.value.lokasiRak;
      if (errors.value.harga && f.harga > 0) delete errors.value.harga;
      if (errors.value.qty && f.qty >= 0) delete errors.value.qty;
      if (errors.value.safety && f.safety >= 0) delete errors.value.safety;
    },
    { deep: true },
  );

  const validate = (stocks = [], currentId = null) => {
    errors.value = {};
    const f = form.value;

    if (!f.kode.trim()) {
      errors.value.kode = 'Kode bahan ajar wajib diisi';
    } else {
      const isDuplicate = stocks.some(
        (item) =>
          item.kode.toLowerCase() === f.kode.toLowerCase() &&
          item.id !== currentId,
      );

      if (isDuplicate) {
        errors.value.kode = 'Kode bahan ajar sudah digunakan';
      }
    }

    if (!f.judul.trim()) errors.value.judul = 'Judul bahan ajar wajib diisi';
    if (!f.kategori) errors.value.kategori = 'Kategori wajib dipilih';
    if (!f.upbjj) errors.value.upbjj = 'UPBJJ wajib dipilih';
    if (!f.lokasiRak.trim()) errors.value.lokasiRak = 'Lokasi rak wajib diisi';
    if (f.harga <= 0) errors.value.harga = 'Harga harus lebih dari 0';
    if (f.qty < 0) errors.value.qty = 'Quantity tidak boleh negatif';
    if (f.safety < 0) errors.value.safety = 'Safety stock tidak boleh negatif';

    return Object.keys(errors.value).length === 0;
  };

  const fill = (data) => {
    form.value = { ...FORM_DEFAULT, ...data };
  };
  const reset = () => {
    form.value = { ...FORM_DEFAULT };
    errors.value = {};
  };

  return { form, errors, validate, fill, reset };
}
