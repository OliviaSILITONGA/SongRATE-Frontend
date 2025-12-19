# ⚡ Quick Fix: "Failed to Fetch" Error

## 🎯 Ikuti langkah ini:

### 1️⃣ Buka Console (F12)

Tekan **F12** → buka tab **Console**

### 2️⃣ Coba Login

Masukkan email & password → klik "Log in"

### 3️⃣ Lihat Error di Console

Catat semua message yang muncul (terutama yang punya emoji 🔐, 🚨, ❌)

---

## 🔧 Common Fixes

### Fix #1: Backend URL di .env

Jika backend running di local, update `.env`:

**Dari:**

```
VITE_API_URL=https://backendsongrate-production.up.railway.app
```

**Menjadi:**

```
VITE_API_URL=http://localhost:3000
```

**Atau sesuai port backend Anda:**

```
VITE_API_URL=http://localhost:8000
VITE_API_URL=http://localhost:5000
VITE_API_URL=http://192.168.x.x:3000
```

Setelah edit:

- Simpan file
- Refresh browser (Ctrl+R atau F5)
- Coba login lagi

---

### Fix #2: Enable CORS di Backend

Jika production, pastikan backend enable CORS:

**Node.js/Express:**

```javascript
const cors = require("cors");
app.use(cors());
```

**Atau:**

```javascript
app.use(
  cors({
    origin: "http://localhost:5175",
  })
);
```

---

### Fix #3: Check Network Tab

1. Buka DevTools → **Network** tab
2. Refresh page
3. Masukkan credentials → klik Login
4. Lihat request `auth/login` atau `login`
5. Check:
   - **Status**: Should be 200 (not 404, 500, etc)
   - **Response**: Should have `token` & `user` fields

---

## 🧪 Test Backend Dengan Postman

1. Download Postman
2. Create **POST** request
3. URL: `http://localhost:3000/api/auth/login` (adjust port)
4. Headers:
   ```
   Content-Type: application/json
   ```
5. Body (JSON):
   ```json
   {
     "email": "admin@songrate.com",
     "password": "password123"
   }
   ```
6. Send → Check response

---

## 📝 Info Needed to Help

Berikan ini supaya saya bisa fix:

1. **Backend URL** sekarang apa?

   - Production: `https://...`?
   - Local: `http://localhost:...`?

2. **Endpoint path** yang correct?

   - `/api/auth/login`?
   - `/auth/login`?
   - `/login`?

3. **Console error** apa exactly?

   - Copy paste message dengan emoji

4. **Network response** apa?
   - Status code?
   - Response body?

---

## 💡 Quick Test

Di browser console, jalankan:

```javascript
// Test fetch ke backend
fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@songrate.com",
    password: "password123",
  }),
})
  .then((r) => r.json())
  .then((d) => console.log("✅ Success:", d))
  .catch((e) => console.log("❌ Error:", e));
```

Lihat apa response-nya

---

**Siap? Bilang data-data di atas, nanti saya fix!** 🚀
