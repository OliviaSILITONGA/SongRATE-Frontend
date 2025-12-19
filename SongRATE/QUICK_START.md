# 🚀 Quick Start Guide

## ⚡ 5 Menit Setup

### Step 1: Pastikan Backend Running
- Backend API harus running dan accessible
- Default URL: `https://backendsongrate-production.up.railway.app`
- Atau local: `http://localhost:3000`

### Step 2: Start Development Server
```bash
cd SongRATE
npm run dev
```

Server akan running di: **http://localhost:5173** (atau port berikutnya jika taken)

### Step 3: Test Login

#### 🔓 Admin Login
1. Buka http://localhost:5173/login
2. Masukkan **admin email** dan **admin password**
3. Klik "Log in"
4. ✅ **Expected**: Langsung masuk ke **Admin Dashboard** (`/admin`)

#### 👤 Regular User Login
1. Buka http://localhost:5173/login
2. Masukkan **user email** dan **user password**
3. Klik "Log in"
4. ✅ **Expected**: Modal success → Redirect ke **Home** (`/home`)

---

## 📌 Lokasi File Penting

```
SongRATE/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx          ← Login form
│   │   └── AdminDashboard.jsx     ← Admin dashboard
│   ├── components/
│   │   ├── AdminRoute.jsx         ← Protected route
│   │   ├── AdminSidebar.jsx       ← Admin menu
│   │   └── ...
│   └── utils/
│       └── authHelper.js          ← Auth functions
├── .env                            ← API URL config
└── ...
```

---

## 🎨 Admin Dashboard Features

### Dashboard Tab
- 📊 Stats cards (Total Songs, Users, Ratings)
- 📈 Recent activity
- 👥 User list

### Songs Tab
- 🎵 Semua lagu dalam tabel
- ➕ Tombol "Tambah Lagu"
- ✏️ Edit button untuk ubah lagu
- 🗑️ Delete button untuk hapus lagu

### Users Tab
- 👥 Daftar semua user yang login
- 📧 Email, nama, tanggal daftar
- ✅ Status (Aktif/Tidak Aktif)

### Sidebar
- 📊 Dashboard
- 👥 Users
- 🎵 Songs
- 💿 Albums (coming soon)
- ⭐ Ratings (coming soon)
- 📈 Analytics (coming soon)
- ⚙️ Settings (coming soon)
- 🚪 Logout button

---

## 🔐 What's Stored in Browser

After login, browser stores:
```javascript
localStorage.getItem("token")     // JWT token
localStorage.getItem("user")      // User data: {id, email, name, role}
localStorage.getItem("role")      // Role: "admin" atau "user"
```

**Clear data**: `localStorage.clear()` di console

---

## 🐛 Common Issues & Solutions

### ❌ "Email not found"
- Email tidak terdaftar di backend
- ✓ Gunakan email yang sudah register

### ❌ "Incorrect password"
- Password salah
- ✓ Pastikan caps lock off
- ✓ Coba reset password di forgot-password

### ❌ "Failed to connect to server"
- Backend tidak running atau API URL salah
- ✓ Pastikan backend running
- ✓ Check `.env` file untuk API URL yang benar
- ✓ Pastikan CORS enabled di backend

### ❌ Login tapi stuck loading
- API call slow atau error
- ✓ Check browser DevTools → Network tab
- ✓ Check browser Console untuk error message
- ✓ Restart server: `npm run dev`

### ❌ Admin tidak masuk ke /admin
- User role bukan "admin" di database
- ✓ Check database, set role = "admin"
- ✓ Check API response mengandung role field
- ✓ Clear localStorage: `localStorage.clear()`

---

## 📱 Testing Checklist

- [ ] Admin login → masuk dashboard
- [ ] User login → modal + home
- [ ] Logout → redirect login
- [ ] Add song (kosong field) → error
- [ ] Edit song → data berubah
- [ ] Delete song → konfirmasi
- [ ] View users → list muncul
- [ ] Refresh page → session persist
- [ ] Direct access /admin tanpa login → redirect login
- [ ] User akses /admin → redirect home

---

## 💡 Tips & Tricks

### Cek session di browser console:
```javascript
// Lihat token
console.log(localStorage.getItem("token"))

// Lihat user data
console.log(JSON.parse(localStorage.getItem("user")))

// Lihat role
console.log(localStorage.getItem("role"))

// Clear semua
localStorage.clear()

// Force redirect
window.location.href = "/login"
```

### Network debugging:
1. Buka DevTools (F12)
2. Ke tab "Network"
3. Submit login form
4. Lihat request ke `/api/auth/login`
5. Check response status & body

---

## 🚀 Next Steps

- [ ] Update backend API dengan user role "admin"
- [ ] Test dengan production database
- [ ] Implement refresh token
- [ ] Add more admin features
- [ ] Deploy to production

---

## 📚 Documentation Files

- **IMPLEMENTATION_SUMMARY.md** - Ringkasan lengkap implementasi
- **LOGIN_AND_AUTH_TESTING.md** - Panduan testing detail
- **LOGIN_GUIDE.md** - Security & architecture
- **ADMIN_FEATURES.md** - Admin dashboard features

---

## ☎️ Support

Jika ada issue:
1. Cek documentation files
2. Check browser console (F12)
3. Check network requests (DevTools)
4. Verify API URL di .env
5. Restart development server

---

**Ready to go!** 🚀  
**Happy coding!** 💻
