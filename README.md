# CAT Psikologi Backend

Contoh sederhana backend Express yang menerapkan Redis, RabbitMQ dan JWT token.

## Cara Menjalankan

1. Install dependensi:
   ```bash
   npm install
   ```
2. Salin file `.env.example` menjadi `.env` dan sesuaikan nilai variabelnya.
3. Jalankan server:
   ```bash
   npm start
   ```

Server akan berjalan pada port yang ditentukan di file `.env` (default 3000).

## Endpoints

- `POST /login` - mengirim JSON `{"username": "nama"}` dan menerima JWT token.
- `GET /cache` - contoh penggunaan Redis.
- `POST /publish` - mengirim pesan ke RabbitMQ, membutuhkan header `Authorization: Bearer <token>`.
