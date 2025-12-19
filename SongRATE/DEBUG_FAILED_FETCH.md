# 🔧 Debugging Login "Failed to Fetch" Error

## 🚨 Problem: "Failed to Fetch" Error

Jika mendapat error "Failed to Fetch" saat login, ikuti langkah-langkah ini:

---

## 📋 Step 1: Check Browser Console

1. Buka browser
2. Tekan **F12** → buka **Console** tab
3. Lihat message dengan emoji:
   - 🔐 = Login attempt info
   - 📊 = Response info
   - 📦 = Response data
   - ❌ = Error messages
   - 🚨 = Exception details

**Contoh output yang baik:**
```
🔐 Login attempt to: http://localhost:3000/api/auth/login
📧 Email: admin@songrate.com
📊 Response status: 200
📊 Response ok: true
📦 Response data: {token: "...", user: {...}}
✅ Login successful!
```

**Contoh output error:**
```
🔐 Login attempt to: http://localhost:3000/api/auth/login
❌ Login error: fetch failed
🚨 Login exception: TypeError: Failed to fetch
```

---

## 🔍 Step 2: Check Backend URL

### Current Configuration
File `.env` sekarang berisi:
```
VITE_API_URL=https://backendsongrate-production.up.railway.app
```

### Kemungkinan Issue:
1. **Production URL tidak jalan** → gunakan local backend
2. **Backend URL berbeda** → update `.env`
3. **Endpoint path salah** → check API documentation

---

## ✅ Step 3: Update Backend URL (Jika Diperlukan)

Jika backend Anda di local, ganti `.env`:

**Jika backend running di local (http://localhost:3000):**
```
VITE_API_URL=http://localhost:3000
```

**Jika backend di production:**
```
VITE_API_URL=https://your-backend-url.com
```

**Setelah edit .env:**
1. Simpan file
2. Refresh browser (bukan Ctrl+Shift+R)
3. Coba login lagi

---

## 🔗 Step 4: Verify Backend Endpoint

### Check API Endpoint Path

**Default yang digunakan:**
```
POST /api/auth/login
```

**Jika endpoint berbeda, tell me:**
- Endpoint path (misalnya `/auth/login`, `/login`, dll)
- Request format (body format)
- Response format (token field, user field, dll)

---

## 📡 Step 5: Test Backend Directly

### Gunakan Postman atau cURL

**cURL Test:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@songrate.com",
    "password": "password123"
  }'
```

**Expected Response (200 OK):**
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

**Error Response (401):**
```json
{
  "message": "Email not found"
}
```

---

## 🔌 Step 6: Check CORS (If Production)

Jika using production backend, pastikan CORS enabled di backend:

```javascript
// Backend harus allow request dari frontend
// Example (Node.js/Express):
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5175',
  credentials: true
}));
```

---

## 🐛 Step 7: Common Issues & Solutions

### Issue: "Failed to fetch"
**Cause:** Backend tidak running atau URL salah
**Solution:**
- [ ] Pastikan backend sudah running
- [ ] Verifikasi URL di `.env`
- [ ] Cek di browser DevTools → Network tab

### Issue: CORS error
**Cause:** Backend tidak allow frontend domain
**Solution:**
- [ ] Enable CORS di backend
- [ ] Allow frontend URL

### Issue: "Email not found"
**Cause:** Email tidak terdaftar
**Solution:**
- [ ] Check database, pastikan user ada
- [ ] Gunakan email yang benar

### Issue: "Incorrect password"
**Cause:** Password salah
**Solution:**
- [ ] Verify password di database
- [ ] Cek caps lock

---

## 📊 Network Tab Debugging

1. Buka DevTools (F12) → **Network** tab
2. Submit login form
3. Lihat request ke `/api/auth/login`
4. Check:
   - **Status code**: 200 = OK, 400/401 = Error, 500 = Server error
   - **Request headers**: Content-Type should be "application/json"
   - **Request body**: email & password
   - **Response**: Token & user data

---

## 🔐 Step 8: Verify Token Storage

Jika login berhasil tapi tidak redirect:

**Di browser console, jalankan:**
```javascript
// Check token
console.log(localStorage.getItem("token"))

// Check user
console.log(JSON.parse(localStorage.getItem("user")))

// Check role
console.log(localStorage.getItem("role"))
```

**Seharusnya muncul data, bukan null/undefined**

---

## 📋 Checklist Debugging

- [ ] Buka Console (F12)
- [ ] Lihat error message di console
- [ ] Check Network tab untuk API response
- [ ] Verify backend URL di .env
- [ ] Test backend endpoint dengan cURL/Postman
- [ ] Check CORS settings di backend
- [ ] Verify user data di database
- [ ] Check localStorage untuk token

---

## 🆘 Information Needed

Untuk fix issue Anda, saya butuh:

1. **Backend URL**: Berapa URL backend Anda?
   ```
   - Production: https://...?
   - Local: http://localhost:3000?
   ```

2. **Endpoint path**: Path login endpoint apa?
   ```
   - /api/auth/login?
   - /auth/login?
   - /login?
   ```

3. **Console error**: Apa exact error message di console?
   ```
   (copy paste dari console)
   ```

4. **Network response**: Apa response status & body dari API call?
   ```
   (dari Network tab)
   ```

---

## 🎯 Quick Fix (Paling Umum)

Jika backend running di local **http://localhost:3000**:

1. Edit `.env`:
```
VITE_API_URL=http://localhost:3000
```

2. Simpan file

3. Refresh browser

4. Try login again

---

## 📞 Next Action

**Tell me:**
1. Backend URL yang sekarang (production atau local?)
2. API endpoint path yang correct
3. Console error message yang muncul

**Atau:**
Copy paste dari console semua message yang muncul setelah click login button

---

**Saya siap bantu fix-nya!** 💪
