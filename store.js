/**
 * KMPUStore — Pusat Data & State Aplikasi
 * Koperasi Kelurahan Merah Putih Ulujami (Netlify Ready Edition)
 * Menyimpan seluruh data aplikasi secara persisten di localStorage browser
 * dengan data awal identik dengan KoperasiUlujamiSeeder.php.
 */

(function (window) {
    'use strict';

    const STORAGE_KEY = 'kmpu_ulujami_store_v1';
    const AUTH_KEY = 'kmpu_ulujami_auth_v1';

    const DEFAULT_DATA = {
        settings: {
            nama_koperasi: 'Koperasi Kelurahan Merah Putih Ulujami',
            subjudul_koperasi: 'KELURAHAN ULUJAMI',
            logo_url: '',
            logo_alt_text: 'Logo Resmi Koperasi Kelurahan Merah Putih Ulujami',
            desktop_logo_size: 46,
            mobile_logo_size: 38,
            logo_shape: 'lingkaran', // lingkaran | persegi | otomatis
            logo_spacing: 12,
            tagline: 'Tumbuh Bersama, Menguatkan Ekonomi Ulujami',
            sejarah: 'Koperasi Kelurahan Merah Putih Ulujami didirikan berlandaskan semangat gotong royong dan kekeluargaan masyarakat Kelurahan Ulujami, Kecamatan Pesanggrahan, Jakarta Selatan. Berawal dari perkumpulan pelaku UMKM, pedagang pasar, dan tokoh masyarakat setempat yang menginginkan wadah ekonomi bersama yang transparan, mandiri, dan berkeadilan. Koperasi ini berkomitmen menggerakkan potensi lokal, memperluas akses pasar bagi warga, serta menyediakan pemenuhan kebutuhan pokok dengan harga terjangkau.',
            visi: 'Menjadi koperasi kelurahan percontohan di Jakarta yang berdaya saing tinggi, inklusif, mandiri, dan terpercaya dalam mewujudkan kesejahteraan ekonomi masyarakat Ulujami.',
            misi: '1. Menumbuhkan dan mendampingi unit-unit usaha produktif warga serta pelaku UMKM lokal.\n2. Menyediakan kebutuhan pokok berkualitas dan layanan distribusi terpadu bagi warga.\n3. Mengembangkan tata kelola koperasi yang transparan, profesional, dan berbasis teknologi digital.\n4. Menjalin kemitraan strategis dengan pemerintah, sektor swasta, dan jejaring ekonomi kerakyatan.',
            alamat_sekretariat: 'Jl. Ulujami Raya No. 12, RT 004 / RW 05, Kelurahan Ulujami, Kecamatan Pesanggrahan, Kota Jakarta Selatan, DKI Jakarta 12250',
            kelurahan: 'Ulujami',
            kecamatan: 'Pesanggrahan',
            kota: 'Jakarta Selatan',
            jam_pelayanan: 'Senin – Jumat: 08.00 – 16.00 WIB | Sabtu: 08.30 – 12.30 WIB',
            telepon: '(021) 7388-1945',
            whatsapp: '081298765432',
            wa_registration_enabled: true,
            wa_registration_button_label: 'Daftar Menjadi Anggota melalui WhatsApp',
            wa_registration_description: 'Untuk menjaga keamanan data pribadi warga, pendaftaran anggota dilakukan langsung bersama pengurus melalui WhatsApp tanpa perlu mengunggah foto KTP atau mengisi NIK di website publik.',
            wa_registration_message: 'Halo Pengurus {nama_koperasi},\n\nSaya ingin mendaftar menjadi anggota koperasi.\n\nKode Referensi: *{nomor_registrasi}*\nNama Lengkap: {nama}\nNo. WhatsApp: {whatsapp}\nDomisili RT/RW: {domisili}\nJenis Keanggotaan: {jenis_keanggotaan}\nKeperluan / Usaha: {catatan}\n\nMohon informasi langkah verifikasi selanjutnya. Terima kasih.',
            email_resmi: 'sekretariat@koperasimerahputih-ulujami.id',
            admin_notification_email: 'admin@koperasimerahputih-ulujami.id',
            legalitas: 'Koperasi Berbadan Hukum / Dalam Proses Pembinaan resmi Kelurahan Ulujami & Sudin PPKUKM Jakarta Selatan',
            maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.298177488836!2d106.7570!3d-6.2570!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0e34c9c1181%3A0x6b1b46a2a078d467!2sUlujami%2C%20Pesanggrahan%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid'
        },
        businessUnits: [
            {
                id: 1,
                slug: 'perdagangan-sembako-kebutuhan-pokok',
                nama: 'Perdagangan Sembako & Kebutuhan Pokok',
                deskripsi_singkat: 'Penyediaan beras, minyak goreng, gula, dan sembako berkualitas dengan harga stabil untuk ketahanan pangan warga.',
                deskripsi_lengkap: 'Unit Perdagangan Sembako Koperasi Merah Putih Ulujami hadir untuk memastikan warga mendapatkan pasokan bahan kebutuhan pokok dengan jaminan kualitas tinggi dan harga yang terjangkau. Koperasi bekerja sama langsung dengan distributor resmi dan petani lokal guna memangkas rantai distribusi serta menjaga stabilitas harga di wilayah Kelurahan Ulujami.',
                foto_sampul: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
                ikon: 'bi-bag-check',
                kontak_publik: '081298765432',
                urutan: 1,
                tampil_beranda: true,
                is_published: true
            },
            {
                id: 2,
                slug: 'galeri-pemberdayaan-umkm',
                nama: 'Galeri & Pemberdayaan UMKM',
                deskripsi_singkat: 'Wadah promosi, kurasi produk, dan penjualan karya pelaku usaha mikro, kecil, dan menengah asli Ulujami.',
                deskripsi_lengkap: 'Unit Galeri & Pemberdayaan UMKM bertujuan memajukan produk unggulan warga Ulujami, mulai dari produk kuliner olahan, camilan khas, kerajinan tangan, hingga konveksi rumahan. Koperasi memberikan pendampingan standardisasi, pengemasan, serta akses pemasaran daring dan pameran kelurahan.',
                foto_sampul: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
                ikon: 'bi-shop',
                kontak_publik: '081298765433',
                urutan: 2,
                tampil_beranda: true,
                is_published: true
            },
            {
                id: 3,
                slug: 'jasa-layanan-masyarakat',
                nama: 'Jasa & Layanan Masyarakat',
                deskripsi_singkat: 'Fasilitas pembayaran digital (PPOB), layanan pengiriman barang, dan bantuan administrasi usaha warga.',
                deskripsi_lengkap: 'Unit Jasa dan Layanan Masyarakat melayani pembayaran tagihan listrik PLN, air PDAM, BPJS Kesehatan, pulsa, token listrik, hingga jasa penunjang kegiatan sosial ekonomi masyarakat sekitar dengan biaya ramah kantong dan pelayanan transparan.',
                foto_sampul: 'https://images.unsplash.com/photo-1556742049-0a67c5574293?auto=format&fit=crop&w=800&q=80',
                ikon: 'bi-credit-card-2-front',
                kontak_publik: '081298765434',
                urutan: 3,
                tampil_beranda: true,
                is_published: true
            },
            {
                id: 4,
                slug: 'distribusi-pemasaran-lokal',
                nama: 'Distribusi & Pemasaran Komunitas',
                deskripsi_singkat: 'Jejaring logistik antar-RT/RW untuk pengiriman pesanan cepat dan hemat bagi anggota koperasi.',
                deskripsi_lengkap: 'Menghubungkan produsen warga langsung ke konsumen tetangga dengan sistem distribusi berbasis kurir lokal yang memberdayakan pemuda Karang Taruna serta armada mandiri kelurahan.',
                foto_sampul: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                ikon: 'bi-truck',
                kontak_publik: '081298765435',
                urutan: 4,
                tampil_beranda: true,
                is_published: true
            }
        ],
        categories: [
            {
                id: 1,
                slug: 'bahan-pokok-pangan',
                nama: 'Bahan Pokok & Pangan',
                deskripsi: 'Komoditas pokok sehari-hari seperti beras, minyak goreng, gula, dan telur.'
            },
            {
                id: 2,
                slug: 'kuliner-olahan-umkm',
                nama: 'Kuliner & Camilan UMKM',
                deskripsi: 'Olahan pangan siap saji, frozen food, dan camilan renyah produksi warga Ulujami.'
            },
            {
                id: 3,
                slug: 'kerajinan-karya-warga',
                nama: 'Kerajinan & Karya Warga',
                deskripsi: 'Produk kreatif buatan tangan, rajutan, kain batik, dan perlengkapan rumah tangga.'
            }
        ],
        products: [
            {
                id: 1,
                slug: 'beras-merah-putih-premium-5kg',
                business_unit_id: 1,
                product_category_id: 1,
                nama: 'Beras Merah Putih Premium 5 Kg',
                harga: 72000,
                deskripsi_singkat: 'Beras pulen pilihan hasil kemitraan koperasi dengan petani, tanpa pemutih dan tanpa pengawet.',
                deskripsi_lengkap: 'Beras Merah Putih Premium dikemas higienis ukuran 5 kg. Butir beras utuh, aroma wangi alami, dan bertekstur pulen lembut saat dimasak. Sangat cocok untuk konsumsi harian keluarga sehat di Ulujami.',
                foto: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
                status_ketersediaan: 'tersedia',
                stok: 150,
                is_featured: true,
                is_published: true,
                urutan: 1
            },
            {
                id: 2,
                slug: 'minyak-goreng-sawit-merah-putih-2l',
                business_unit_id: 1,
                product_category_id: 1,
                nama: 'Minyak Goreng Sawit Koperasi 2 Liter',
                harga: 33500,
                deskripsi_singkat: 'Minyak goreng jernih 2 kali penyaringan, tahan panas, dan hemat untuk menggoreng renyah.',
                deskripsi_lengkap: 'Minyak goreng kemasan bantal/pouch 2 liter hasil kemitraan distribusi koperasi. Menghasilkan gorengan renyah keemasan, tidak cepat menghitam, dan kaya vitamin A.',
                foto: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
                status_ketersediaan: 'tersedia',
                stok: 120,
                is_featured: true,
                is_published: true,
                urutan: 2
            },
            {
                id: 3,
                slug: 'gula-pasir-kristal-putih-1kg',
                business_unit_id: 1,
                product_category_id: 1,
                nama: 'Gula Pasir Kristal Putih 1 Kg',
                harga: 17500,
                deskripsi_singkat: 'Gula pasir tebu alami, manis bersih, dan larut sempurna untuk minuman maupun masakan.',
                deskripsi_lengkap: 'Gula pasir kristal putih kualitas premium dari tebu segar pilihan. Dikelola langsung melalui stok koperasi untuk menjaga kestabilan harga kebutuhan dapur warga.',
                foto: 'https://images.unsplash.com/photo-1622484214149-6e3e56c808bd?auto=format&fit=crop&w=800&q=80',
                status_ketersediaan: 'tersedia',
                stok: 85,
                is_featured: false,
                is_published: true,
                urutan: 3
            },
            {
                id: 4,
                slug: 'keripik-tempe-renyah-ulujami-200g',
                business_unit_id: 2,
                product_category_id: 2,
                nama: 'Keripik Tempe Aneka Rasa Bu RT Ulujami',
                harga: 15000,
                deskripsi_singkat: 'Camilan tempe gurih renyah dengan daun jeruk harum khas olahan ibu-ibu warga Ulujami.',
                deskripsi_lengkap: 'Dibuat dari kedelai pilihan dan bumbu rempah tradisional tanpa bahan pengawet. Gurih, renyah, dan diproses dengan minyak baru sehingga tidak gatal di tenggorokan.',
                foto: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
                status_ketersediaan: 'tersedia',
                stok: 60,
                is_featured: true,
                is_published: true,
                urutan: 4
            },
            {
                id: 5,
                slug: 'kopi-bubuk-robusta-merah-putih-250g',
                business_unit_id: 2,
                product_category_id: 2,
                nama: 'Kopi Bubuk Robusta Merah Putih 250g',
                harga: 28000,
                deskripsi_singkat: 'Kopi tubruk harum dan mantap dengan tingkat roasting medium-dark untuk teman ronda dan kerja.',
                deskripsi_lengkap: 'Biji kopi pilihan yang disangrai dengan cermat oleh barista muda binaan koperasi. Menghasilkan rasa cokelat karamel yang tebal dan nikmat dinikmati pagi maupun malam.',
                foto: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
                status_ketersediaan: 'stok_terbatas',
                stok: 15,
                is_featured: true,
                is_published: true,
                urutan: 5
            }
        ],
        officers: [
            {
                id: 1,
                nama_lengkap: 'Drs. H. Mulyadi, M.M.',
                jabatan: 'Ketua Koperasi',
                is_ketua: true,
                periode: '2024 – 2027',
                foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                deskripsi: 'Memimpin arah kebijakan strategis koperasi, pengawasan tata kelola, dan menjalin kemitraan dengan pemangku kepentingan kelurahan serta dinas terkait.',
                kontak_publik: 'ketua@koperasimerahputih-ulujami.id',
                urutan: 1,
                is_published: true
            },
            {
                id: 2,
                nama_lengkap: 'Dewi Lestari, S.E.',
                jabatan: 'Sekretaris',
                is_ketua: false,
                periode: '2024 – 2027',
                foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
                deskripsi: 'Mengelola administrasi keanggotaan, arsip persuratan resmi, komunikasi publik, dan sistem pendaftaran anggota koperasi.',
                kontak_publik: 'sekretaris@koperasimerahputih-ulujami.id',
                urutan: 2,
                is_published: true
            },
            {
                id: 3,
                nama_lengkap: 'Ahmad Fauzi, S.Ak.',
                jabatan: 'Bendahara',
                is_ketua: false,
                periode: '2024 – 2027',
                foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
                deskripsi: 'Bertanggung jawab atas pembukuan kas, transparansi laporan keuangan, pengelolaan arus kas, dan akuntabilitas keuangan koperasi.',
                kontak_publik: 'keuangan@koperasimerahputih-ulujami.id',
                urutan: 3,
                is_published: true
            },
            {
                id: 4,
                nama_lengkap: 'H. Bambang Irawan',
                jabatan: 'Ketua Dewan Pengawas',
                is_ketua: false,
                periode: '2024 – 2027',
                foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
                deskripsi: 'Melakukan pengawasan independen terhadap pelaksanaan anggaran dasar/anggaran rumah tangga serta operasional pengurus.',
                kontak_publik: 'pengawas@koperasimerahputih-ulujami.id',
                urutan: 4,
                is_published: true
            },
            {
                id: 5,
                nama_lengkap: 'Rini Kusumawardhani, S.Pd.',
                jabatan: 'Manajer Pengembangan Usaha & UMKM',
                is_ketua: false,
                periode: '2024 – 2027',
                foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
                deskripsi: 'Mengkoordinasikan kurasi produk UMKM warga, kemitraan rantai pasok sembako, dan promosi katalog produk koperasi.',
                kontak_publik: 'usaha@koperasimerahputih-ulujami.id',
                urutan: 5,
                is_published: true
            }
        ],
        applications: [
            {
                id: 1,
                nomor_registrasi: 'REG-KMPU-20261015-0012',
                tanggal_kontak: '2026-10-22T09:15:00Z',
                sumber_pendaftaran: 'WhatsApp',
                nama_lengkap: 'Hadi Sucipto',
                nomor_hp_wa: '081388776655',
                domisili: 'RT 004 / RW 05, Ulujami',
                jenis_keanggotaan: 'Anggota Biasa',
                alasan_bergabung: 'Ingin berpartisipasi dalam unit sembako dan simpan pinjam warga.',
                status_verifikasi: 'menunggu_verifikasi',
                jadwal_tindak_lanjut: '2026-10-25',
                catatan_admin: 'Calon anggota telah menghubungi melalui WhatsApp dan dijadwalkan verifikasi persyaratan di sekretariat.'
            },
            {
                id: 2,
                nomor_registrasi: 'REG-KMPU-20261016-0045',
                tanggal_kontak: '2026-10-20T14:30:00Z',
                sumber_pendaftaran: 'WhatsApp',
                nama_lengkap: 'Nurul Hidayati',
                nomor_hp_wa: '085712345678',
                domisili: 'RT 007 / RW 03, Ulujami',
                jenis_keanggotaan: 'Anggota Luar Biasa (Mitra Usaha)',
                alasan_bergabung: 'Memiliki usaha kuliner rumahan dan ingin menitipkan produk di Galeri UMKM koperasi.',
                status_verifikasi: 'perlu_tindak_lanjut',
                jadwal_tindak_lanjut: '2026-10-26',
                catatan_admin: 'Data administrasi awal telah dikonfirmasi. Dijadwalkan pertemuan singkat di sekretariat koperasi.'
            },
            {
                id: 3,
                nomor_registrasi: 'REG-KMPU-20261010-0008',
                tanggal_kontak: '2026-10-12T10:00:00Z',
                sumber_pendaftaran: 'WhatsApp',
                nama_lengkap: 'Suparman Wijaya',
                nomor_hp_wa: '081299887766',
                domisili: 'RT 002 / RW 05, Ulujami',
                jenis_keanggotaan: 'Anggota Biasa',
                alasan_bergabung: 'Mendukung koperasi kelurahan dan kebutuhan bahan pokok.',
                status_verifikasi: 'diterima',
                jadwal_tindak_lanjut: '2026-10-12',
                catatan_admin: 'Pendaftaran disetujui dalam rapat pengurus tanggal 12 Oktober 2026. Kartu anggota telah diterbitkan.'
            }
        ]
    };

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                const clone = JSON.parse(JSON.stringify(DEFAULT_DATA));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(clone));
                return clone;
            }
            const parsed = JSON.parse(raw);
            return {
                settings: Object.assign({}, DEFAULT_DATA.settings, parsed.settings || {}),
                businessUnits: Array.isArray(parsed.businessUnits) ? parsed.businessUnits : DEFAULT_DATA.businessUnits,
                categories: Array.isArray(parsed.categories) ? parsed.categories : DEFAULT_DATA.categories,
                products: Array.isArray(parsed.products) ? parsed.products : DEFAULT_DATA.products,
                officers: Array.isArray(parsed.officers) ? parsed.officers : DEFAULT_DATA.officers,
                applications: Array.isArray(parsed.applications) ? parsed.applications : DEFAULT_DATA.applications
            };
        } catch (e) {
            return JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
    }

    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Gagal menyimpan ke localStorage:', e);
        }
    }

    function slugify(str) {
        return String(str || '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') || ('item-' + Date.now());
    }

    function normalizeWhatsAppNumber(num) {
        let digits = String(num || '').replace(/[^0-9]/g, '');
        if (!digits) return '6281298765432';
        if (digits.startsWith('0')) {
            digits = '62' + digits.slice(1);
        } else if (digits.startsWith('8')) {
            digits = '62' + digits;
        }
        return digits;
    }

    function formatRupiah(amount) {
        const num = Number(amount || 0);
        return 'Rp ' + num.toLocaleString('id-ID');
    }

    function formatDateId(dateStr) {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;
            return d.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    }

    function getStatusBadge(status) {
        const map = {
            menunggu_verifikasi: { label: 'Menunggu Verifikasi', class: 'badge-kuning' },
            perlu_tindak_lanjut: { label: 'Perlu Tindak Lanjut', class: 'badge-biru' },
            dalam_proses:        { label: 'Sedang Diverifikasi', class: 'badge-biru' },
            sedang_diverifikasi: { label: 'Sedang Diverifikasi', class: 'badge-biru' },
            diterima:            { label: 'Diterima', class: 'badge-sukses' },
            ditolak:             { label: 'Ditolak', class: 'badge-merah' }
        };
        return map[status] || { label: 'Menunggu Verifikasi', class: 'badge-kuning' };
    }

    function generateRegistrationNumber() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const rnd = String(Math.floor(1000 + Math.random() * 9000));
        return `REG-KMPU-${y}${m}${d}-${rnd}`;
    }

    function applyThemeIdentity() {
        const s = loadState().settings;
        const root = document.documentElement;
        root.style.setProperty('--desktop-logo-size', (Number(s.desktop_logo_size) || 46) + 'px');
        root.style.setProperty('--mobile-logo-size', (Number(s.mobile_logo_size) || 38) + 'px');
        root.style.setProperty('--logo-spacing', (Number(s.logo_spacing) || 12) + 'px');

        let radius = '50%';
        if (s.logo_shape === 'persegi') radius = '10px';
        else if (s.logo_shape === 'otomatis') radius = '4px';
        root.style.setProperty('--logo-radius', radius);
    }

    const KMPUStore = {
        getState: loadState,

        resetToDefaults: function () {
            const clone = JSON.parse(JSON.stringify(DEFAULT_DATA));
            saveState(clone);
            applyThemeIdentity();
            return clone;
        },

        // Pengaturan Website & Logo
        getSettings: function () {
            return loadState().settings;
        },

        updateSettings: function (partial) {
            const state = loadState();
            state.settings = Object.assign({}, state.settings, partial);
            saveState(state);
            applyThemeIdentity();
            return state.settings;
        },

        applyThemeIdentity: applyThemeIdentity,

        // Autentikasi Pengurus / Admin
        login: function (loginInput, password) {
            const user = String(loginInput || '').trim().toLowerCase();
            const pass = String(password || '').trim();
            const validUsers = [
                'admin',
                'admin@koperasimerahputih-ulujami.id',
                'pengurus@koperasimerahputih-ulujami.id',
                'sekretariat@koperasimerahputih-ulujami.id'
            ];
            const validPasswords = ['password123', 'admin123', 'koperasi123'];

            if (validUsers.includes(user) && validPasswords.includes(pass)) {
                const session = {
                    username: 'admin',
                    name: 'Administrator Koperasi',
                    email: 'admin@koperasimerahputih-ulujami.id',
                    loggedInAt: new Date().toISOString()
                };
                localStorage.setItem(AUTH_KEY, JSON.stringify(session));
                return { ok: true, user: session };
            }
            return {
                ok: false,
                message: 'Username/email atau kata sandi yang Anda masukkan tidak sesuai.'
            };
        },

        logout: function () {
            localStorage.removeItem(AUTH_KEY);
        },

        getCurrentUser: function () {
            try {
                const raw = localStorage.getItem(AUTH_KEY);
                return raw ? JSON.parse(raw) : null;
            } catch (e) {
                return null;
            }
        },

        isAuthenticated: function () {
            return !!this.getCurrentUser();
        },

        // Bidang Usaha
        getBusinessUnits: function (onlyPublished) {
            const list = loadState().businessUnits.slice().sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
            return onlyPublished ? list.filter(u => u.is_published) : list;
        },

        getBusinessUnitBySlug: function (slugOrId) {
            const list = loadState().businessUnits;
            return list.find(u => u.slug === slugOrId || String(u.id) === String(slugOrId)) || null;
        },

        saveBusinessUnit: function (data) {
            const state = loadState();
            if (data.id) {
                const idx = state.businessUnits.findIndex(u => String(u.id) === String(data.id));
                if (idx !== -1) {
                    state.businessUnits[idx] = Object.assign({}, state.businessUnits[idx], data, {
                        slug: data.slug || slugify(data.nama)
                    });
                }
            } else {
                const nextId = state.businessUnits.reduce((m, u) => Math.max(m, Number(u.id) || 0), 0) + 1;
                state.businessUnits.push({
                    id: nextId,
                    slug: slugify(data.nama),
                    nama: data.nama,
                    deskripsi_singkat: data.deskripsi_singkat || '',
                    deskripsi_lengkap: data.deskripsi_lengkap || '',
                    foto_sampul: data.foto_sampul || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
                    ikon: data.ikon || 'bi-shop',
                    kontak_publik: data.kontak_publik || state.settings.whatsapp,
                    urutan: Number(data.urutan) || nextId,
                    tampil_beranda: data.tampil_beranda !== false,
                    is_published: data.is_published !== false
                });
            }
            saveState(state);
        },

        toggleBusinessUnitPublish: function (id) {
            const state = loadState();
            const unit = state.businessUnits.find(u => String(u.id) === String(id));
            if (unit) {
                unit.is_published = !unit.is_published;
                saveState(state);
            }
        },

        deleteBusinessUnit: function (id) {
            const state = loadState();
            state.businessUnits = state.businessUnits.filter(u => String(u.id) !== String(id));
            saveState(state);
        },

        // Kategori Produk
        getCategories: function () {
            return loadState().categories;
        },

        saveCategory: function (data) {
            const state = loadState();
            if (data.id) {
                const idx = state.categories.findIndex(c => String(c.id) === String(data.id));
                if (idx !== -1) {
                    state.categories[idx] = Object.assign({}, state.categories[idx], {
                        nama: data.nama,
                        slug: slugify(data.nama),
                        deskripsi: data.deskripsi || ''
                    });
                }
            } else {
                const nextId = state.categories.reduce((m, c) => Math.max(m, Number(c.id) || 0), 0) + 1;
                state.categories.push({
                    id: nextId,
                    nama: data.nama,
                    slug: slugify(data.nama),
                    deskripsi: data.deskripsi || ''
                });
            }
            saveState(state);
        },

        deleteCategory: function (id) {
            const state = loadState();
            state.categories = state.categories.filter(c => String(c.id) !== String(id));
            saveState(state);
        },

        // Katalog Produk
        getProducts: function (onlyPublished) {
            const state = loadState();
            const list = state.products.map(p => {
                const cat = state.categories.find(c => String(c.id) === String(p.product_category_id));
                const unit = state.businessUnits.find(u => String(u.id) === String(p.business_unit_id));
                return Object.assign({}, p, {
                    category_name: cat ? cat.nama : 'Produk Koperasi',
                    category_slug: cat ? cat.slug : '',
                    unit_name: unit ? unit.nama : 'Unit Usaha Koperasi',
                    unit_slug: unit ? unit.slug : ''
                });
            }).sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
            return onlyPublished ? list.filter(p => p.is_published) : list;
        },

        getProductBySlug: function (slugOrId) {
            return this.getProducts(false).find(p => p.slug === slugOrId || String(p.id) === String(slugOrId)) || null;
        },

        saveProduct: function (data) {
            const state = loadState();
            if (data.id) {
                const idx = state.products.findIndex(p => String(p.id) === String(data.id));
                if (idx !== -1) {
                    state.products[idx] = Object.assign({}, state.products[idx], data, {
                        harga: Number(data.harga) || 0,
                        stok: Number(data.stok) || 0,
                        slug: data.slug || slugify(data.nama)
                    });
                }
            } else {
                const nextId = state.products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1;
                state.products.push({
                    id: nextId,
                    slug: slugify(data.nama),
                    business_unit_id: Number(data.business_unit_id) || 1,
                    product_category_id: Number(data.product_category_id) || 1,
                    nama: data.nama,
                    harga: Number(data.harga) || 0,
                    deskripsi_singkat: data.deskripsi_singkat || '',
                    deskripsi_lengkap: data.deskripsi_lengkap || '',
                    foto: data.foto || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
                    status_ketersediaan: data.status_ketersediaan || 'tersedia',
                    stok: Number(data.stok) || 50,
                    is_featured: !!data.is_featured,
                    is_published: data.is_published !== false,
                    urutan: Number(data.urutan) || nextId
                });
            }
            saveState(state);
        },

        toggleProductPublish: function (id) {
            const state = loadState();
            const prod = state.products.find(p => String(p.id) === String(id));
            if (prod) {
                prod.is_published = !prod.is_published;
                saveState(state);
            }
        },

        deleteProduct: function (id) {
            const state = loadState();
            state.products = state.products.filter(p => String(p.id) !== String(id));
            saveState(state);
        },

        // Pengurus Koperasi
        getOfficers: function (onlyPublished) {
            const list = loadState().officers.slice().sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
            return onlyPublished ? list.filter(o => o.is_published) : list;
        },

        saveOfficer: function (data) {
            const state = loadState();
            if (data.is_ketua) {
                state.officers.forEach(o => { o.is_ketua = false; });
            }
            if (data.id) {
                const idx = state.officers.findIndex(o => String(o.id) === String(data.id));
                if (idx !== -1) {
                    state.officers[idx] = Object.assign({}, state.officers[idx], data);
                }
            } else {
                const nextId = state.officers.reduce((m, o) => Math.max(m, Number(o.id) || 0), 0) + 1;
                state.officers.push({
                    id: nextId,
                    nama_lengkap: data.nama_lengkap,
                    jabatan: data.jabatan,
                    is_ketua: !!data.is_ketua,
                    periode: data.periode || '2024 – 2027',
                    foto: data.foto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                    deskripsi: data.deskripsi || '',
                    kontak_publik: data.kontak_publik || '',
                    urutan: Number(data.urutan) || nextId,
                    is_published: data.is_published !== false
                });
            }
            saveState(state);
        },

        toggleOfficerPublish: function (id) {
            const state = loadState();
            const off = state.officers.find(o => String(o.id) === String(id));
            if (off) {
                off.is_published = !off.is_published;
                saveState(state);
            }
        },

        deleteOfficer: function (id) {
            const state = loadState();
            state.officers = state.officers.filter(o => String(o.id) !== String(id));
            saveState(state);
        },

        // Pendaftaran Anggota & Tindak Lanjut WhatsApp
        getApplications: function () {
            return loadState().applications.slice().sort((a, b) => new Date(b.tanggal_kontak) - new Date(a.tanggal_kontak));
        },

        getApplication: function (id) {
            return loadState().applications.find(a => String(a.id) === String(id)) || null;
        },

        createApplication: function (data) {
            const state = loadState();
            const nextId = state.applications.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
            const nomor = data.nomor_registrasi || generateRegistrationNumber();
            const record = {
                id: nextId,
                nomor_registrasi: nomor,
                tanggal_kontak: data.tanggal_kontak || new Date().toISOString(),
                sumber_pendaftaran: data.sumber_pendaftaran || 'WhatsApp',
                nama_lengkap: data.nama_lengkap || 'Calon Anggota WhatsApp',
                nomor_hp_wa: data.nomor_hp_wa || '-',
                domisili: data.domisili || 'Kelurahan Ulujami',
                jenis_keanggotaan: data.jenis_keanggotaan || 'Anggota Biasa',
                alasan_bergabung: data.alasan_bergabung || '',
                status_verifikasi: data.status_verifikasi || 'menunggu_verifikasi',
                jadwal_tindak_lanjut: data.jadwal_tindak_lanjut || '',
                catatan_admin: data.catatan_admin || 'Pendaftaran baru diajukan melalui integrasi WhatsApp.'
            };
            state.applications.unshift(record);
            saveState(state);
            return record;
        },

        updateApplication: function (id, partial) {
            const state = loadState();
            const idx = state.applications.findIndex(a => String(a.id) === String(id));
            if (idx !== -1) {
                state.applications[idx] = Object.assign({}, state.applications[idx], partial);
                saveState(state);
                return state.applications[idx];
            }
            return null;
        },

        deleteApplication: function (id) {
            const state = loadState();
            state.applications = state.applications.filter(a => String(a.id) !== String(id));
            saveState(state);
        },

        buildWhatsAppFollowupUrl: function (app, templateType) {
            const s = this.getSettings();
            const phone = normalizeWhatsAppNumber(app.nomor_hp_wa);
            const nama = app.nama_lengkap || 'Bapak/Ibu';
            const kode = app.nomor_registrasi || '-';
            const jadwal = app.jadwal_tindak_lanjut ? formatDateId(app.jadwal_tindak_lanjut) : 'jam kerja sekretariat';

            let msg = '';
            switch (templateType) {
                case 'undangan_verifikasi':
                    msg = `Halo Bapak/Ibu *${nama}*,\n\nTerima kasih telah menghubungi *${s.nama_koperasi}* (Kode Pendaftaran: *${kode}*).\n\nKami mengundang Bapak/Ibu untuk melakukan konfirmasi & verifikasi berkas keanggotaan secara langsung di Sekretariat Koperasi (${s.alamat_sekretariat}) pada jadwal: *${jadwal}*.\n\nMohon membawa KTP asli untuk ditunjukkan kepada petugas (tidak perlu diunggah online). Terima kasih.`;
                    break;
                case 'diterima':
                    msg = `Selamat Bapak/Ibu *${nama}*!\n\nPermohonan keanggotaan Anda di *${s.nama_koperasi}* dengan nomor registrasi *${kode}* telah *DISETUJUI / DITERIMA*.\n\nSilakan mengunjungi Sekretariat Koperasi pada jam pelayanan untuk pengambilan buku/kartu anggota dan informasi simpanan pokok. Terima kasih atas partisipasi Anda membangun ekonomi warga Ulujami!`;
                    break;
                case 'ditolak':
                    msg = `Halo Bapak/Ibu *${nama}*,\n\nTerima kasih atas minat Anda bergabung dengan *${s.nama_koperasi}* (Nomor Registrasi: *${kode}*).\n\nBerdasarkan hasil verifikasi administrasi saat ini, permohonan keanggotaan Anda belum dapat kami setujui / ditunda. Silakan menghubungi sekretariat kami apabila ada hal yang ingin dikonfirmasi lebih lanjut. Terima kasih.`;
                    break;
                default:
                    msg = `Halo Bapak/Ibu *${nama}*,\n\nKami dari Pengurus *${s.nama_koperasi}* telah mencatat permohonan pendaftaran anggota Anda dengan Kode Referensi *${kode}*.\n\nApakah Bapak/Ibu bersedia kami hubungi untuk penjadwalan verifikasi singkat di Sekretariat Koperasi Kelurahan Ulujami? Terima kasih.`;
                    break;
            }
            return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        },

        // Utilitas Format
        formatRupiah: formatRupiah,
        formatDateId: formatDateId,
        normalizeWhatsAppNumber: normalizeWhatsAppNumber,
        getStatusBadge: getStatusBadge,
        generateRegistrationNumber: generateRegistrationNumber
    };

    window.KMPUStore = KMPUStore;
    applyThemeIdentity();
})(window);
