import { reactive } from 'vue';
import dataPengguna from '../data/dataPengguna.json';
import { toast } from 'vue-sonner';

export const authStore = reactive({
  user: JSON.parse(localStorage.getItem('user')) || null,

  errors: {
    email: '',
    password: '',
  },

  login(email, password) {
    this.errors.email = '';
    this.errors.password = '';

    if (!email) {
      this.errors.email = 'Email wajib diisi';
    }

    if (!password) {
      this.errors.password = 'Password wajib diisi';
    }

    if (this.errors.email || this.errors.password) {
      return false;
    }

    const user = dataPengguna.find(
      (item) => item.email === email && item.password === password,
    );

    if (!user) {
      toast.error('Email atau password salah!');
      return false;
    }

    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Login berhasil!');
    return true;
  },

  logout() {
    this.user = null;

    localStorage.removeItem('user');
    toast.success('Logout berhasil!');
    return true;
  },
});
