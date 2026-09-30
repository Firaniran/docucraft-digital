# DocuCraft Digital

Generator surat resmi dan CV berformat A4 yang jalan langsung di browser. Isi formulir di kiri, hasilnya langsung muncul di kertas sebelah kanan, lalu cetak ke PDF atau unduh sebagai file Word.

Tidak ada backend, tidak ada proses build, dan tidak ada akun. Semua data tetap di browser kamu.

**Demo:** https://USERNAME.github.io/docucraft-digital/

## Isinya

Ada dua mode, bisa diganti lewat tombol di bagian atas.

**Surat**
- Template siap pakai: surat izin/cuti, lamaran kerja, undangan rapat, surat tugas, surat keterangan aktif, dan surat pernyataan
- Kop surat dengan logo yang bisa diunggah
- Tanda tangan digital (gambar langsung di canvas) dan cap/stempel
- Pilihan font: Times New Roman, Merriweather, atau sans-serif

**CV**
- Tiga layout: sidebar dua kolom, satu kolom ramah ATS, dan header aksen penuh
- Bahasa Indonesia atau English
- Lima pilihan warna aksen, plus foto profil
- Contoh data untuk beberapa profesi (IT, software engineer, HR, fresh graduate, desainer) supaya bisa langsung lihat hasilnya

**Umum**
- Autosave otomatis ke `localStorage`, jadi draf tidak hilang kalau tab tertutup
- Draf bisa disimpan dan dikelola lewat menu Draf
- Cetak / simpan PDF, unduh `.doc`, atau salin teks dokumen
- CSS cetak khusus supaya hasil print rapi di A4

## Menjalankan

Buka `index.html` di browser. Selesai.

Kalau mau lewat server lokal:

```bash
npx serve .
# atau
python -m http.server 8000
```

## Struktur

```
├── index.html   # markup dan form
├── style.css    # tampilan + @media print
└── app.js       # logika form, preview, template, autosave, ekspor
```

Vanilla HTML/CSS/JS, tanpa framework dan tanpa dependensi. Satu-satunya yang diambil dari luar adalah font dari Google Fonts, jadi tanpa internet font akan jatuh ke font bawaan sistem.

## Deploy

Situs ini statis, jadi cukup aktifkan GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / root**.

## Catatan

- Kotak "QR" dan kode validasi (`VAL-XXXX-XXXX`) di surat hanya elemen visual yang dihasilkan dari nomor, tanggal, dan nama pengirim. Ini **bukan** QR code sungguhan dan tidak bisa di-scan, jadi jangan dianggap sebagai verifikasi keaslian dokumen.
- Draf tersimpan per browser dan per perangkat. Kalau data browser dibersihkan, draf ikut hilang.
- Unduhan `.doc` dibuat dari HTML, jadi tampilannya di Word bisa sedikit berbeda dari preview. Untuk hasil paling akurat, pakai cetak ke PDF.