// Pastikan Anda sudah import useState dan useNavigate di atas
  // import { useState } from 'react';
  // import { useNavigate } from 'react-router-dom';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. AMBIL USER ID DARI LOCAL STORAGE
    // Asumsi: Saat login, Anda menyimpan data user seperti: 
    // localStorage.setItem('user', JSON.stringify(userData));
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      alert("Anda harus Login terlebih dahulu untuk memberikan rating!");
      // Opsional: Redirect ke halaman login
      // navigate('/login'); 
      return;
    }

    const userObj = JSON.parse(storedUser);
    const userId = userObj.id || userObj.userId; // Cek field id yang benar

    if (!userId) {
      alert("Terjadi kesalahan: User ID tidak ditemukan. Silakan login ulang.");
      return;
    }

    // 2. PERSIAPKAN DATA
    const payload = {
      userId: userId, // INI YANG SEBELUMNYA HILANG
      title: title,   // Pastikan state 'title' ada
      artist: artist, // Pastikan state 'artist' ada
      rating: parseInt(rating), // Pastikan rating berupa angka
      message: review // Pastikan state 'review' atau 'message' sesuai
    };

    console.log("Mengirim data:", payload); // Cek di Console Browser (F12)

    try {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Rating berhasil dikirim!");
        // Reset form jika perlu
        // setTitle("");
        // setArtist("");
        // setReview("");
        // setRating(0);
      } else {
        console.error("Gagal submit:", result);
        alert(`Gagal mengirim rating: ${result.error || "Server Error"}`);
      }
    } catch (error) {
      console.error("Error network:", error);
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };