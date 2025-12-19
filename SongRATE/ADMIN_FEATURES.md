# Fitur Admin Dashboard - SongRATE

Dokumentasi lengkap fitur-fitur yang telah ditambahkan ke Admin Dashboard.

## 📋 Fitur Utama

### 1. **Manajemen Lagu (Songs Management)**

Admin dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada lagu:

#### Menambah Lagu

- Klik tombol **"+ Tambah Lagu"** di halaman Songs
- Isi form dengan data lagu:
  - Judul Lagu
  - Artis
  - Album
  - Genre
  - Durasi (format: MM:SS, contoh: 3:45)
  - Tanggal Rilis
  - URL Gambar
- Klik **"Simpan"** untuk menambahkan

#### Mengedit Lagu

- Klik tombol **"Edit"** pada baris lagu yang ingin diubah
- Ubah data yang diperlukan
- Klik **"Simpan"** untuk menyimpan perubahan

#### Menghapus Lagu

- Klik tombol **"Hapus"** pada baris lagu
- Konfirmasi penghapusan
- Lagu akan dihapus dari sistem

**Lokasi File**: [src/components/AdminSongTable.jsx](src/components/AdminSongTable.jsx)

---

### 2. **Manajemen User (Users Management)**

Admin dapat melihat semua user yang sudah login ke SongRATE:

#### Informasi User yang Ditampilkan

- **ID**: ID unik user
- **Nama**: Nama lengkap user
- **Email**: Alamat email user
- **Tanggal Daftar**: Kapan user melakukan registrasi
- **Status**: Status aktivitas user (Aktif/Tidak Aktif)
- **Aksi**: Tombol untuk melihat detail atau verifikasi user

#### Menu User

- Klik tab **"Users"** di sidebar
- Lihat daftar lengkap semua user yang terdaftar
- Gunakan tombol **"Lihat"** untuk melihat detail user
- Gunakan tombol **"Verifikasi"** untuk verifikasi user

**Lokasi File**: [src/components/AdminUserTable.jsx](src/components/AdminUserTable.jsx)

---

### 3. **Dashboard Overview**

Dashboard menampilkan statistik penting:

- **Total Songs**: Jumlah lagu yang ada di sistem
- **Total Users**: Jumlah user yang terdaftar
- **Active Users**: Jumlah user aktif
- **Total Ratings**: Total rating yang diberikan user

Juga menampilkan **"Aktivitas Terbaru"** yang mencakup:

- Lagu yang baru ditambahkan
- User baru yang mendaftar
- Waktu aktivitas terjadi

**Lokasi File**:

- [src/components/AdminStatsCard.jsx](src/components/AdminStatsCard.jsx)
- [src/components/AdminRecentActivity.jsx](src/components/AdminRecentActivity.jsx)

---

## 🎨 Struktur UI

### Sidebar Navigation

Menu navigasi di sebelah kiri dengan pilihan:

- 📊 Dashboard - Halaman utama
- 👥 Users - Manajemen user
- 🎵 Songs - Manajemen lagu
- 💿 Albums - (dalam pengembangan)
- ⭐ Ratings - (dalam pengembangan)
- 📈 Analytics - (dalam pengembangan)
- ⚙️ Settings - (dalam pengembangan)

### Color Scheme

- **Warna Utama**: Yellow (#FFD700) untuk tombol aksi
- **Warna Danger**: Red (#DC2626) untuk tombol hapus
- **Warna Info**: Blue (#2563EB) untuk tombol edit/lihat
- **Background**: Dark theme (#0F1116, #1C1F26)

---

## 🔄 API Integration

### Endpoint yang Digunakan

Sistem dirancang untuk menggunakan API endpoints berikut:

```
GET    /api/songs              - Mendapatkan daftar lagu
POST   /api/songs              - Membuat lagu baru
PUT    /api/songs/:id          - Mengupdate lagu
DELETE /api/songs/:id          - Menghapus lagu

GET    /api/users              - Mendapatkan daftar user
GET    /api/users/:id          - Mendapatkan detail user
PUT    /api/users/:id          - Mengupdate user
```

### Mock Data

Jika API tidak tersedia, sistem akan menggunakan mock data lokal untuk keperluan demonstrasi.

---

## 📝 Catatan Teknis

### Komponen Utama

1. **AdminDashboard.jsx** - Komponen utama yang mengelola state dan logika
2. **AdminSidebar.jsx** - Navigasi sidebar
3. **AdminSongTable.jsx** - Tabel manajemen lagu
4. **AdminUserTable.jsx** - Tabel manajemen user
5. **AdminStatsCard.jsx** - Card statistik
6. **AdminRecentActivity.jsx** - Widget aktivitas terbaru

### Dependencies

- React 18+
- Framer Motion (untuk animasi sidebar)
- Tailwind CSS (untuk styling)
- React Router (untuk navigasi)

### State Management

Menggunakan React Hooks (useState, useEffect) untuk mengelola:

- Data lagu (songs)
- Data user (users)
- Modal state
- Form data
- Active tab

---

## 🚀 Cara Menggunakan

### Login sebagai Admin

1. Akses halaman login
2. Masukkan email dan password admin
3. Anda akan diarahkan ke Admin Dashboard

### Navigasi

1. Gunakan sidebar untuk berpindah antar halaman
2. Klik toggle menu (☰) untuk membuka/menutup sidebar
3. Klik **Logout** di header untuk keluar

### Manajemen Lagu

1. Buka tab **Songs** dari sidebar
2. Klik **"+ Tambah Lagu"** untuk menambah
3. Klik **"Edit"** untuk mengubah
4. Klik **"Hapus"** untuk menghapus

### Manajemen User

1. Buka tab **Users** dari sidebar
2. Lihat daftar semua user yang terdaftar
3. Gunakan tombol aksi untuk operasi lebih lanjut

---

## 🛠️ Pengembangan Selanjutnya

Fitur yang dapat ditambahkan:

- [ ] Pencarian dan filter lagu
- [ ] Pencarian dan filter user
- [ ] Export data ke CSV/PDF
- [ ] Statistik lebih detail (chart/graph)
- [ ] Manajemen album
- [ ] Manajemen rating
- [ ] System logs/audit trail
- [ ] User permissions/roles
- [ ] Batch operations

---

**Last Updated**: December 19, 2025
