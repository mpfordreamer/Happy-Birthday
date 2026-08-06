/* =========================================================
   SCRIPT.JS - LOGIKA WEBSITE ULANG TAHUN & AJAKAN KENCAN
   Made with ❤️ by Mahesta Ganteng
========================================================= */

// Daftar teks lelucon tombol "Tidak" dalam Bahasa Indonesia
const noButtonTaunts = [
    "Tidak 😜",
    "Yakin nih? 🤔",
    "Eits ga bisa! 😝",
    "Klik YA aja dong! 🥺",
    "Tombol rusak! 🤪",
    "Cuma boleh klik YA! ❤️",
    "Gak boleh nolak! 😽",
    "Hayoo mau kemana? 🏃‍♂️"
];

let tauntIndex = 0;
let yesScale = 1.0;

/**
 * Fungsi untuk memindahkan tombol "Tidak" secara acak di dalam layar
 * Mendukung Mouseover desktop maupun Touchstart di HP
 */
function moveButton(e) {
    if (e && e.cancelable) {
        e.preventDefault(); // Mencegah sentuhan HP memicu klik tombol
    }

    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");
    if (!noButton) return;

    // Batasi pergerakan tombol HANYA di sekitar area kartu putih (.main-card)
    const card = document.querySelector(".main-card") || document.body;
    const cardRect = card.getBoundingClientRect();
    const padding = 15;

    const minX = Math.max(10, cardRect.left + padding);
    const maxX = Math.max(minX, cardRect.right - noButton.offsetWidth - padding);
    const minY = Math.max(10, cardRect.top + padding);
    const maxY = Math.max(minY, cardRect.bottom - noButton.offsetHeight - padding);

    const randomX = minX + Math.floor(Math.random() * Math.max(10, maxX - minX));
    const randomY = minY + Math.floor(Math.random() * Math.max(10, maxY - minY));

    // Pindahkan tombol secara instan di dalam area putih
    noButton.style.position = "fixed";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.zIndex = "100";

    // Ubah teks lelucon (taunting)
    tauntIndex = (tauntIndex + 1) % noButtonTaunts.length;
    noButton.innerText = noButtonTaunts[tauntIndex];

    // Perbesar ukuran tombol "Ya" sedikit demi sedikit
    if (yesButton && yesScale < 1.8) {
        yesScale += 0.08;
        yesButton.style.transform = `scale(${yesScale})`;
    }
}

/**
 * Navigasi ke halaman perayaan saat tombol "Ya" diklik
 */
function nextPage() {
    window.location.href = "yes.html";
}

/* =========================================================
   FITUR KHUSUS HALAMAN PERAYAAN (YES.HTML)
========================================================= */

// Daftar karakter hati & balon cinta untuk hujan romantis
const heartSymbols = ["❤️", "💖", "💘", "💕", "💓", "🎈", "🌸", "✨"];

/**
 * Membuat animasi hujan balon hati yang halus (smooth)
 */
function createHeartShower() {
    let container = document.querySelector(".heart-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "heart-container";
        document.body.appendChild(container);
    }

    // Buat partikel baru secara berkala
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart-balloon";

        // Pilih simbol acak
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.innerText = symbol;

        // Atur posisi X acak
        const leftPos = Math.random() * 92; // dalam persen vw
        heart.style.left = `${leftPos}vw`;

        // Atur ukuran acak (1.2rem - 2.8rem)
        const size = (Math.random() * 1.6 + 1.2).toFixed(2);
        heart.style.fontSize = `${size}rem`;

        // Atur durasi jatuh acak agar terlihat natural (4s - 7.5s)
        const duration = (Math.random() * 3.5 + 4).toFixed(2);
        heart.style.animationDuration = `${duration}s`;

        container.appendChild(heart);

        // Hapus elemen setelah animasi selesai agar memori tetap ringan
        setTimeout(() => {
            if (heart && heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration * 1000 + 500);
    }, 280); // Setiap 280ms membuat satu hati baru
}

/**
 * Pemutar Musik Otomatis dengan lagu asli Nadhif Basalamah - Penjaga Hati
 * (Mulai pertama dari menit 3:09, selanjutnya berulang dari 0:00)
 */
function initAudio() {
    let isPlaying = false;
    let hasStartedOnce = false;
    const START_TIME = 165; // Menit 2:45 = 165 detik
    const audio = new Audio("music/Nadhif Basalamah - penjaga hati.mp3");

    // Pastikan pemutaran pertama dimulai dari menit 2:45 saat metadata lagu dimuat
    audio.addEventListener("loadedmetadata", () => {
        if (!hasStartedOnce) {
            audio.currentTime = START_TIME;
        }
    });

    // Saat lagu selesai, putar ulang dari awal (0:00)
    audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        audio.play();
    });

    // Buat tombol kontrol audio melayang
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "audio-toggle-btn";
    toggleBtn.innerHTML = "🔊 Putar Musik ❤️";
    document.body.appendChild(toggleBtn);

    // Fungsi memutar musik
    const playMusic = () => {
        if (!hasStartedOnce && audio.currentTime < START_TIME) {
            audio.currentTime = START_TIME;
        }
        audio.play().then(() => {
            hasStartedOnce = true;
            isPlaying = true;
            toggleBtn.innerHTML = "🔊 Musik Aktif ❤️";
        }).catch(() => {
            // Jika file music/song.mp3 belum ada, gunakan melodi romantis cadangan
            playFallbackMelody();
            isPlaying = true;
            toggleBtn.innerHTML = "🔊 Musik Aktif ❤️";
        });
    };

    const pauseMusic = () => {
        if (!audio.paused) {
            audio.pause();
        }
        isPlaying = false;
        toggleBtn.innerHTML = "🔇 Putar Musik ❤️";
    };

    toggleBtn.addEventListener("click", () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // Coba putar otomatis saat halaman dimuat (Auto Putar)
    setTimeout(() => {
        playMusic();
    }, 600);

    // Jika browser memblokir autoplay, mulai musik pada interaksi pertama pengguna di layar
    const unlockAudio = () => {
        if (!isPlaying) {
            playMusic();
        }
        document.removeEventListener("click", unlockAudio);
        document.removeEventListener("touchstart", unlockAudio);
    };
    document.addEventListener("click", unlockAudio);
    document.addEventListener("touchstart", unlockAudio);
}

/**
 * Melodi Romantis Cadangan (Web Audio API)
 * Digunakan otomatis jika file music/song.mp3 belum ditambahkan
 */
function playFallbackMelody() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        // Urutan nada romantis (skala mayor/pentatonis lembut)
        const notes = [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63, 293.66, 329.63, 392.00, 523.25, 587.33];
        let i = 0;

        const playNextNote = () => {
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(notes[i], ctx.currentTime);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 1.2);

            i = (i + 1) % notes.length;
        };

        playNextNote();
        setInterval(playNextNote, 900);
    } catch (err) {
        console.log("Audio fallback error:", err);
    }
}

// Inisialisasi otomatis jika berada di halaman yes.html
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("yes.html") || document.title.includes("Yeeyyy")) {
        createHeartShower();
        initAudio();
    }
});
