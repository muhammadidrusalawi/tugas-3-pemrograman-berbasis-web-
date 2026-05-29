import { computed, ref } from 'vue';
import dummyData from '../data/dataBahanAjar.json';

export function trackingStore() {
  const pengirimanList = dummyData.pengirimanList;
  const paketList = dummyData.paket;

  const getPaketNama = (kode) => {
    const paket = paketList.find((item) => item.kode === kode);

    return paket?.nama || '-';
  };

  const trackingData = ref(
    dummyData.tracking.map((item, index) => {
      const [noDO, data] = Object.entries(item)[0];

      return {
        id: crypto.randomUUID?.() || `tracking-${index + 1}`,
        noDO,
        nim: data.nim,
        nama: data.nama,
        ekspedisi: data.ekspedisi,
        paketKode: data.paket,
        paketNama: getPaketNama(data.paket),
        tanggalKirim: data.tanggalKirim,
        totalHarga: data.total,
        status: data.status,
        perjalanan: data.perjalanan || [],
      };
    }),
  );

  const search = ref('');

  const selectedTracking = computed(() => {
    if (!search.value.trim()) return null;

    const keyword = search.value.toLowerCase();

    return trackingData.value.find(
      (item) =>
        item.noDO.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword),
    );
  });

  const generateDONumber = computed(() => {
    const year = new Date().getFullYear();

    const currentYearData = trackingData.value.filter((item) =>
      item.noDO.startsWith(`DO${year}-`),
    );

    let maxNumber = 0;

    currentYearData.forEach((item) => {
      const sequence = parseInt(item.noDO.split('-')[1]);

      if (sequence > maxNumber) {
        maxNumber = sequence;
      }
    });

    return `DO${year}-${String(maxNumber + 1).padStart(4, '0')}`;
  });

  const addTracking = (payload) => {
    trackingData.value.unshift({
      id: crypto.randomUUID?.() || `tracking-${Date.now()}`,
      ...payload,
    });
  };

  return {
    trackingData,
    pengirimanList,
    paketList,
    search,
    selectedTracking,
    generateDONumber,
    addTracking,
    getPaketNama,
  };
}
