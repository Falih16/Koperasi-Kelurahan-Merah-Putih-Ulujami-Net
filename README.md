# Koperasi Kelurahan Merah Putih Ulujami — Netlify Ready (`netlify-deploy`)

Folder `netlify-deploy` ini merupakan paket **siap-deploy khusus untuk Netlify (Static Web Hosting)** yang telah dibersihkan secara menyeluruh dari seluruh file backend server yang berpotensi memicu error build di Netlify (seperti `Dockerfile`, `docker-compose.yml`, `.htaccess`, `index.php` root, maupun symlink Windows `public/storage`).

---

## 📁 Struktur File di Dalam `netlify-deploy/`

```text
netlify-deploy/
├── index.html            # Aplikasi Publik Lengkap (Beranda, Tentang Kami, Usaha, Produk, Pengurus, Pendaftaran WA, Kontak)
├── login.html            # Portal Login Pengurus & Admin 2 Kolom Responsif (/login)
├── admin.html            # Dashboard Admin Interaktif (/admin)
├── _redirects            # Konfigurasi Routing Netlify (Clean URLs: /login, /admin, SPA fallback)
├── README.md             # Panduan Deployment Netlify Lengkap
└── assets/
    ├── css/
    │   └── style.css     # Design System: Gradien Merah-Putih & Modern Institutional Minimalism
    └── js/
        ├── store.js      # Database Client-Side Persisten (localStorage) + Seed Data Koperasi Ulujami
        ├── public.js     # Controller Halaman Publik, Filter Katalog, Generator Kode REG & WhatsApp Direct
        └── admin.js      # Controller Dashboard Admin, Tindak Lanjut WA, CRUD & Pengaturan Logo
```

---

## 🚀 Panduan Deployment ke Netlify (Bebas Error)

Terdapat 2 (dua) metode mudah untuk mendeploy website ini ke Netlify:

### 🌟 METODE A: Netlify Drop (Paling Cepat & Tanpa Git)

Metode ini sangat cocok jika Anda ingin website langsung online dalam hitungan detik:

1. Buka browser dan kunjungi **[app.netlify.com/drop](https://app.netlify.com/drop)** (login atau daftar akun Netlify terlebih dahulu).
2. Di file explorer komputer Anda, buka folder proyek `koperasi_merah_putih-main`.
3. **Tarik dan lepas (drag-and-drop)** folder **`netlify-deploy`** langsung ke kotak area upload Netlify Drop di browser.
4. Netlify akan langsung mengunggah seluruh aset statis, membaca konfigurasi `_redirects`, dan memberikan URL live website (misal: `https://koperasi-merah-putih-ulujami.netlify.app`).
5. Website sudah aktif 100%! Anda dapat langsung membuka beranda, katalog produk, form pendaftaran WhatsApp, dan login ke portal admin.

---

### 🔄 METODE B: Menghubungkan Repositori Git (Continuous Deployment)

Metode ini direkomendasikan jika proyek dikelola melalui GitHub / GitLab:

1. Pastikan seluruh repositori sudah di-push ke GitHub. Di root proyek sudah disediakan file `netlify.toml` otomatis.
2. Buka dashboard **Netlify** → Klik tombol **"Add new site"** → Pilih **"Import an existing project"**.
3. Pilih penyedia Git Anda (**GitHub**) dan pilih repositori koperasi ini.
4. Pada bagian **Site configuration**:
   - **Base directory**: kosongkan (atau isi `.` jika diminta)
   - **Build command**: kosongkan (karena merupakan situs statis murni tanpa kompilasi)
   - **Publish directory**: `netlify-deploy`
5. Klik **"Deploy site"**.
6. Netlify akan secara otomatis membaca `netlify.toml` di root atau file `_redirects` di `netlify-deploy/`, menerapkan caching aset 1 tahun pada `/assets/*`, dan mengatur routing clean URL `/login` serta `/admin`.

---

## 🔐 Akses Login Pengurus / Admin

Portal pengurus dilengkapi keamanan antarmuka modern (desain 2 kolom, perlindungan rate-limit 5x percobaan gagal, serta toggle tampil/sembunyi sandi):

- **Halaman Login**: `/login` (atau buka file `login.html`)
- **Username**: `admin` (atau `admin@koperasimerahputih-ulujami.id`)
- **Kata Sandi**: `password123` (atau `admin123`)

---

## 🛡️ Fitur Unggulan & Privasi Terjamin

1. **Perlindungan Privasi Anggota (Anti-NIK Leak)**:
   - Formulir pendaftaran publik tidak meminta input NIK atau upload KTP secara terbuka.
   - Sistem menghasilkan kode pendaftaran otomatis berformat `REG-KMPU-YYYYMMDD-XXXX`.
   - Warga langsung diarahkan ke WhatsApp resmi pengurus untuk verifikasi berkas secara personal.

2. **Panel Tindak Lanjut WhatsApp di Admin**:
   - Pengurus dapat mengelola status pendaftaran (Menunggu, Dihubungi, Terverifikasi, Ditolak).
   - Disediakan 4 template balasan pesan WhatsApp otomatis (Verifikasi, Undangan Tatap Muka, Dokumen Kurang, Konfirmasi Selesai).

3. **Design System Gradien Merah-Putih**:
   - Gradien elegan `--gradient-merah-putih`, `--gradient-hero`, `--gradient-merah`, dan footer merah tua (*burgundy*) yang mencerminkan identitas kebangsaan dan profesionalisme koperasi.

4. **Kemandirian State (`localStorage`)**:
   - Seluruh data awal (profil koperasi, unit usaha, produk sembako & UMKM, struktur pengurus) sudah tersinkronisasi otomatis dengan standar data koperasi.
   - Perubahan data yang dilakukan pengurus di panel admin tersimpan aman di browser masing-masing tanpa memerlukan database server tambahan.
