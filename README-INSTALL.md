# Febro Arcade v1.2 — Neon Snake & Orbit Run

4 game yang bisa dimainkan:
- https://play.febro.id/ — Dashboard
- https://play.febro.id/skyhop/ — SKYHOP
- https://play.febro.id/GhaffiLand/ — GhaffiLand
- https://play.febro.id/snake/ — Neon Snake
- https://play.febro.id/orbit-run/ — Orbit Run

## Patch yang aman untuk VPS yang sudah berjalan

File `febro-arcade-update-snake-orbit.zip` hanya berisi:

```
index.html
assets/app.js
assets/style.css
assets/minigame.css
snake/index.html
snake/game.js
orbit-run/index.html
orbit-run/game.js
```

Tidak mengubah `skyhop/`, `GhaffiLand/`, Nginx, SSL, dan aplikasi lain. Semua halaman game statis tanpa backend, DB, npm, PM2, atau Docker.

1. Upload ZIP via WinSCP ke `/opt/play/febro-arcade-update-snake-orbit.zip`.
2. SSH dan jalankan:

```bash
cd /opt/play
sudo apt-get install -y unzip
cp -a index.html "index.html.bak-$(date +%Y%m%d-%H%M%S)"
cp -a assets/app.js "assets/app.js.bak-$(date +%Y%m%d-%H%M%S)"
cp -a assets/style.css "assets/style.css.bak-$(date +%Y%m%d-%H%M%S)"
unzip -o febro-arcade-update-snake-orbit.zip
rm -f febro-arcade-update-snake-orbit.zip
sudo find /opt/play/snake /opt/play/orbit-run -type d -exec chmod 755 {} \;
sudo find /opt/play/snake /opt/play/orbit-run -type f -exec chmod 644 {} \;
sudo nginx -t && sudo systemctl reload nginx
```

3. Tes:

```bash
curl -I https://play.febro.id/
curl -I https://play.febro.id/snake/
curl -I https://play.febro.id/orbit-run/
```

Untuk konfigurasi Nginx yang memakai `root /opt/play;` dan `try_files $uri $uri/ =404;`, rute baru otomatis bisa diakses tanpa mengubah file konfigurasi.

Browser menyimpan skor terbaik Neon Snake dan jarak terjauh Orbit Run di LocalStorage perangkat yang sama. Kontrol: tombol sentuh/swipe untuk HP, keyboard arrow/AWSD untuk desktop; Space/P untuk pause. Suara default OFF, bisa diaktifkan.

## Full package

`febro-arcade-full-v1.2.zip` berisi semua file versi dasar + dua game baru, termasuk SKYHOP, GhaffiLand dan sampel Nginx. Gunakan hanya bila perlu pasang dari awal. Jangan overwrite konfigurasi Nginx live dengan sampel.
