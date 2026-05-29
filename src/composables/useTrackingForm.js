import { computed, ref, watch } from 'vue';

const FORM_DEFAULT = {
  nim: '',
  nama: '',
  ekspedisi: '',
  paketKode: '',
  tanggalKirim: new Date().toISOString().slice(0, 10),
  status: 'Diproses',
};

export function useTrackingForm(paketList = [], trackingData = []) {
  const form = ref({ ...FORM_DEFAULT });
  const errors = ref({});

  watch(
    form,
    (f) => {
      if (errors.value.nim && f.nim.trim()) {
        delete errors.value.nim;
      }

      if (errors.value.nama && f.nama.trim()) {
        delete errors.value.nama;
      }

      if (errors.value.ekspedisi && f.ekspedisi) {
        delete errors.value.ekspedisi;
      }

      if (errors.value.paketKode && f.paketKode) {
        delete errors.value.paketKode;
      }
    },
    { deep: true },
  );

  const selectedPaket = computed(() => {
    return paketList.find((item) => item.kode === form.value.paketKode);
  });

  const validate = () => {
    errors.value = {};

    const f = form.value;

    if (!f.nim.trim()) {
      errors.value.nim = 'NIM wajib diisi';
    } else {
      const isDuplicate = trackingData.some(
        (item) => item.nim.toLowerCase() === f.nim.toLowerCase(),
      );

      if (isDuplicate) {
        errors.value.nim = 'NIM sudah digunakan';
      }
    }

    if (!f.nama.trim()) {
      errors.value.nama = 'Nama wajib diisi';
    }

    if (!f.ekspedisi) {
      errors.value.ekspedisi = 'Ekspedisi wajib dipilih';
    }

    if (!f.paketKode) {
      errors.value.paketKode = 'Paket wajib dipilih';
    }

    return Object.keys(errors.value).length === 0;
  };

  const fill = (data) => {
    form.value = {
      ...FORM_DEFAULT,
      ...data,
    };
  };

  const reset = () => {
    form.value = {
      ...FORM_DEFAULT,
    };

    errors.value = {};
  };

  return {
    form,
    errors,
    selectedPaket,
    validate,
    fill,
    reset,
  };
}
