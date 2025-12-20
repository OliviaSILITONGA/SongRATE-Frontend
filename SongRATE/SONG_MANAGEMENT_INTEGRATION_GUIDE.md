# Song Management & LoadMoreReleasesPage Integration Guide

## Overview
- **SongManagement Page**: Admin dashboard untuk tambah, edit, dan hapus lagu
- **LoadMoreReleasesPage**: Halaman publik yang menampilkan semua lagu dari backend, dengan fitur edit/delete untuk admin

## Backend Endpoints (Already Configured)

### Admin Routes (`/api/admin`)
```
POST   /api/admin/songs          - Tambah lagu (admin only)
PUT    /api/admin/songs/:id      - Edit lagu (admin only)
DELETE /api/admin/songs/:id      - Hapus lagu (admin only)
```

### Public Routes (`/api`)
```
GET    /api/songs                - Lihat semua lagu (public)
```

## Frontend Integration

### 1. Song Management Page (Admin)
**File**: `src/pages/admin/SongManagement.jsx` (atau sesuai struktur)

**Copy dari**: `SONG_MANAGEMENT_PAGE.jsx`

**Lokasi di sidebar**:
```javascript
<li>
  <Link to="/admin/songs" className="...">
    🎵 Songs
  </Link>
</li>
```

**Route setup (React Router)**:
```javascript
import SongManagement from "../pages/admin/SongManagement";

// Di routes config:
<Route path="/admin/songs" element={<SongManagement />} />
```

### 2. LoadMoreReleasesPage (Public + Admin Edit)
**File**: `src/pages/LoadMoreReleasesPage.jsx`

**Copy dari**: `LOAD_MORE_RELEASES_PAGE.jsx`

**Route setup**:
```javascript
import LoadMoreReleasesPage from "../pages/LoadMoreReleasesPage";

// Di routes config:
<Route path="/load-more-releases" element={<LoadMoreReleasesPage />} />
```

## Key Features

### SongManagement Page
✅ **Tambah Lagu** dengan form lengkap
   - Title, Artist, Type (album/single/ep), Genre
   - Release Date, Release Year, Duration, Tracks
   - Image URL, Description
   - Status (confirmed/rumored/highly anticipated)
   - Featured Release checkbox

✅ **Edit Lagu** - Update semua field
✅ **Hapus Lagu** - Dengan konfirmasi
✅ **Table View** - Daftar lagu dengan search/filter
✅ **Error/Success Messages** - Feedback untuk user
✅ **Loading State** - Loading indicator

### LoadMoreReleasesPage
✅ **Fetch dari Backend** - Real-time data dari API
✅ **Browse Filters** - Tampilkan by type (albums/singles/eps)
✅ **Time Filters** - Today / This Week / This Month
✅ **Like Button** - User bisa like lagu (local state)
✅ **Share Button** - Share functionality
✅ **Admin Controls** - Hanya admin yang bisa edit/delete
   - Edit button (✏️) - Buka modal untuk edit
   - Delete button (🗑️) - Hapus dengan konfirmasi
✅ **Responsive Grid** - 1-4 columns tergantung screen size
✅ **Play Button Hover** - Button muncul saat hover

## Database Model

```javascript
// Song Model
{
  id: UUID,
  title: String (required),
  artist: String (required),
  genre: String,
  type: String (album | single | ep),
  releaseDate: String (human-readable, e.g., "April 19, 2024"),
  releaseYear: Integer,
  tracks: Integer,
  duration: String,
  image: Text (URL),
  description: Text,
  highlight: Boolean (default: false),
  status: String (confirmed | rumored | highlyAnticipated)
}
```

## Workflow

### Adding a Song
1. Admin pergi ke **Songs Management** page
2. Klik **+ Add Song** button
3. Fill form dengan details lagu
4. Klik **Add Song** button
5. Lagu muncul di table
6. **Otomatis muncul di LoadMoreReleasesPage** (refresh/real-time)

### Editing a Song
**Dari Admin Panel (SongManagement)**:
1. Cari lagu di table
2. Klik **Edit** button
3. Update fields di modal
4. Klik **Update Song**
5. Table ter-refresh

**Dari Publik Page (LoadMoreReleasesPage)**:
1. Jika admin (logged in dengan role=admin), tombol edit (✏️) muncul di corner lagu
2. Klik tombol **✏️**
3. Modal membuka dengan form edit
4. Update dan klik **Update Song**
5. Grid ter-refresh

### Deleting a Song
1. Klik **Delete** button (SongManagement atau ✏️ di LoadMoreReleasesPage)
2. Confirm dialog muncul
3. Klik **OK** untuk confirm
4. Lagu dihapus dan list ter-refresh

## Environment Variables

**Frontend `.env`**:
```
REACT_APP_API_URL=http://localhost:3000
```

atau gunakan proxy di `package.json`:
```json
{
  "proxy": "http://localhost:3000"
}
```

## Authentication

- **Admin Endpoints** butuh token: `Authorization: Bearer YOUR_TOKEN`
- Token disimpan di `localStorage.getItem("token")`
- User role disimpan di `localStorage.getItem("role")` untuk cek admin
- Jika `role === "admin"`, edit/delete buttons muncul di LoadMoreReleasesPage

## Testing Endpoints

### Tambah Lagu
```bash
curl -X POST http://localhost:3000/api/admin/songs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "type": "single",
    "genre": "Synthwave Pop",
    "releaseDate": "November 29, 2019",
    "releaseYear": 2019,
    "duration": "3:20",
    "image": "https://example.com/blinding-lights.jpg",
    "description": "A synthwave-pop track from The Weeknd",
    "highlight": false,
    "status": "confirmed"
  }'
```

### Lihat Semua Lagu
```bash
curl -X GET http://localhost:3000/api/songs
```

### Edit Lagu
```bash
curl -X PUT http://localhost:3000/api/admin/songs/:id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"title": "Updated Title"}'
```

### Hapus Lagu
```bash
curl -X DELETE http://localhost:3000/api/admin/songs/:id \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Troubleshooting

### Lagu tidak muncul di LoadMoreReleasesPage
- Pastikan `/api/songs` endpoint working
- Check browser console untuk error
- Verify `REACT_APP_API_URL` atau proxy setting

### Edit/Delete buttons tidak muncul untuk admin
- Verify token tersimpan di `localStorage.getItem("token")`
- Verify role tersimpan di `localStorage.getItem("role")` dengan value "admin"
- Check Authorization header di network requests

### CORS Error
- Verify backend CORS setting di `app.js`
- Pastikan origin allowed dalam CORS config

## Optional Enhancements

1. **Real-time Updates** - Implement WebSocket untuk auto-refresh
2. **Bulk Upload** - CSV/Excel import untuk multiple songs
3. **Image Optimization** - Compress/resize images saat upload
4. **Pagination** - Add pagination untuk large dataset
5. **Search** - Add search functionality di SongManagement
6. **Sorting** - Sort by date, popularity, etc.
7. **Caching** - Cache songs data untuk better performance

## Files Summary

| File | Purpose |
|------|---------|
| `SONG_MANAGEMENT_PAGE.jsx` | Admin dashboard untuk manage lagu |
| `LOAD_MORE_RELEASES_PAGE.jsx` | Publik page dengan edit/delete untuk admin |
| `/api/admin/songs` | Backend routes untuk CRUD |
| `/models/Song.js` | Database model |
| `/controllers/adminController.js` | Controller functions |
| `/routes/adminRoutes.js` | Route definitions |
