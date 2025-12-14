# P10: Simulasi API Key & OAuth 2.0 (JWT) 🚀

![NodeJS](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/Course-Web%20Service%20Engineering-orange)

Repository ini berisi implementasi tugas **Praktikum #10 - Web Service Engineering**. Proyek ini mensimulasikan arsitektur keamanan API berlapis menggunakan **API Key** untuk akses publik dan **OAuth 2.0 (JWT)** untuk akses privat dengan otorisasi berbasis peran (*Role-Based Access Control*).

---

## 👤 Informasi Mahasiswa

* **Nama:** Aisyah Safitri
* **NIM:** 230104040117
* **Mata Kuliah:** Web Service Engineering
* **Kampus:** UIN Antasari Banjarmasin

---

## 🌟 Fitur Utama

Proyek ini memiliki dua lapisan keamanan utama:

### 1. 🔓 Akses Publik (API Key Protected)

* Menggunakan middleware untuk memvalidasi `x-api-key` pada header.
* Hanya klien dengan API Key yang terdaftar di database yang dapat mengakses data.
* **Endpoint:** `GET /api/v1/products/public`

### 2. 🔐 Akses Privat (OAuth 2.0 / JWT Protected)

* Menggunakan **Bearer Token (JSON Web Token)**.
* **Otentikasi:** Login untuk mendapatkan Access Token.
* **Otorisasi (RBAC):**

  * **Admin:** Akses penuh CRUD.
  * **User:** Akses terbatas (Read-only).
* **Endpoint:** `/api/v1/products/private/*`

---

## 🛠️ Teknologi yang Digunakan

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **ODM:** Mongoose
* **Keamanan:**

  * `jsonwebtoken` (JWT)
  * `bcryptjs`
  * `dotenv`

---

## 📂 Struktur Proyek

```
p10-oauth2-api-key-230104040117/
├── controllers/      # Logika bisnis (Auth & Product)
├── middleware/       # Validasi API Key & Token JWT
├── models/           # Skema Database (User, Product, ApiKey)
├── routes/           # Definisi Endpoint API
├── seeders/          # Script pengisi data awal
├── utils/            # Fungsi bantuan (Generate Token)
├── .env              # Environment variable (tidak di-upload)
└── server.js         # Entry point aplikasi
```

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository

```
git clone https://github.com/USERNAME_GITHUB_KAMU/NAMA_REPO_KAMU.git
cd p10-oauth2-api-key-230104040117
```

### 2. Install Dependencies

```
npm install
```

### 3. Konfigurasi Environment Variable

Buat file `.env` di root folder, lalu isi:

```
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/p10_simulator_db?retryWrites=true&w=majority
JWT_SECRET=rahasia-super-aman-simulasi-jwt
```

> Catatan: Sesuaikan `MONGODB_URI` dengan kredensial MongoDB Atlas Anda.

### 4. Setup Database (Seeding)

```
node seeders/seed.js
```

### 5. Jalankan Server

```
node server.js
```

Server akan berjalan di `http://localhost:3000`

---

## 📡 Dokumentasi API

### 🔑 Akses Publik (Butuh API Key)

| Method | Endpoint                | Header    | Deskripsi                   |
| ------ | ----------------------- | --------- | --------------------------- |
| GET    | /api/v1/products/public | x-api-key | Mengambil semua data produk |

Contoh API Key:

```
PRACTICUM_API_KEY_A_1234567890
```

---

### 🛡️ Otentikasi (Login)

| Method | Endpoint           | Body (JSON)                                           | Deskripsi   |
| ------ | ------------------ | ----------------------------------------------------- | ----------- |
| POST   | /api/v1/auth/token | `{ "username": "admin", "password": "password123" }`  | Login Admin |
| POST   | /api/v1/auth/token | `{ "username": "userbiasa", "password": "userpass" }` | Login User  |

---

### 🔒 Akses Privat (JWT & Role Admin)

Tambahkan header:

```
Authorization: Bearer <token>
```

| Method | Endpoint                     | Deskripsi         |
| ------ | ---------------------------- | ----------------- |
| POST   | /api/v1/products/private     | Menambah produk   |
| PUT    | /api/v1/products/private/:id | Mengupdate produk |
| DELETE | /api/v1/products/private/:id | Menghapus produk  |

---

## 🧪 Kredensial Pengujian (Dummy Data)

### API Key

* `PRACTICUM_API_KEY_A_1234567890`

### Users

**Admin**

* Username: `admin`
* Password: `password123`

**User Biasa**

* Username: `userbiasa`
* Password: `userpass`

---

Create with ❤️ by **Aisyah Safitri**
