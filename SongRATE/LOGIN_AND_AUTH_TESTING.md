# 🔐 Login dan Admin Dashboard - Panduan Lengkap

## ✅ Fitur yang Berhasil Diimplementasikan

### 1. **Login System**

- ✅ Form login dengan validasi email dan password
- ✅ Error handling yang spesifik (email not found, incorrect password)
- ✅ Loading state selama proses login
- ✅ Auto redirect jika sudah login
- ✅ Auth helper untuk reusable login logic

### 2. **Role-Based Redirect**

- ✅ **Admin**: Langsung ke `/admin` (Admin Dashboard) tanpa modal
- ✅ **Regular User**: Tampilkan modal → Redirect ke `/home`

### 3. **Protected Routes**

- ✅ Route `/admin` dilindungi oleh `AdminRoute` component
- ✅ Token dan role verification
- ✅ Auto redirect ke login jika tidak authorized

### 4. **Session Management**

- ✅ Token disimpan di localStorage
- ✅ User data dan role disimpan
- ✅ Logout membersihkan semua data

---

## 🧪 Testing Login

### Test Credentials

Gunakan credentials dari backend Anda sendiri. Pastikan ada user dengan role "admin":

```
Admin User:
- Email: admin@songrate.com (atau email admin di sistem Anda)
- Password: (password admin dari backend)

Regular User:
- Email: user@example.com (atau email user di sistem Anda)
- Password: (password user dari backend)
```

### Test Steps

#### 1️⃣ Test Admin Login

1. Buka http://localhost:5175/login
2. Masukkan email dan password admin
3. Klik "Log in"
4. **Expected Result**: Langsung redirect ke `/admin` (Admin Dashboard)
5. **Verifikasi**:
   - Lihat dashboard dengan stats
   - Sidebar navigation muncul
   - Profile menunjukkan email admin

#### 2️⃣ Test Regular User Login

1. Buka http://localhost:5175/login
2. Masukkan email dan password user biasa
3. Klik "Log in"
4. **Expected Result**: Modal "Welcome Back!" muncul → Redirect ke `/home`

#### 3️⃣ Test Email Validation

1. Kosongkan email field
2. Klik "Log in"
3. **Expected**: Error "Email is required"

#### 4️⃣ Test Email Format

1. Masukkan email tanpa @, contoh: "useremail"
2. Klik "Log in"
3. **Expected**: Error "Invalid email format (must contain @)"

#### 5️⃣ Test Password Validation

1. Kosongkan password field
2. Klik "Log in"
3. **Expected**: Error "Password is required"

#### 6️⃣ Test Wrong Email

1. Login dengan email yang tidak terdaftar
2. **Expected**: Error "Email not found"

#### 7️⃣ Test Wrong Password

1. Login dengan email yang benar tapi password salah
2. **Expected**: Error "Incorrect password"

#### 8️⃣ Test Protected Route

1. Logout atau clear localStorage
2. Akses langsung http://localhost:5175/admin
3. **Expected**: Redirect ke `/login`

#### 9️⃣ Test Regular User Access Admin

1. Login sebagai regular user
2. Akses langsung http://localhost:5175/admin
3. **Expected**: Redirect ke `/home`

#### 🔟 Test Session Persistence

1. Login sebagai admin
2. Refresh halaman (F5)
3. **Expected**: Tetap di admin dashboard (tidak logout)
4. Logout
5. Refresh halaman
6. **Expected**: Redirect ke login

---

## 📁 File yang Telah Dimodifikasi/Dibuat

| File                                                           | Status      | Keterangan                            |
| -------------------------------------------------------------- | ----------- | ------------------------------------- |
| [src/pages/LoginPage.jsx](src/pages/LoginPage.jsx)             | ✅ Modified | Login form dengan role-based redirect |
| [src/pages/AdminDashboard.jsx](src/pages/AdminDashboard.jsx)   | ✅ Modified | Validasi user, import useNavigate     |
| [src/components/AdminRoute.jsx](src/components/AdminRoute.jsx) | ✅ Modified | Better error handling                 |
| [src/utils/authHelper.js](src/utils/authHelper.js)             | ✨ NEW      | Auth helper functions                 |
| [.env](.env)                                                   | ✓ Exists    | API URL configuration                 |

---

## 🔄 Login Flow Architecture

```
┌─────────────────────┐
│   Login Page        │
│ email + password    │
└──────────┬──────────┘
           │
           ▼
   ┌───────────────────┐
   │ Validation        │
   │ - Check email     │
   │ - Check password  │
   └───────┬───────────┘
           │
           ▼
   ┌───────────────────┐
   │ loginUser()       │
   │ (authHelper)      │
   └───────┬───────────┘
           │
           ▼
   ┌───────────────────┐
   │ API Request       │
   │ POST /auth/login  │
   └───┬───────────┬───┘
       │           │
    Success     Error
       │           │
       ▼           ▼
    Save Token  Handle Error
    Save User   Show Message
    Save Role
       │
       ▼
    Check Role
       │
   ┌───┴────────┐
   ▼            ▼
 Admin?      Regular?
   │            │
   │            ▼
   │        Show Modal
   │            │
   │            ▼
   │        Redirect to
   ▼        /home
 Redirect
 to /admin
```

---

## 🔐 Security Features

### ✅ Implemented

- JWT Token-based authentication
- Role-based access control (RBAC)
- Protected routes with verification
- Secure localStorage with token management
- Input validation before sending to API
- Error handling without exposing sensitive info

### ⚠️ Notes

- Token disimpan di localStorage (aman untuk dev, gunakan sessionStorage atau secure cookies untuk production)
- Implement refresh token mechanism untuk production
- Add CSRF protection
- Implement rate limiting di backend

---

## 🛠️ Environment Setup

### File .env

```dotenv
VITE_API_URL=https://backendsongrate-production.up.railway.app
```

### Atau untuk Local Backend

```dotenv
VITE_API_URL=http://localhost:3000
```

---

## 📊 API Response Format

Backend harus mengembalikan response dengan format:

### ✅ Success Response (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@songrate.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### ❌ Error Response (400, 401, 404)

```json
{
  "message": "Email not found"
}
```

Atau

```json
{
  "message": "Incorrect password"
}
```

---

## 🚀 URL Endpoints

| Path               | Akses             | Deskripsi            |
| ------------------ | ----------------- | -------------------- |
| `/login`           | Public            | Login page           |
| `/signup`          | Public            | Sign up page         |
| `/home`            | Protected (user)  | User home page       |
| `/admin`           | Protected (admin) | Admin dashboard      |
| `/forgot-password` | Public            | Forgot password page |

---

## 💡 Tips

1. **Troubleshooting Port Issue**: Jika port 5173/5174 sudah digunakan, server akan otomatis pakai port berikutnya (5175, 5176, dll)
2. **Clear Cache**: Jika ada issue, clear localStorage: `localStorage.clear()` di console
3. **Check Token**: Lihat token di console: `localStorage.getItem('token')`
4. **Check Role**: Lihat role di console: `localStorage.getItem('role')`
5. **API Connection**: Pastikan API endpoint benar dan backend sudah running

---

## ✨ Next Steps (Optional)

- [ ] Implement refresh token
- [ ] Add Google/GitHub OAuth login
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Implement password strength meter
- [ ] Add Remember me functionality
- [ ] Add login history/activity
- [ ] Implement rate limiting
- [ ] Add email verification

---

**Status**: ✅ READY FOR TESTING  
**Last Updated**: December 20, 2025
