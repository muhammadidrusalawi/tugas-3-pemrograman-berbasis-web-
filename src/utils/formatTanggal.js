export const formatTanggal = (value) => {
  const tanggal = new Date(value);

  const bulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return `${tanggal.getDate()} ${
    bulan[tanggal.getMonth()]
  } ${tanggal.getFullYear()}`;
};
