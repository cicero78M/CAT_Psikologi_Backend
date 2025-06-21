# Dokumentasi

Dokumen ini menjelaskan proses bisnis aplikasi CAT Psikologi, konvensi penamaan, struktur database, contoh use case, dan pertanyaan yang sering ditanyakan (FAQ).

## 1. Proses Bisnis

Aplikasi CAT Psikologi menyediakan mekanisme ujian adaptif berbasis web. Proses utama meliputi:

1. **Registrasi Pengguna** – Calon peserta membuat akun melalui endpoint `POST /api/auth/register`.
2. **Login** – Pengguna mendapatkan token JWT menggunakan `POST /api/auth/login`.
3. **Pembuatan Bank Soal** – Admin atau instruktur membuat bank soal via `POST /api/question-banks` lalu menambahkan soal melalui `POST /api/questions`.
4. **Penjadwalan Ujian** – Instruktur menambahkan entri pada tabel `exam_schedule` untuk menentukan waktu dan durasi ujian.
5. **Pelaksanaan Ujian** – Peserta memulai sesi ujian (`exam_sessions`) dan menjawab soal yang ditampilkan secara adaptif berdasarkan estimasi kemampuan.
6. **Pengolahan Hasil** – Setelah selesai, nilai akhir dan estimasi kemampuan disimpan pada tabel `results`.
7. **Kelas dan Keanggotaan** – Instruktur dapat membuat kelas (`POST /api/classes`) dan peserta bergabung menggunakan kode undangan (`POST /api/classes/join`).

## 2. Konvensi Penamaan

- **Endpoint REST** menggunakan huruf kecil dan kata dipisah dengan tanda minus, contoh: `/api/question-banks`.
- **Nama tabel database** menggunakan huruf kecil dengan garis bawah, contoh: `question_bank_questions`.
- **Nama file** dalam kode mengikuti gaya camelCase untuk JavaScript (`questionBankRoutes.js`).
- **Variabel** pada JavaScript ditulis menggunakan camelCase, sedangkan **konstanta** seluruhnya huruf kapital dengan garis bawah.

## 3. Struktur Database

Struktur lengkap terdapat pada berkas [`schema.sql`](../schema.sql). Beberapa tabel utama antara lain:

- `users` – menyimpan informasi pengguna beserta profil.
- `question_banks` – kumpulan soal yang dapat digunakan dalam ujian.
- `questions` – tabel soal beserta parameter IRT (Item Response Theory).
- `exams` dan `exam_schedule` – mendefinisikan ujian dan jadwal pelaksanaannya.
- `exam_sessions` – sesi ujian individu yang merekam jawaban dan kemampuan terkini.
- `results` – menyimpan hasil akhir ujian untuk keperluan analisis.
- `classes` dan `class_members` – pengelolaan kelas dan anggota.

## 4. Use Case

Berikut skenario penggunaan sederhana:

1. **Instruktur membuat kelas dan ujian**
   - Membuat kelas: `POST /api/classes`
   - Membuat bank soal lalu menambahkan soal
   - Menjadwalkan ujian pada tabel `exam_schedule`

2. **Peserta mengikuti ujian**
   - Registrasi dan login untuk mendapatkan token
   - Bergabung ke kelas menggunakan kode undangan
   - Mengikuti ujian pada waktu yang ditentukan

3. **Instruktur melihat hasil**
   - Mengakses data `results` untuk menganalisis performa peserta

## 5. FAQ

**T: Bagaimana cara menjalankan proyek ini?**

Jalankan `npm install` kemudian `node src/index.js`. Pastikan variabel `DATABASE_URL` sudah diatur dan layanan PostgreSQL berjalan.

**T: Di mana skema database disimpan?**

Skema lengkap berada pada berkas [`schema.sql`](../schema.sql) di akar repositori.

**T: Apakah proyek ini sudah memiliki pengujian otomatis?**

Belum. Script `npm test` hanya menampilkan pesan bahwa pengujian belum disediakan.

