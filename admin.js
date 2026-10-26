/**
 * Admin Dashboard Controller — Koperasi Kelurahan Merah Putih Ulujami
 * Menangani pengelolaan Pendaftaran Anggota WhatsApp, Produk, Kategori,
 * Bidang Usaha, Pengurus, serta Identitas & Logo Website.
 */

(function () {
    'use strict';

    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function showNotice(message) {
        const box = document.getElementById('adminToastContainer');
        if (!box) return;
        box.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show py-2 px-3 rounded-3 small fw-semibold mb-0" role="alert">
                <i class="bi bi-check-circle-fill me-1"></i> ${escapeHtml(message)}
                <button type="button" class="btn-close py-2" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

    function syncSidebarIdentity() {
        KMPUStore.applyThemeIdentity();
        const s = KMPUStore.getSettings();
        const logoBox = document.getElementById('sidebarLogoContainer');
        if (logoBox) {
            if (s.logo_url) {
                logoBox.innerHTML = `<img src="${escapeHtml(s.logo_url)}" alt="Logo" class="kmp-brand-logo" style="width: 38px; height: 38px;">`;
            } else {
                logoBox.innerHTML = `<div class="kmp-brand-badge" style="width: 38px; height: 38px; font-size: 13px;">MP</div>`;
            }
        }
        const previewLogo = document.getElementById('previewLogoContainer');
        if (previewLogo) {
            if (s.logo_url) {
                previewLogo.innerHTML = `<img src="${escapeHtml(s.logo_url)}" alt="Logo" class="kmp-brand-logo">`;
            } else {
                previewLogo.innerHTML = `<div class="kmp-brand-badge">MP</div>`;
            }
        }
        const previewNama = document.getElementById('previewNamaText');
        if (previewNama) previewNama.textContent = s.nama_koperasi;
        const previewSub = document.getElementById('previewSubText');
        if (previewSub) previewSub.textContent = s.subjudul_koperasi;
    }

    function renderDashboard() {
        const apps = KMPUStore.getApplications();
        const products = KMPUStore.getProducts(false);
        const units = KMPUStore.getBusinessUnits(false);
        const officers = KMPUStore.getOfficers(false);

        const pendingCount = apps.filter(a => a.status_verifikasi === 'menunggu_verifikasi' || a.status_verifikasi === 'perlu_tindak_lanjut').length;
        const acceptedCount = apps.filter(a => a.status_verifikasi === 'diterima').length;

        const statsRow = document.getElementById('adminDashboardStats');
        if (statsRow) {
            statsRow.innerHTML = `
                <div class="col-sm-6 col-xl-3">
                    <div class="kmp-card-static p-3 h-100">
                        <div class="small text-secondary fw-semibold">Total Pendaftaran WA</div>
                        <div class="stat-number fs-3 text-dark">${apps.length}</div>
                        <div class="small text-warning fw-semibold">${pendingCount} perlu tindak lanjut</div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="kmp-card-static p-3 h-100">
                        <div class="small text-secondary fw-semibold">Anggota Resmi Diterima</div>
                        <div class="stat-number fs-3 text-success">${acceptedCount}</div>
                        <div class="small text-secondary">Terverifikasi pengurus</div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="kmp-card-static p-3 h-100">
                        <div class="small text-secondary fw-semibold">Katalog Produk</div>
                        <div class="stat-number fs-3 text-dark">${products.length}</div>
                        <div class="small text-secondary">${units.length} bidang usaha aktif</div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="kmp-card-static p-3 h-100">
                        <div class="small text-secondary fw-semibold">Struktur Pengurus</div>
                        <div class="stat-number fs-3 text-dark">${officers.length}</div>
                        <div class="small text-secondary">Periode 2024 – 2027</div>
                    </div>
                </div>
            `;
        }

        const recentBody = document.getElementById('dashboardRecentAppsBody');
        if (recentBody) {
            recentBody.innerHTML = apps.slice(0, 5).map(a => {
                const badge = KMPUStore.getStatusBadge(a.status_verifikasi);
                const waUrl = KMPUStore.buildWhatsAppFollowupUrl(a, 'konfirmasi');
                return `
                    <tr>
                        <td>
                            <div class="fw-bold text-dark small">${escapeHtml(a.nomor_registrasi)}</div>
                            <div class="text-secondary" style="font-size: 12px;">${KMPUStore.formatDateId(a.tanggal_kontak)}</div>
                        </td>
                        <td>
                            <div class="fw-semibold text-dark">${escapeHtml(a.nama_lengkap)}</div>
                            <div class="small text-secondary">${escapeHtml(a.nomor_hp_wa)}</div>
                        </td>
                        <td><span class="${badge.class}">${badge.label}</span></td>
                        <td class="text-end">
                            <div class="btn-group btn-group-sm">
                                <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-outline-success" title="Chat WhatsApp">
                                    <i class="bi bi-whatsapp"></i>
                                </a>
                                <button type="button" class="btn btn-outline-secondary" onclick="window.KMPUAdmin.openEditApplicationModal(${a.id})">
                                    Tindak Lanjut
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    function renderApplicationsTable() {
        const q = (document.getElementById('adminAppSearch')?.value || '').trim().toLowerCase();
        const statusFilter = document.getElementById('adminAppStatusFilter')?.value || '';
        let list = KMPUStore.getApplications();

        if (statusFilter) {
            list = list.filter(a => a.status_verifikasi === statusFilter);
        }
        if (q) {
            list = list.filter(a =>
                (a.nama_lengkap || '').toLowerCase().includes(q) ||
                (a.nomor_registrasi || '').toLowerCase().includes(q) ||
                (a.nomor_hp_wa || '').toLowerCase().includes(q)
            );
        }

        const tbody = document.getElementById('adminApplicationsTableBody');
        if (!tbody) return;

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-secondary">Tidak ada data pendaftaran yang sesuai.</td></tr>`;
            return;
        }

        tbody.innerHTML = list.map(a => {
            const badge = KMPUStore.getStatusBadge(a.status_verifikasi);
            const waUrl = KMPUStore.buildWhatsAppFollowupUrl(a, 'undangan_verifikasi');
            return `
                <tr>
                    <td>
                        <div class="fw-bold text-dark small">${escapeHtml(a.nomor_registrasi)}</div>
                        <div class="text-secondary" style="font-size: 12px;">${KMPUStore.formatDateId(a.tanggal_kontak)}</div>
                    </td>
                    <td>
                        <div class="fw-semibold text-dark">${escapeHtml(a.nama_lengkap)}</div>
                        <div class="small text-secondary">${escapeHtml(a.domisili || '-')}</div>
                    </td>
                    <td>
                        <a href="${waUrl}" target="_blank" rel="noopener" class="text-decoration-none fw-semibold text-success">
                            <i class="bi bi-whatsapp"></i> ${escapeHtml(a.nomor_hp_wa)}
                        </a>
                    </td>
                    <td class="small">${escapeHtml(a.jenis_keanggotaan)}</td>
                    <td class="small">${a.jadwal_tindak_lanjut ? KMPUStore.formatDateId(a.jadwal_tindak_lanjut) : '<span class="text-secondary">Belum dijadwalkan</span>'}</td>
                    <td><span class="${badge.class}">${badge.label}</span></td>
                    <td class="text-end">
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-outline-primary" onclick="window.KMPUAdmin.openEditApplicationModal(${a.id})">
                                <i class="bi bi-pencil-square"></i> Tindak Lanjut
                            </button>
                            <button type="button" class="btn btn-outline-danger" onclick="window.KMPUAdmin.deleteApplication(${a.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function openNewApplicationModal() {
        document.getElementById('adminApplicationForm').reset();
        document.getElementById('appId').value = '';
        document.getElementById('appModalTitle').textContent = 'Catat Pendaftaran Baru dari WhatsApp';
        document.getElementById('appWaFollowupSection').classList.add('d-none');
        new bootstrap.Modal(document.getElementById('adminApplicationModal')).show();
    }

    function openEditApplicationModal(id) {
        const app = KMPUStore.getApplication(id);
        if (!app) return;
        document.getElementById('appId').value = app.id;
        document.getElementById('appNama').value = app.nama_lengkap || '';
        document.getElementById('appWa').value = app.nomor_hp_wa || '';
        document.getElementById('appDomisili').value = app.domisili || '';
        document.getElementById('appJenis').value = app.jenis_keanggotaan || 'Anggota Biasa';
        document.getElementById('appStatus').value = app.status_verifikasi || 'menunggu_verifikasi';
        document.getElementById('appJadwal').value = app.jadwal_tindak_lanjut || '';
        document.getElementById('appCatatan').value = app.catatan_admin || '';
        document.getElementById('appModalTitle').textContent = `Tindak Lanjut: ${app.nomor_registrasi}`;

        const waSec = document.getElementById('appWaFollowupSection');
        const waBtns = document.getElementById('appWaTemplateButtons');
        waSec.classList.remove('d-none');
        waBtns.innerHTML = `
            <a href="${KMPUStore.buildWhatsAppFollowupUrl(app, 'konfirmasi')}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-success">
                1. Konfirmasi Awal WA
            </a>
            <a href="${KMPUStore.buildWhatsAppFollowupUrl(app, 'undangan_verifikasi')}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-success">
                2. Undangan Verifikasi Sekretariat
            </a>
            <a href="${KMPUStore.buildWhatsAppFollowupUrl(app, 'diterima')}" target="_blank" rel="noopener" class="btn btn-sm btn-success">
                3. Kabari Diterima Anggota
            </a>
            <a href="${KMPUStore.buildWhatsAppFollowupUrl(app, 'ditolak')}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-secondary">
                4. Kabari Penundaan
            </a>
        `;

        new bootstrap.Modal(document.getElementById('adminApplicationModal')).show();
    }

    function renderProductsTable() {
        const products = KMPUStore.getProducts(false);
        const tbody = document.getElementById('adminProductsTableBody');
        if (!tbody) return;

        tbody.innerHTML = products.map(p => `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="${escapeHtml(p.foto)}" alt="${escapeHtml(p.nama)}" class="rounded-2 border" style="width: 48px; height: 48px; object-fit: cover;">
                        <div>
                            <div class="fw-semibold text-dark">${escapeHtml(p.nama)}</div>
                            ${p.is_featured ? '<span class="badge-merah" style="font-size:11px;">Unggulan</span>' : ''}
                        </div>
                    </div>
                </td>
                <td>
                    <div class="small fw-semibold">${escapeHtml(p.category_name)}</div>
                    <div class="small text-secondary">${escapeHtml(p.unit_name)}</div>
                </td>
                <td class="fw-bold text-dark">${KMPUStore.formatRupiah(p.harga)}</td>
                <td class="small">${p.stok != null ? p.stok : '-'}</td>
                <td>
                    <button type="button" class="btn btn-sm ${p.is_published ? 'btn-outline-success' : 'btn-outline-secondary'}" onclick="window.KMPUAdmin.toggleProductPublish(${p.id})">
                        ${p.is_published ? 'Ditayangkan' : 'Draf'}
                    </button>
                </td>
                <td class="text-end">
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-outline-primary" onclick="window.KMPUAdmin.openProductModal(${p.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="window.KMPUAdmin.deleteProduct(${p.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function openProductModal(id) {
        const cats = KMPUStore.getCategories();
        const units = KMPUStore.getBusinessUnits(false);
        document.getElementById('prodKategori').innerHTML = cats.map(c => `<option value="${c.id}">${escapeHtml(c.nama)}</option>`).join('');
        document.getElementById('prodUnit').innerHTML = units.map(u => `<option value="${u.id}">${escapeHtml(u.nama)}</option>`).join('');

        const form = document.getElementById('adminProductForm');
        form.reset();
        if (id) {
            const p = KMPUStore.getProductBySlug(id);
            if (p) {
                document.getElementById('prodId').value = p.id;
                document.getElementById('prodNama').value = p.nama;
                document.getElementById('prodHarga').value = p.harga;
                document.getElementById('prodKategori').value = p.product_category_id;
                document.getElementById('prodUnit').value = p.business_unit_id;
                document.getElementById('prodStatusStok').value = p.status_ketersediaan || 'tersedia';
                document.getElementById('prodStok').value = p.stok ?? 50;
                document.getElementById('prodFoto').value = p.foto || '';
                document.getElementById('prodDeskSingkat').value = p.deskripsi_singkat || '';
                document.getElementById('prodDeskLengkap').value = p.deskripsi_lengkap || '';
                document.getElementById('prodFeatured').checked = !!p.is_featured;
                document.getElementById('prodPublished').checked = !!p.is_published;
            }
        } else {
            document.getElementById('prodId').value = '';
        }
        new bootstrap.Modal(document.getElementById('adminProductModal')).show();
    }

    function renderCategoriesTable() {
        const cats = KMPUStore.getCategories();
        const tbody = document.getElementById('adminCategoriesTableBody');
        if (!tbody) return;
        tbody.innerHTML = cats.map(c => `
            <tr>
                <td class="fw-semibold text-dark">${escapeHtml(c.nama)}</td>
                <td class="small text-secondary">${escapeHtml(c.deskripsi)}</td>
                <td class="text-end">
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-outline-primary" onclick="window.KMPUAdmin.editCategory(${c.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="window.KMPUAdmin.deleteCategory(${c.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function renderUnitsGrid() {
        const units = KMPUStore.getBusinessUnits(false);
        const grid = document.getElementById('adminUnitsGrid');
        if (!grid) return;
        grid.innerHTML = units.map(u => `
            <div class="col-md-6">
                <div class="kmp-card-static p-4 h-100 d-flex flex-column">
                    <div class="d-flex gap-3 align-items-center mb-3">
                        <img src="${escapeHtml(u.foto_sampul)}" alt="${escapeHtml(u.nama)}" class="rounded-3 border" style="width: 72px; height: 72px; object-fit: cover;">
                        <div>
                            <h3 class="h6 font-editorial mb-1">${escapeHtml(u.nama)}</h3>
                            <span class="small text-secondary"><i class="bi bi-whatsapp text-success"></i> ${escapeHtml(u.kontak_publik)}</span>
                        </div>
                    </div>
                    <p class="small text-secondary flex-grow-1">${escapeHtml(u.deskripsi_singkat)}</p>
                    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                        <span class="${u.is_published ? 'badge-sukses' : 'badge-kuning'}">${u.is_published ? 'Aktif' : 'Draf'}</span>
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-outline-primary" onclick="window.KMPUAdmin.openUnitModal(${u.id})">Edit</button>
                            <button type="button" class="btn btn-outline-danger" onclick="window.KMPUAdmin.deleteUnit(${u.id})">Hapus</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function openUnitModal(id) {
        const form = document.getElementById('adminUnitForm');
        form.reset();
        if (id) {
            const u = KMPUStore.getBusinessUnitBySlug(id);
            if (u) {
                document.getElementById('unitId').value = u.id;
                document.getElementById('unitNama').value = u.nama;
                document.getElementById('unitKontak').value = u.kontak_publik || '';
                document.getElementById('unitFoto').value = u.foto_sampul || '';
                document.getElementById('unitDeskSingkat').value = u.deskripsi_singkat || '';
                document.getElementById('unitDeskLengkap').value = u.deskripsi_lengkap || '';
            }
        } else {
            document.getElementById('unitId').value = '';
        }
        new bootstrap.Modal(document.getElementById('adminUnitModal')).show();
    }

    function renderOfficersGrid() {
        const officers = KMPUStore.getOfficers(false);
        const grid = document.getElementById('adminOfficersGrid');
        if (!grid) return;
        grid.innerHTML = officers.map(o => `
            <div class="col-md-6 col-lg-4">
                <div class="kmp-card-static p-4 h-100 d-flex flex-column text-center align-items-center">
                    <img src="${escapeHtml(o.foto)}" alt="${escapeHtml(o.nama_lengkap)}" class="rounded-circle border mb-3" style="width: 84px; height: 84px; object-fit: cover;">
                    ${o.is_ketua ? '<span class="badge-merah mb-1">Ketua Koperasi</span>' : ''}
                    <h3 class="h6 font-editorial mb-1">${escapeHtml(o.nama_lengkap)}</h3>
                    <div class="small fw-semibold text-danger mb-2">${escapeHtml(o.jabatan)}</div>
                    <p class="small text-secondary flex-grow-1">${escapeHtml(o.deskripsi)}</p>
                    <div class="btn-group btn-group-sm w-100 pt-2 border-top">
                        <button type="button" class="btn btn-outline-primary" onclick="window.KMPUAdmin.openOfficerModal(${o.id})">Edit</button>
                        <button type="button" class="btn btn-outline-danger" onclick="window.KMPUAdmin.deleteOfficer(${o.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function openOfficerModal(id) {
        const form = document.getElementById('adminOfficerForm');
        form.reset();
        if (id) {
            const o = KMPUStore.getOfficers(false).find(item => String(item.id) === String(id));
            if (o) {
                document.getElementById('offId').value = o.id;
                document.getElementById('offNama').value = o.nama_lengkap;
                document.getElementById('offJabatan').value = o.jabatan;
                document.getElementById('offPeriode').value = o.periode || '2024 – 2027';
                document.getElementById('offFoto').value = o.foto || '';
                document.getElementById('offDeskripsi').value = o.deskripsi || '';
                document.getElementById('offIsKetua').checked = !!o.is_ketua;
            }
        } else {
            document.getElementById('offId').value = '';
        }
        new bootstrap.Modal(document.getElementById('adminOfficerModal')).show();
    }

    function populateSettingsForms() {
        const s = KMPUStore.getSettings();
        document.getElementById('settingLogoUrl').value = s.logo_url || '';
        document.getElementById('settingNamaKoperasi').value = s.nama_koperasi || '';
        document.getElementById('settingSubjudul').value = s.subjudul_koperasi || '';
        document.getElementById('settingDesktopSize').value = s.desktop_logo_size || 46;
        document.getElementById('settingMobileSize').value = s.mobile_logo_size || 38;
        document.getElementById('settingLogoShape').value = s.logo_shape || 'lingkaran';
        document.getElementById('settingTagline').value = s.tagline || '';
        document.getElementById('settingSejarah').value = s.sejarah || '';
        document.getElementById('settingVisi').value = s.visi || '';
        document.getElementById('settingMisi').value = s.misi || '';

        document.getElementById('settingWhatsapp').value = s.whatsapp || '';
        document.getElementById('settingTelepon').value = s.telepon || '';
        document.getElementById('settingEmail').value = s.email_resmi || '';
        document.getElementById('settingJam').value = s.jam_pelayanan || '';
        document.getElementById('settingAlamat').value = s.alamat_sekretariat || '';
        document.getElementById('settingWaTemplate').value = s.wa_registration_message || '';

        syncSidebarIdentity();
    }

    function switchTab(tabName) {
        document.querySelectorAll('.admin-tab-pane').forEach(el => el.classList.add('d-none'));
        const target = document.getElementById('admin-tab-' + tabName);
        if (target) target.classList.remove('d-none');

        document.querySelectorAll('[data-admin-tab]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-admin-tab') === tabName);
        });

        const titles = {
            dashboard: 'Ringkasan Dashboard',
            pendaftaran: 'Pendaftaran Anggota & Tindak Lanjut WhatsApp',
            produk: 'Katalog Produk Koperasi',
            kategori: 'Kategori Produk',
            usaha: 'Bidang Usaha Koperasi',
            pengurus: 'Struktur Pengurus & Pengawas',
            identitas: 'Pengaturan Identitas & Logo Website',
            whatsapp: 'Pengaturan Kontak & WhatsApp'
        };
        document.getElementById('adminTopbarTitle').textContent = titles[tabName] || 'Dashboard Pengurus';
        document.getElementById('adminSidebar').classList.remove('show');

        if (tabName === 'dashboard') renderDashboard();
        else if (tabName === 'pendaftaran') renderApplicationsTable();
        else if (tabName === 'produk') renderProductsTable();
        else if (tabName === 'kategori') renderCategoriesTable();
        else if (tabName === 'usaha') renderUnitsGrid();
        else if (tabName === 'pengurus') renderOfficersGrid();
        else if (tabName === 'identitas' || tabName === 'whatsapp') populateSettingsForms();
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!window.KMPUStore.isAuthenticated()) {
            window.location.href = '/login';
            return;
        }

        syncSidebarIdentity();
        renderDashboard();

        document.getElementById('adminAppSearch')?.addEventListener('input', renderApplicationsTable);
        document.getElementById('adminAppStatusFilter')?.addEventListener('change', renderApplicationsTable);

        // Simpan Pendaftaran Anggota
        document.getElementById('adminApplicationForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('appId').value;
            const payload = {
                nama_lengkap: document.getElementById('appNama').value.trim(),
                nomor_hp_wa: document.getElementById('appWa').value.trim(),
                domisili: document.getElementById('appDomisili').value.trim(),
                jenis_keanggotaan: document.getElementById('appJenis').value,
                status_verifikasi: document.getElementById('appStatus').value,
                jadwal_tindak_lanjut: document.getElementById('appJadwal').value,
                catatan_admin: document.getElementById('appCatatan').value.trim()
            };
            if (id) {
                KMPUStore.updateApplication(id, payload);
                showNotice('Data tindak lanjut pendaftaran anggota berhasil diperbarui.');
            } else {
                KMPUStore.createApplication(payload);
                showNotice('Pendaftaran anggota dari WhatsApp berhasil dicatat.');
            }
            bootstrap.Modal.getInstance(document.getElementById('adminApplicationModal'))?.hide();
            renderDashboard();
            renderApplicationsTable();
        });

        // Simpan Produk
        document.getElementById('adminProductForm').addEventListener('submit', function (e) {
            e.preventDefault();
            KMPUStore.saveProduct({
                id: document.getElementById('prodId').value || null,
                nama: document.getElementById('prodNama').value.trim(),
                harga: document.getElementById('prodHarga').value,
                product_category_id: document.getElementById('prodKategori').value,
                business_unit_id: document.getElementById('prodUnit').value,
                status_ketersediaan: document.getElementById('prodStatusStok').value,
                stok: document.getElementById('prodStok').value,
                foto: document.getElementById('prodFoto').value.trim(),
                deskripsi_singkat: document.getElementById('prodDeskSingkat').value.trim(),
                deskripsi_lengkap: document.getElementById('prodDeskLengkap').value.trim(),
                is_featured: document.getElementById('prodFeatured').checked,
                is_published: document.getElementById('prodPublished').checked
            });
            bootstrap.Modal.getInstance(document.getElementById('adminProductModal'))?.hide();
            showNotice('Data produk berhasil disimpan ke katalog.');
            renderProductsTable();
            renderDashboard();
        });

        // Simpan Kategori
        document.getElementById('adminCategoryForm').addEventListener('submit', function (e) {
            e.preventDefault();
            KMPUStore.saveCategory({
                id: document.getElementById('catId').value || null,
                nama: document.getElementById('catNama').value.trim(),
                deskripsi: document.getElementById('catDeskripsi').value.trim()
            });
            this.reset();
            document.getElementById('catId').value = '';
            showNotice('Kategori produk berhasil disimpan.');
            renderCategoriesTable();
        });

        // Simpan Bidang Usaha
        document.getElementById('adminUnitForm').addEventListener('submit', function (e) {
            e.preventDefault();
            KMPUStore.saveBusinessUnit({
                id: document.getElementById('unitId').value || null,
                nama: document.getElementById('unitNama').value.trim(),
                kontak_publik: document.getElementById('unitKontak').value.trim(),
                foto_sampul: document.getElementById('unitFoto').value.trim(),
                deskripsi_singkat: document.getElementById('unitDeskSingkat').value.trim(),
                deskripsi_lengkap: document.getElementById('unitDeskLengkap').value.trim()
            });
            bootstrap.Modal.getInstance(document.getElementById('adminUnitModal'))?.hide();
            showNotice('Data bidang usaha berhasil disimpan.');
            renderUnitsGrid();
        });

        // Simpan Pengurus
        document.getElementById('adminOfficerForm').addEventListener('submit', function (e) {
            e.preventDefault();
            KMPUStore.saveOfficer({
                id: document.getElementById('offId').value || null,
                nama_lengkap: document.getElementById('offNama').value.trim(),
                jabatan: document.getElementById('offJabatan').value.trim(),
                periode: document.getElementById('offPeriode').value.trim(),
                foto: document.getElementById('offFoto').value.trim(),
                deskripsi: document.getElementById('offDeskripsi').value.trim(),
                is_ketua: document.getElementById('offIsKetua').checked
            });
            bootstrap.Modal.getInstance(document.getElementById('adminOfficerModal'))?.hide();
            showNotice('Data pengurus koperasi berhasil disimpan.');
            renderOfficersGrid();
        });

        // Upload File Logo -> DataURL
        document.getElementById('settingLogoFile').addEventListener('change', function () {
            const file = this.files && this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (ev) {
                document.getElementById('settingLogoUrl').value = ev.target.result;
                KMPUStore.updateSettings({ logo_url: ev.target.result });
                syncSidebarIdentity();
                showNotice('Gambar logo berhasil dimuat. Klik Simpan Identitas & Logo untuk menerapkan permanen.');
            };
            reader.readAsDataURL(file);
        });

        // Simpan Identitas & Logo
        document.getElementById('adminIdentityForm').addEventListener('submit', function (e) {
            e.preventDefault();
            KMPUStore.updateSettings({
                logo_url: document.getElementById('settingLogoUrl').value.trim(),
                nama_koperasi: document.getElementById('settingNamaKoperasi').value.trim(),
                subjudul_koperasi: document.getElementById('settingSubjudul').value.trim(),
                desktop_logo_size: Number(document.getElementById('settingDesktopSize').value) || 46,
                mobile_logo_size: Number(document.getElementById('settingMobileSize').value) || 38,
                logo_shape: document.getElementById('settingLogoShape').value,
                tagline: document.getElementById('settingTagline').value.trim(),
                sejarah: document.getElementById('settingSejarah').value.trim(),
                visi: document.getElementById('settingVisi').value.trim(),
                misi: document.getElementById('settingMisi').value.trim()
            });
            syncSidebarIdentity();
            showNotice('Identitas visual & logo koperasi berhasil diperbarui untuk seluruh halaman website!');
        });

        // Simpan Pengaturan Kontak & WhatsApp
        document.getElementById('adminWhatsappForm').addEventListener('submit', function (e) {
            e.preventDefault();
            KMPUStore.updateSettings({
                whatsapp: document.getElementById('settingWhatsapp').value.trim(),
                telepon: document.getElementById('settingTelepon').value.trim(),
                email_resmi: document.getElementById('settingEmail').value.trim(),
                jam_pelayanan: document.getElementById('settingJam').value.trim(),
                alamat_sekretariat: document.getElementById('settingAlamat').value.trim(),
                wa_registration_message: document.getElementById('settingWaTemplate').value
            });
            showNotice('Pengaturan kontak sekretariat & integrasi WhatsApp berhasil disimpan!');
        });
    });

    window.KMPUAdmin = {
        switchTab: switchTab,
        openNewApplicationModal: openNewApplicationModal,
        openEditApplicationModal: openEditApplicationModal,
        deleteApplication: function (id) {
            if (confirm('Hapus data permohonan pendaftaran anggota ini?')) {
                KMPUStore.deleteApplication(id);
                renderApplicationsTable();
                renderDashboard();
                showNotice('Data pendaftaran telah dihapus.');
            }
        },
        openProductModal: openProductModal,
        toggleProductPublish: function (id) {
            KMPUStore.toggleProductPublish(id);
            renderProductsTable();
        },
        deleteProduct: function (id) {
            if (confirm('Hapus produk ini dari katalog?')) {
                KMPUStore.deleteProduct(id);
                renderProductsTable();
                renderDashboard();
                showNotice('Produk telah dihapus.');
            }
        },
        editCategory: function (id) {
            const cat = KMPUStore.getCategories().find(c => String(c.id) === String(id));
            if (cat) {
                document.getElementById('catId').value = cat.id;
                document.getElementById('catNama').value = cat.nama;
                document.getElementById('catDeskripsi').value = cat.deskripsi || '';
            }
        },
        deleteCategory: function (id) {
            if (confirm('Hapus kategori produk ini?')) {
                KMPUStore.deleteCategory(id);
                renderCategoriesTable();
            }
        },
        openUnitModal: openUnitModal,
        deleteUnit: function (id) {
            if (confirm('Hapus bidang usaha ini?')) {
                KMPUStore.deleteBusinessUnit(id);
                renderUnitsGrid();
                showNotice('Bidang usaha telah dihapus.');
            }
        },
        openOfficerModal: openOfficerModal,
        deleteOfficer: function (id) {
            if (confirm('Hapus data pengurus ini?')) {
                KMPUStore.deleteOfficer(id);
                renderOfficersGrid();
                showNotice('Data pengurus telah dihapus.');
            }
        },
        resetLogoToDefault: function () {
            document.getElementById('settingLogoUrl').value = '';
            document.getElementById('settingLogoFile').value = '';
            KMPUStore.updateSettings({ logo_url: '' });
            syncSidebarIdentity();
            showNotice('Logo berhasil dikembalikan ke lambang default Merah Putih (MP).');
        },
        resetDemoData: function () {
            if (confirm('Kembalikan seluruh data produk, pengurus, pendaftaran, dan identitas ke data awal Koperasi Kelurahan Merah Putih Ulujami?')) {
                KMPUStore.resetToDefaults();
                populateSettingsForms();
                renderDashboard();
                showNotice('Seluruh data berhasil dikembalikan ke pengaturan awal.');
            }
        },
        logout: function () {
            KMPUStore.logout();
            window.location.href = '/login';
        }
    };
})();
