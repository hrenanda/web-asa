# Website PT Pas Asa Sejahtera

Website statis (HTML + CSS + JS murni, tanpa framework) dengan konten sama seperti referensi
`kadin/asa_sejahtera.html`, tetapi dengan desain baru: **"Jalur Dagang" (Trade Lane)** —
kertas chart hijau-kabut, tinta petrol tua, aksen oranye sinyal, tipografi Bricolage Grotesque /
Archivo / IBM Plex Mono, dan garis rute bertitik sebagai elemen khas di seluruh halaman.

## Menjalankan

Buka `index.html` langsung di browser, atau jalankan server lokal:

```
py -m http.server 8123
```

lalu akses http://localhost:8123/

## Struktur

```
index.html      — markup seluruh halaman (hero slider, statistik, tentang, layanan,
                  komoditas, berita, CTA, kontak, footer)
css/style.css   — sistem desain lengkap (token warna, tipografi, komponen, responsif,
                  prefers-reduced-motion)
js/main.js      — slider hero, header saat scroll, menu mobile, reveal on scroll,
                  ticker komoditas, penanganan form kontak
assets/         — foto & ilustrasi
```

## Aset gambar

Foto dihasilkan dengan ChatGPT (hasil dari sesi browser, dikonversi ke JPEG q82):

| File | Sumber |
|---|---|
| `hero-port.jpg` | ChatGPT — pelabuhan kontainer saat senja |
| `hero-warehouse.jpg` | ChatGPT — gudang kopi/kakao |
| `hero-farmers.jpg` | ChatGPT — petani kelapa & rempah |
| `about-team.jpg` | crop dari `hero-warehouse.jpg` (framing berbeda) |
| `com-agri.jpg` | crop dari `hero-farmers.jpg` (framing berbeda) |
| `com-marine.svg`, `com-food.svg`, `com-industry.svg` | ilustrasi vektor buatan (jatah gambar harian ChatGPT habis) |

### Mengganti 3 ilustrasi dengan foto

Simpan foto sebagai `assets/com-marine.jpg`, `assets/com-food.jpg`, dan
`assets/com-industry.jpg` (rasio 4:3, disarankan ≥ 1200px lebar). Tidak perlu mengubah kode —
tag `<img>` sudah memakai fallback otomatis: jika JPG ada, foto dipakai; jika tidak ada,
ilustrasi SVG yang tampil. Setelah menambahkan JPG, muat ulang halaman.

Jatah gambar gratis ChatGPT direset setiap hari pukul 20.21 (atau dengan paket Go hingga 28 gambar/hari).
