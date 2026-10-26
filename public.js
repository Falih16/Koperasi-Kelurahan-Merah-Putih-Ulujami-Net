/**
 * Public Website Controller — Koperasi Kelurahan Merah Putih Ulujami
 * Menangani seluruh halaman publik: Beranda, Tentang Kami, Bidang Usaha & Detail,
 * Katalog Produk & Detail, Pengurus, Pendaftaran WhatsApp, dan Kontak.
 */

(function () {
    'use strict';

    let currentPage = 'beranda';
    let currentFilter = {
        q: '',
        kategori: '',
        usaha: '',
        sort: 'terbaru'
    };

    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderBrandLogoHtml() {
        const s = KMPUStore.getSettings();
        if (s.logo_url && s.logo_url.trim() !== '') {
            return `<img src="${escapeHtml(s.logo_url)}" alt="${escapeHtml(s.logo_alt_text || s.nama_koperasi)}" class="kmp-brand-logo">`;
        }
        return `<div class="kmp-brand-badge">MP</div>`;
    }

    function syncIdentityElements() {
        KMPUStore.applyThemeIdentity();
        const s = KMPUStore.getSettings();

        const navBrandLogo = document.getElementById('navBrandLogoContainer');
        if (navBrandLogo) navBrandLogo.innerHTML = renderBrandLogoHtml();

        const footerBrandLogo = document.getElementById('footerBrandLogoContainer');
        if (footerBrandLogo) footerBrandLogo.innerHTML = renderBrandLogoHtml();

        document.querySelectorAll('[data-bind="nama_koperasi"]').forEach(el => {
            el.textContent = s.nama_koperasi;
        });
        document.querySelectorAll('[data-bind="subjudul_koperasi"]').forEach(el => {
            el.textContent = s.subjudul_koperasi;
        });
        document.querySelectorAll('[data-bind="tagline"]').forEach(el => {
            el.textContent = s.tagline;
        });
        document.querySelectorAll('[data-bind="alamat_sekretariat"]').forEach(el => {
            el.textContent = s.alamat_sekretariat;
        });
        document.querySelectorAll('[data-bind="jam_pelayanan"]').forEach(el => {
            el.textContent = s.jam_pelayanan;
        });
        document.querySelectorAll('[data-bind="telepon"]').forEach(el => {
            el.textContent = s.telepon;
        });
        document.querySelectorAll('[data-bind="whatsapp"]').forEach(el => {
            el.textContent = s.whatsapp;
        });
        document.querySelectorAll('[data-bind="email_resmi"]').forEach(el => {
            el.textContent = s.email_resmi;
        });
        document.querySelectorAll('[data-bind="legalitas"]').forEach(el => {
            el.textContent = s.legalitas;
        });

        // Tampilkan tombol Admin di navbar jika sedang login
        const adminBtnContainer = document.getElementById('navAdminShortcut');
        if (adminBtnContainer) {
            if (KMPUStore.isAuthenticated()) {
                adminBtnContainer.innerHTML = `
                    <a href="/admin" class="btn btn-sm fw-semibold d-inline-flex align-items-center gap-1" style="background-color: var(--soft-red); color: var(--deep-burgundy); min-height: 42px; padding: 0 14px; border-radius: 9px;">
                        <i class="bi bi-speedometer2"></i> Panel Admin
                    </a>
                `;
            } else {
                adminBtnContainer.innerHTML = `
                    <a href="/login" class="btn btn-sm fw-semibold d-none d-md-inline-flex align-items-center gap-1" style="border: 1px solid var(--border-color); color: var(--text-primary); min-height: 42px; padding: 0 14px; border-radius: 9px; background: #fff;">
                        <i class="bi bi-person-lock"></i> Masuk Pengurus
                    </a>
                `;
            }
        }
    }

    function renderHomeSections() {
        const s = KMPUStore.getSettings();
        const units = KMPUStore.getBusinessUnits(true);
        const products = KMPUStore.getProducts(true);
        const officers = KMPUStore.getOfficers(true);
        const apps = KMPUStore.getApplications();

        // Statistik Beranda
        const acceptedMembers = apps.filter(a => a.status_verifikasi === 'diterima').length;
        const statEl = document.getElementById('homeStatsRow');
        if (statEl) {
            statEl.innerHTML = `
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-surface h-100 border" style="border-color: var(--border-color) !important;">
                        <div class="stat-number fs-2 text-dark">${units.length}</div>
                        <div class="small text-secondary fw-medium">Bidang Usaha Aktif</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-surface h-100 border" style="border-color: var(--border-color) !important;">
                        <div class="stat-number fs-2 text-dark">${products.length}</div>
                        <div class="small text-secondary fw-medium">Produk Koperasi & UMKM</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-surface h-100 border" style="border-color: var(--border-color) !important;">
                        <div class="stat-number fs-2 text-dark">${officers.length}</div>
                        <div class="small text-secondary fw-medium">Pengurus & Pengawas</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-surface h-100 border" style="border-color: var(--border-color) !important;">
                        <div class="stat-number fs-2" style="color: var(--primary-red);">${acceptedMembers}</div>
                        <div class="small text-secondary fw-medium">Anggota Terverifikasi</div>
                    </div>
                </div>
            `;
        }

        // Unit Usaha Beranda
        const homeUnitsGrid = document.getElementById('homeBusinessUnitsGrid');
        if (homeUnitsGrid) {
            homeUnitsGrid.innerHTML = units.slice(0, 4).map(u => `
                <div class="col-md-6 col-lg-3">
                    <div class="kmp-card h-100 d-flex flex-column overflow-hidden">
                        <div style="height: 175px; overflow: hidden; background-color: var(--light-surface);">
                            <img src="${escapeHtml(u.foto_sampul)}" alt="${escapeHtml(u.nama)}" class="w-100 h-100" style="object-fit: cover;">
                        </div>
                        <div class="p-4 d-flex flex-column flex-grow-1">
                            <span class="badge-merah align-self-start mb-2"><i class="bi ${escapeHtml(u.ikon || 'bi-shop')}"></i> Unit Usaha</span>
                            <h3 class="h5 font-editorial mb-2">${escapeHtml(u.nama)}</h3>
                            <p class="small mb-4 flex-grow-1">${escapeHtml(u.deskripsi_singkat)}</p>
                            <button type="button" class="btn-kmp-outline w-100 py-2" style="min-height: 40px; font-size: 14px;" onclick="window.KMPUPublic.openUnitDetail('${escapeHtml(u.slug)}')">
                                Lihat Detail Unit <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Produk Unggulan Beranda
        const homeProductsGrid = document.getElementById('homeFeaturedProductsGrid');
        if (homeProductsGrid) {
            const featured = products.filter(p => p.is_featured).slice(0, 4);
            const list = featured.length >= 3 ? featured : products.slice(0, 4);
            homeProductsGrid.innerHTML = list.map(p => renderProductCardHtml(p, 'col-md-6 col-lg-3')).join('');
        }

        // Pengurus Beranda
        const homeOfficersGrid = document.getElementById('homeOfficersGrid');
        if (homeOfficersGrid) {
            homeOfficersGrid.innerHTML = officers.slice(0, 4).map(o => `
                <div class="col-sm-6 col-lg-3">
                    <div class="kmp-card h-100 p-4 text-center d-flex flex-column align-items-center">
                        <img src="${escapeHtml(o.foto)}" alt="${escapeHtml(o.nama_lengkap)}" class="rounded-circle mb-3 border" style="width: 96px; height: 96px; object-fit: cover; border-color: var(--border-color) !important;">
                        ${o.is_ketua ? '<span class="badge-merah mb-2">Ketua Koperasi</span>' : '<span class="badge bg-light text-secondary border mb-2">Pengurus</span>'}
                        <h3 class="h6 font-editorial mb-1">${escapeHtml(o.nama_lengkap)}</h3>
                        <div class="small fw-semibold mb-2" style="color: var(--primary-red);">${escapeHtml(o.jabatan)}</div>
                        <p class="small text-secondary mb-0">${escapeHtml(o.deskripsi)}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    function renderProductCardHtml(p, colClass) {
        const s = KMPUStore.getSettings();
        const waPhone = KMPUStore.normalizeWhatsAppNumber(s.whatsapp);
        const waText = encodeURIComponent(`Halo Pengurus ${s.nama_koperasi}, saya tertarik memesan produk *${p.nama}* (${KMPUStore.formatRupiah(p.harga)}). Mohon informasi ketersediaannya.`);
        const statusBadge = p.status_ketersediaan === 'habis'
            ? '<span class="badge-merah">Stok Habis</span>'
            : (p.status_ketersediaan === 'stok_terbatas'
                ? '<span class="badge-kuning">Stok Terbatas</span>'
                : '<span class="badge-sukses">Tersedia</span>');

        return `
            <div class="${colClass || 'col-md-6 col-lg-4'}">
                <div class="kmp-card h-100 d-flex flex-column overflow-hidden">
                    <div class="position-relative" style="height: 200px; background-color: var(--light-surface);">
                        <img src="${escapeHtml(p.foto)}" alt="${escapeHtml(p.nama)}" class="w-100 h-100" style="object-fit: cover;">
                        <div class="position-absolute top-0 start-0 m-3">
                            ${statusBadge}
                        </div>
                        ${p.is_featured ? '<div class="position-absolute top-0 end-0 m-3"><span class="badge-merah">Unggulan</span></div>' : ''}
                    </div>
                    <div class="p-4 d-flex flex-column flex-grow-1">
                        <div class="small text-secondary fw-semibold mb-1">${escapeHtml(p.category_name)}</div>
                        <h3 class="h5 font-editorial mb-2">${escapeHtml(p.nama)}</h3>
                        <div class="fs-5 fw-bold mb-2" style="color: var(--deep-burgundy);">${KMPUStore.formatRupiah(p.harga)}</div>
                        <p class="small mb-4 flex-grow-1">${escapeHtml(p.deskripsi_singkat)}</p>
                        <div class="d-flex gap-2 mt-auto">
                            <button type="button" class="btn-kmp-outline flex-grow-1 py-2" style="min-height: 42px; font-size: 14px;" onclick="window.KMPUPublic.openProductModal('${escapeHtml(p.slug)}')">
                                Detail
                            </button>
                            <a href="https://wa.me/${waPhone}?text=${waText}" target="_blank" rel="noopener" class="btn-kmp-whatsapp flex-grow-1 py-2" style="min-height: 42px; font-size: 14px;">
                                <i class="bi bi-whatsapp"></i> Pesan
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderAboutPage() {
        const s = KMPUStore.getSettings();
        const sejarahEl = document.getElementById('aboutSejarahText');
        if (sejarahEl) sejarahEl.textContent = s.sejarah;

        const visiEl = document.getElementById('aboutVisiText');
        if (visiEl) visiEl.textContent = s.visi;

        const misiEl = document.getElementById('aboutMisiList');
        if (misiEl) {
            const lines = String(s.misi || '').split('\n').map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
            misiEl.innerHTML = lines.map((line, i) => `
                <div class="d-flex align-items-start gap-3 mb-3">
                    <span class="badge-merah rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style="width: 30px; height: 30px;">${i + 1}</span>
                    <div class="text-secondary">${escapeHtml(line)}</div>
                </div>
            `).join('');
        }
    }

    function renderBusinessUnitsPage() {
        const units = KMPUStore.getBusinessUnits(true);
        const products = KMPUStore.getProducts(true);
        const grid = document.getElementById('pageBusinessUnitsGrid');
        if (!grid) return;

        grid.innerHTML = units.map(u => {
            const prodCount = products.filter(p => String(p.business_unit_id) === String(u.id)).length;
            return `
                <div class="col-md-6">
                    <div class="kmp-card h-100 overflow-hidden d-flex flex-column">
                        <div style="height: 230px; background-color: var(--light-surface);">
                            <img src="${escapeHtml(u.foto_sampul)}" alt="${escapeHtml(u.nama)}" class="w-100 h-100" style="object-fit: cover;">
                        </div>
                        <div class="p-4 p-lg-5 d-flex flex-column flex-grow-1">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <span class="badge-merah"><i class="bi ${escapeHtml(u.ikon || 'bi-shop')}"></i> Bidang Usaha Resmi</span>
                                <span class="small text-secondary fw-semibold">${prodCount} Produk Terkait</span>
                            </div>
                            <h3 class="h4 font-editorial mb-2">${escapeHtml(u.nama)}</h3>
                            <p class="mb-4 flex-grow-1">${escapeHtml(u.deskripsi_lengkap || u.deskripsi_singkat)}</p>
                            <div class="d-flex flex-wrap gap-2 pt-2 border-top" style="border-color: var(--border-color) !important;">
                                <button type="button" class="btn-kmp-primary" onclick="window.KMPUPublic.openUnitDetail('${escapeHtml(u.slug)}')">
                                    Lihat Unit & Produk <i class="bi bi-arrow-right"></i>
                                </button>
                                <a href="https://wa.me/${KMPUStore.normalizeWhatsAppNumber(u.kontak_publik)}?text=${encodeURIComponent('Halo Pengurus Unit ' + u.nama + ', saya ingin menanyakan layanan/produk unit usaha ini.')}" target="_blank" rel="noopener" class="btn-kmp-whatsapp">
                                    <i class="bi bi-whatsapp"></i> Hubungi Unit
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function openUnitDetail(slug) {
        const unit = KMPUStore.getBusinessUnitBySlug(slug);
        if (!unit) return;
        const products = KMPUStore.getProducts(true).filter(p => String(p.business_unit_id) === String(unit.id));
        const container = document.getElementById('unitDetailContent');
        if (!container) return;

        container.innerHTML = `
            <div class="mb-4">
                <button type="button" class="btn-kmp-outline py-2 px-3" style="min-height: 40px; font-size: 14px;" onclick="window.KMPUPublic.navigate('usaha')">
                    <i class="bi bi-arrow-left"></i> Kembali ke Daftar Bidang Usaha
                </button>
            </div>
            <div class="kmp-card-static overflow-hidden mb-5">
                <div class="row g-0">
                    <div class="col-lg-5" style="min-height: 280px;">
                        <img src="${escapeHtml(unit.foto_sampul)}" alt="${escapeHtml(unit.nama)}" class="w-100 h-100" style="object-fit: cover;">
                    </div>
                    <div class="col-lg-7 p-4 p-lg-5 d-flex flex-column justify-content-center">
                        <span class="eyebrow-label">UNIT USAHA KOPERASI</span>
                        <h1 class="h2-editorial mb-3">${escapeHtml(unit.nama)}</h1>
                        <p class="mb-4">${escapeHtml(unit.deskripsi_lengkap || unit.deskripsi_singkat)}</p>
                        <div class="d-flex flex-wrap gap-3">
                            <a href="https://wa.me/${KMPUStore.normalizeWhatsAppNumber(unit.kontak_publik)}?text=${encodeURIComponent('Halo Unit ' + unit.nama + ', saya ingin berkonsultasi / memesan produk.')}" target="_blank" rel="noopener" class="btn-kmp-whatsapp">
                                <i class="bi bi-whatsapp"></i> Hubungi Pengelola Unit (${escapeHtml(unit.kontak_publik)})
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h2 class="h3-editorial mb-0">Katalog Produk pada Unit Ini (${products.length})</h2>
                <button type="button" class="btn-kmp-outline py-2" onclick="window.KMPUPublic.navigate('produk')">Lihat Semua Produk</button>
            </div>
            <div class="row g-4">
                ${products.length
                    ? products.map(p => renderProductCardHtml(p, 'col-md-6 col-lg-4')).join('')
                    : '<div class="col-12"><div class="kmp-card-static p-4 text-center text-secondary">Belum ada produk pada unit usaha ini.</div></div>'}
            </div>
        `;
        showSection('usaha-detail');
    }

    function renderCatalogPage() {
        const categories = KMPUStore.getCategories();
        const units = KMPUStore.getBusinessUnits(true);
        let products = KMPUStore.getProducts(true);

        // Render dropdown filter jika belum diisi
        const catSelect = document.getElementById('catalogCategoryFilter');
        if (catSelect) {
            const currentVal = currentFilter.kategori;
            catSelect.innerHTML = `<option value="">Semua Kategori Produk</option>` +
                categories.map(c => `<option value="${escapeHtml(c.slug)}" ${currentVal === c.slug ? 'selected' : ''}>${escapeHtml(c.nama)}</option>`).join('');
        }

        const unitSelect = document.getElementById('catalogUnitFilter');
        if (unitSelect) {
            const currentUnit = currentFilter.usaha;
            unitSelect.innerHTML = `<option value="">Semua Bidang Usaha</option>` +
                units.map(u => `<option value="${escapeHtml(u.slug)}" ${currentUnit === u.slug ? 'selected' : ''}>${escapeHtml(u.nama)}</option>`).join('');
        }

        // Terapkan filter
        if (currentFilter.q) {
            const kw = currentFilter.q.toLowerCase();
            products = products.filter(p =>
                p.nama.toLowerCase().includes(kw) ||
                (p.deskripsi_singkat || '').toLowerCase().includes(kw) ||
                (p.category_name || '').toLowerCase().includes(kw)
            );
        }

        if (currentFilter.kategori) {
            products = products.filter(p => p.category_slug === currentFilter.kategori);
        }

        if (currentFilter.usaha) {
            products = products.filter(p => p.unit_slug === currentFilter.usaha);
        }

        if (currentFilter.sort === 'termurah') {
            products.sort((a, b) => a.harga - b.harga);
        } else if (currentFilter.sort === 'termahal') {
            products.sort((a, b) => b.harga - a.harga);
        } else if (currentFilter.sort === 'nama_az') {
            products.sort((a, b) => a.nama.localeCompare(b.nama));
        }

        const countEl = document.getElementById('catalogCountLabel');
        if (countEl) countEl.textContent = `Menampilkan ${products.length} produk koperasi`;

        const grid = document.getElementById('pageProductsGrid');
        if (grid) {
            if (products.length === 0) {
                grid.innerHTML = `
                    <div class="col-12">
                        <div class="kmp-card-static p-5 text-center">
                            <i class="bi bi-search fs-1 text-secondary mb-3 d-block"></i>
                            <h3 class="h5 font-editorial mb-2">Produk Tidak Ditemukan</h3>
                            <p class="mb-3">Tidak ada produk yang sesuai dengan kata kunci atau filter yang dipilih.</p>
                            <button type="button" class="btn-kmp-outline" onclick="window.KMPUPublic.resetCatalogFilter()">Tampilkan Semua Produk</button>
                        </div>
                    </div>
                `;
            } else {
                grid.innerHTML = products.map(p => renderProductCardHtml(p, 'col-md-6 col-lg-4')).join('');
            }
        }
    }

    function openProductModal(slug) {
        const p = KMPUStore.getProductBySlug(slug);
        if (!p) return;
        const s = KMPUStore.getSettings();
        const waPhone = KMPUStore.normalizeWhatsAppNumber(s.whatsapp);
        const waText = encodeURIComponent(`Halo Pengurus ${s.nama_koperasi}, saya ingin memesan produk *${p.nama}* (${KMPUStore.formatRupiah(p.harga)}).`);

        const body = document.getElementById('productDetailModalBody');
        if (!body) return;
        body.innerHTML = `
            <div class="row g-4 align-items-center">
                <div class="col-md-5">
                    <img src="${escapeHtml(p.foto)}" alt="${escapeHtml(p.nama)}" class="w-100 rounded-3 border" style="max-height: 300px; object-fit: cover;">
                </div>
                <div class="col-md-7">
                    <div class="d-flex flex-wrap gap-2 mb-2">
                        <span class="badge-merah">${escapeHtml(p.category_name)}</span>
                        <span class="badge bg-light text-dark border">${escapeHtml(p.unit_name)}</span>
                    </div>
                    <h3 class="h4 font-editorial mb-2">${escapeHtml(p.nama)}</h3>
                    <div class="fs-3 fw-bold mb-3" style="color: var(--deep-burgundy);">${KMPUStore.formatRupiah(p.harga)}</div>
                    <p class="mb-3">${escapeHtml(p.deskripsi_lengkap || p.deskripsi_singkat)}</p>
                    <div class="small text-secondary mb-4">
                        <i class="bi bi-box-seam me-1"></i> Ketersediaan Stok: <strong>${p.stok != null ? p.stok + ' unit/kemasan' : 'Tersedia di Gerai'}</strong>
                    </div>
                    <a href="https://wa.me/${waPhone}?text=${waText}" target="_blank" rel="noopener" class="btn-kmp-whatsapp w-100">
                        <i class="bi bi-whatsapp"></i> Pesan Sekarang via WhatsApp
                    </a>
                </div>
            </div>
        `;
        const modalEl = document.getElementById('productDetailModal');
        if (modalEl && window.bootstrap) {
            new bootstrap.Modal(modalEl).show();
        }
    }

    function renderOfficersPage() {
        const officers = KMPUStore.getOfficers(true);
        const chairman = officers.find(o => o.is_ketua) || officers[0];
        const others = officers.filter(o => !chairman || o.id !== chairman.id);

        const chairmanEl = document.getElementById('pageChairmanContainer');
        if (chairmanEl && chairman) {
            chairmanEl.innerHTML = `
                <div class="kmp-card-static p-4 p-lg-5 mb-5">
                    <div class="row g-4 align-items-center">
                        <div class="col-md-4 text-center">
                            <img src="${escapeHtml(chairman.foto)}" alt="${escapeHtml(chairman.nama_lengkap)}" class="rounded-circle border shadow-sm" style="width: 180px; height: 180px; object-fit: cover;">
                        </div>
                        <div class="col-md-8">
                            <span class="badge-merah mb-2">Pimpinan Utama • Periode ${escapeHtml(chairman.periode || '2024 – 2027')}</span>
                            <h2 class="h3-editorial mb-1">${escapeHtml(chairman.nama_lengkap)}</h2>
                            <div class="fs-5 fw-semibold mb-3" style="color: var(--primary-red);">${escapeHtml(chairman.jabatan)}</div>
                            <p class="mb-3">${escapeHtml(chairman.deskripsi)}</p>
                            ${chairman.kontak_publik ? `<div class="small text-secondary"><i class="bi bi-envelope me-1"></i> Kontak Resmi: <strong>${escapeHtml(chairman.kontak_publik)}</strong></div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        const gridEl = document.getElementById('pageOfficersGrid');
        if (gridEl) {
            gridEl.innerHTML = others.map(o => `
                <div class="col-md-6 col-lg-3">
                    <div class="kmp-card h-100 p-4 text-center d-flex flex-column align-items-center">
                        <img src="${escapeHtml(o.foto)}" alt="${escapeHtml(o.nama_lengkap)}" class="rounded-circle mb-3 border" style="width: 110px; height: 110px; object-fit: cover;">
                        <span class="badge bg-light text-secondary border mb-2">Periode ${escapeHtml(o.periode || '2024 – 2027')}</span>
                        <h3 class="h5 font-editorial mb-1">${escapeHtml(o.nama_lengkap)}</h3>
                        <div class="small fw-semibold mb-2" style="color: var(--primary-red);">${escapeHtml(o.jabatan)}</div>
                        <p class="small text-secondary mb-3 flex-grow-1">${escapeHtml(o.deskripsi)}</p>
                        ${o.kontak_publik ? `<div class="small text-secondary border-top pt-2 w-100">${escapeHtml(o.kontak_publik)}</div>` : ''}
                    </div>
                </div>
            `).join('');
        }
    }

    function renderContactPage() {
        const s = KMPUStore.getSettings();
        const mapFrame = document.getElementById('contactMapsIframe');
        if (mapFrame && s.maps_embed) {
            mapFrame.src = s.maps_embed;
        }
    }

    function showSection(pageName) {
        currentPage = pageName;
        document.querySelectorAll('.kmp-page-view').forEach(sec => {
            sec.classList.add('d-none');
        });
        const target = document.getElementById('view-' + pageName);
        if (target) {
            target.classList.remove('d-none');
        }

        // Update nav active state
        document.querySelectorAll('[data-nav-target]').forEach(link => {
            const navTarget = link.getAttribute('data-nav-target');
            if (navTarget === pageName || (pageName === 'usaha-detail' && navTarget === 'usaha')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Tutup menu mobile jika terbuka
        const mobileNav = document.getElementById('mobileNavMenu');
        if (mobileNav && mobileNav.classList.contains('show') && window.bootstrap) {
            const bsCollapse = bootstrap.Collapse.getInstance(mobileNav);
            if (bsCollapse) bsCollapse.hide();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function navigate(pageName, pushHistory = true) {
        syncIdentityElements();
        if (pageName === 'beranda') renderHomeSections();
        else if (pageName === 'tentang-kami') renderAboutPage();
        else if (pageName === 'usaha') renderBusinessUnitsPage();
        else if (pageName === 'produk') renderCatalogPage();
        else if (pageName === 'pengurus') renderOfficersPage();
        else if (pageName === 'kontak') renderContactPage();

        showSection(pageName);

        if (pushHistory && window.history && window.history.pushState) {
            const urlPath = pageName === 'beranda' ? '/' : '/' + pageName;
            try {
                window.history.pushState({ page: pageName }, '', urlPath);
            } catch (e) {}
        }
    }

    function resolveInitialRoute() {
        const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
        const hash = window.location.hash.replace(/^#\/?/, '');
        const route = hash || path;

        if (!route || route === 'index.html') {
            navigate('beranda', false);
        } else if (route.startsWith('tentang')) {
            navigate('tentang-kami', false);
        } else if (route.startsWith('usaha/')) {
            const slug = route.split('/')[1];
            renderBusinessUnitsPage();
            openUnitDetail(slug);
        } else if (route.startsWith('usaha')) {
            navigate('usaha', false);
        } else if (route.startsWith('produk')) {
            navigate('produk', false);
        } else if (route.startsWith('pengurus')) {
            navigate('pengurus', false);
        } else if (route.startsWith('pendaftaran')) {
            navigate('pendaftaran', false);
        } else if (route.startsWith('kontak')) {
            navigate('kontak', false);
        } else {
            navigate('beranda', false);
        }
    }

    function initEvents() {
        // Filter Katalog Produk
        const searchInput = document.getElementById('catalogSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                currentFilter.q = this.value.trim();
                renderCatalogPage();
            });
        }

        const catFilter = document.getElementById('catalogCategoryFilter');
        if (catFilter) {
            catFilter.addEventListener('change', function () {
                currentFilter.kategori = this.value;
                renderCatalogPage();
            });
        }

        const unitFilter = document.getElementById('catalogUnitFilter');
        if (unitFilter) {
            unitFilter.addEventListener('change', function () {
                currentFilter.usaha = this.value;
                renderCatalogPage();
            });
        }

        const sortFilter = document.getElementById('catalogSortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', function () {
                currentFilter.sort = this.value;
                renderCatalogPage();
            });
        }

        // Form Pendaftaran Anggota via WhatsApp
        const waForm = document.getElementById('waRegistrationForm');
        if (waForm) {
            waForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const nama = document.getElementById('regNama').value.trim();
                const wa = document.getElementById('regWhatsapp').value.trim();
                const domisili = document.getElementById('regDomisili').value.trim();
                const jenis = document.getElementById('regJenis').value;
                const catatan = document.getElementById('regCatatan').value.trim();
                const alertBox = document.getElementById('waRegAlertBox');

                // Proteksi Privasi: Tolak jika pengguna memasukkan 16 digit NIK
                const combined = `${nama} ${domisili} ${catatan}`;
                if (/\b\d{16}\b/.test(combined)) {
                    alertBox.innerHTML = `
                        <div class="alert alert-danger rounded-3">
                            <strong><i class="bi bi-shield-exclamation me-1"></i> Demi Keamanan Data Pribadi:</strong>
                            Mohon tidak mencantumkan 16 digit Nomor Induk Kependudukan (NIK) pada formulir publik ini. Verifikasi KTP dilakukan langsung bersama pengurus.
                        </div>
                    `;
                    return;
                }

                // Simpan ke Store agar langsung tercatat di Dashboard Admin
                const record = KMPUStore.createApplication({
                    nama_lengkap: nama || 'Calon Anggota WhatsApp',
                    nomor_hp_wa: wa || '-',
                    domisili: domisili || 'Kelurahan Ulujami',
                    jenis_keanggotaan: jenis || 'Anggota Biasa',
                    alasan_bergabung: catatan,
                    sumber_pendaftaran: 'WhatsApp Website',
                    status_verifikasi: 'menunggu_verifikasi'
                });

                const s = KMPUStore.getSettings();
                const phone = KMPUStore.normalizeWhatsAppNumber(s.whatsapp);
                let message = s.wa_registration_message || '';
                message = message
                    .replace('{nama_koperasi}', s.nama_koperasi)
                    .replace('{nomor_registrasi}', record.nomor_registrasi)
                    .replace('{nama}', record.nama_lengkap)
                    .replace('{whatsapp}', record.nomor_hp_wa)
                    .replace('{domisili}', record.domisili)
                    .replace('{jenis_keanggotaan}', record.jenis_keanggotaan)
                    .replace('{catatan}', record.alasan_bergabung || '-');

                const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

                alertBox.innerHTML = `
                    <div class="p-4 rounded-3 mb-4" style="background-color: #EAF4EE; border: 1px solid #C6E2D2; border-left: 5px solid var(--status-success);">
                        <div class="fw-bold text-dark mb-1">
                            <i class="bi bi-check-circle-fill text-success me-1"></i> Permohonan Tercatat dengan Kode Referensi: <span class="badge-sukses">${escapeHtml(record.nomor_registrasi)}</span>
                        </div>
                        <p class="small mb-2 text-secondary">Data pengantar Anda telah tercatat di Dashboard Pengurus dan jendela pesan WhatsApp telah dibuka.</p>
                        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-kmp-whatsapp btn-sm">
                            <i class="bi bi-whatsapp"></i> Buka Ulang Chat WhatsApp Pengurus
                        </a>
                    </div>
                `;

                window.open(waUrl, '_blank', 'noopener');
                waForm.reset();
            });
        }

        // Form Pesan Kontak
        const contactForm = document.getElementById('publicContactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const nama = document.getElementById('contactNama').value.trim();
                const feedback = document.getElementById('contactFeedbackBox');
                if (feedback) {
                    feedback.innerHTML = `
                        <div class="p-3 rounded-3 mb-3" style="background-color: #EAF4EE; border: 1px solid #C6E2D2; color: var(--status-success); font-weight: 600;">
                            <i class="bi bi-check-circle-fill me-1"></i> Terima kasih, Bapak/Ibu ${escapeHtml(nama)}. Pesan Anda telah diterima oleh Sekretariat Koperasi Kelurahan Merah Putih Ulujami.
                        </div>
                    `;
                }
                contactForm.reset();
            });
        }

        window.addEventListener('popstate', function () {
            resolveInitialRoute();
        });
    }

    window.KMPUPublic = {
        navigate: navigate,
        openUnitDetail: openUnitDetail,
        openProductModal: openProductModal,
        resetCatalogFilter: function () {
            currentFilter = { q: '', kategori: '', usaha: '', sort: 'terbaru' };
            const sInput = document.getElementById('catalogSearchInput');
            if (sInput) sInput.value = '';
            renderCatalogPage();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        syncIdentityElements();
        renderHomeSections();
        initEvents();
        resolveInitialRoute();
    });
})();
