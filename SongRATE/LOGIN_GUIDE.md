# Login & Authentication Guide

## 🔐 Cara Login

### 1. Akun Admin
Untuk login sebagai admin, gunakan credentials:
- **Email**: `admin@songrate.com` (atau sesuai yang ada di backend)
- **Password**: Password admin dari backend

**Hasil**: Setelah login, akan **langsung diarahkan ke `/admin` (Admin Dashboard)**

### 2. Akun Regular User
Untuk login sebagai user biasa, gunakan credentials:
- **Email**: `user@example.com` (atau email user biasa)
- **Password**: Password user dari backend

**Hasil**: Setelah login, akan menampilkan modal success kemudian diarahkan ke `/home` (Home Page)

---

## 🛡️ Fitur Keamanan

### Implementasi:
1. **Token Storage**: Disimpan di localStorage dengan key `token`
2. **Role-Based Access**: Role user disimpan di localStorage untuk quick check
3. **Protected Routes**: Route `/admin` dilindungi oleh `AdminRoute` component
4. **Auto Redirect**:
   - Jika user tidak login → redirect ke `/login`
   - Jika user admin login → langsung ke `/admin`
   - Jika user biasa login → ke `/home`
   - Jika user biasa akses `/admin` → redirect ke `/home`

---

## 📁 File yang Dimodifikasi

### 1. [LoginPage.jsx](src/pages/LoginPage.jsx)
- ✅ Menggunakan `authHelper.loginUser()` untuk login
- ✅ Auto redirect jika sudah login sebelumnya
- ✅ Langsung redirect ke admin untuk akun admin
- ✅ Error handling yang lebih baik

### 2. [AdminRoute.jsx](src/components/AdminRoute.jsx)
- ✅ Proteksi route `/admin`
- ✅ Cek token dan role
- ✅ Redirect ke login jika tidak authorized

### 3. [AdminDashboard.jsx](src/pages/AdminDashboard.jsx)
- ✅ Import `useNavigate` untuk navigation
- ✅ Validasi user di mount
- ✅ Better error handling

### 4. [authHelper.js](src/utils/authHelper.js) ✨ BARU
Helper functions untuk:
- `loginUser(email, password)` - Login user
- `logoutUser()` - Logout user
- `isLoggedIn()` - Check if logged in
- `isAdmin()` - Check if user is admin
- `getCurrentUser()` - Get current user data
- `getAuthHeaders()` - Get auth headers untuk API calls

---

## 🔄 Login Flow Diagram

```
User inputs email & password
        ↓
Validate form (email, password required)
        ↓
Call loginUser() helper
        ↓
API Request: POST /api/auth/login
        ↓
    ✓ Success                  ✗ Failed
        ↓                           ↓
Save token & user             Show error message
        ↓
Is Admin? ─ YES ─→ Redirect to /admin
        │
        └─ NO ─→ Show modal → Redirect to /home
```

---

## 🧪 Testing Login

### Prerequisites
1. Backend API harus running di URL yang tercantum di `.env`
2. User admin harus ada di database dengan role `"admin"`

### Test Steps

#### Test Admin Login:
1. Buka http://localhost:5174/login
2. Masukkan email admin dan password
3. Klik "Log in"
4. **Expected**: Langsung diarahkan ke `/admin` (Admin Dashboard)

#### Test Regular User Login:
1. Buka http://localhost:5174/login
2. Masukkan email user dan password
3. Klik "Log in"
4. **Expected**: Modal "Welcome Back!" muncul → Klik OK → Diarahkan ke `/home`

#### Test Error Handling:
1. Login dengan email yang tidak terdaftar
   - **Expected**: Pesan error "Email not found"
2. Login dengan password salah
   - **Expected**: Pesan error "Incorrect password"

#### Test Protected Route:
1. Logout
2. Akses langsung http://localhost:5174/admin
3. **Expected**: Redirect ke `/login`

---

## 🚀 Environment Variables

File `.env` harus berisi:
```
VITE_API_URL=https://backendsongrate-production.up.railway.app
```

Atau untuk local development:
```
VITE_API_URL=http://localhost:3000
```

---

## 📝 Notes

- Token dan user data disimpan di localStorage
- Backend harus mengembalikan response dengan format:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "admin@songrate.com",
      "name": "Admin User",
      "role": "admin"
    }
  }
  ```
- Error message dari backend akan ditampilkan sesuai jenis error (password, email, dll)

---

**Last Updated**: December 20, 2025
