# 🌐 My-Finance Angular Frontend (Premium Financial Dashboard)

Antarmuka pengguna (*Frontend*) untuk aplikasi **My-Finance**, berupa platform pengelolaan keuangan pribadi modern berbasis **Angular 18+**, **PrimeNG Component Suite**, **Tailwind CSS**, dan **Chart.js**.

> [!IMPORTANT]
> **Dokumen Spesifikasi Utama:**
> Untuk memahami detail alur antarmuka, strategi 3-dompet, dan skema analitik visual yang akan dikembangkan:
> 👉 **[Baca Spesifikasi Lengkap My-Finance](file:///d:/%21%60Learn-Programmer%60/My-Finance/Angular-Frontend/my_finance_specification.md)**

---

## 💎 Fitur Utama Antarmuka (UI Features)

1.  **Modul Rekening 3-Kategori (3-Bucket Strategy UI):**
    Visualisasi kartu rekening interaktif yang dikelompokkan berdasarkan fungsinya:
    *   *Vault Account* (Seabank/Superbank): Untuk tabungan dana dingin.
    *   *Daily Pocket* (BCA/Mandiri): Untuk kebutuhan operasional harian.
    *   *Subscription Pocket* (Bank Jago): Khusus untuk tagihan rutin auto-debit.
2.  **Form Input Transaksi Pintar 3-Tab:**
    Formulir dinamis menggunakan komponen `PrimeNG` dengan tab terpisah untuk meminimalkan kesalahan input:
    *   **Tab INCOME:** Dropdown Kategori Sumber, Kategori Jenis, Tipe Rekening, dan Akun Rekening Tujuan.
    *   **Tab EXPENSE:** Dropdown Kategori Sumber, Tipe Rekening, dan Akun Rekening Asal (tanpa Kategori Jenis).
    *   **Tab MUTASI:** Transfer antar-rekening internal (mengurangi Rekening Asal, menambah Rekening Tujuan).
3.  **Dedicated Savings Progress Tracker:**
    Komponen indikator kemajuan (*Progress Bar*) visual untuk memantau target nominal tabungan berdasarkan akumulasi saldo pada rekening Vault.
4.  **Analitik Tingkat Lanjut (Drill-Down Analytics):**
    Grafik interaktif bertenaga **Chart.js** dengan 3 level analisis:
    *   *Level 1 (Global Macro View):* Total Wealth & Monthly Cashflow (Pemasukan vs Pengeluaran).
    *   *Level 2 (Group View):* Distribusi alur dana kelompok BANK vs E-WALLET.
    *   *Level 3 (Deep Dive):* Breakdown rinci pengeluaran dan histori khusus pada 1 akun rekening tertentu.

---

## 🛠️ Spesifikasi Teknologi (Tech Stack)

*   **Framework:** Angular 18+
*   **UI Components:** PrimeNG v18+ UI Suite (mendukung tema gelap/terang premium)
*   **Styling Engine:** Tailwind CSS & Vanilla CSS
*   **Data Visualization:** Chart.js & PrimeNG Charts
*   **State & Stream:** RxJS (Reactive Extensions for JavaScript)
*   **Package Manager:** npm

---

## 🚀 Panduan Menjalankan Aplikasi di Lokal

### 1. Prasyarat (Prerequisites)
Pastikan komputer Anda sudah terinstal **Node.js** (versi 18 ke atas) dan **Angular CLI**.

### 2. Instalasi Dependensi
Buka terminal Anda di folder `Angular-Frontend/` ini, lalu ketik perintah:
```bash
npm install
```

### 3. Menjalankan Development Server
Jalankan server lokal frontend dengan perintah:
```bash
npm run start
```
Atau:
```bash
ng serve
```

Setelah server aktif, buka browser Anda dan akses:
👉 **`http://localhost:4200/`**

Aplikasi akan memuat ulang secara otomatis (*live-reload*) setiap kali Anda menyimpan perubahan kode di sisi frontend!
