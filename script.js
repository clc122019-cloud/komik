// =========================================
// KOMIK DIGITAL - SCRIPT UTAMA + AUDIO
// Versi Sinkronisasi Gambar & Audio
// =========================================


// =========================================
// DATA HALAMAN
// =========================================

const pages = [

    {
        title: "PENGANTAR",
        image: "assets/pengantar.png",
        audio: "assets/audio/pengantar.mp3",
        number: "PENGANTAR"
    },

    {
        title: "PERJUANGAN SUDAH SELESAI?",
        image: "assets/pages/page-01.png",
        audio: "assets/audio/page-01.mp3",
        number: "HALAMAN 1 / 12"
    },

    {
        title: "KEMERDEKAAN TIDAK DATANG BEGITU SAJA",
        image: "assets/pages/page-02.png",
        audio: "assets/audio/page-02.mp3",
        number: "HALAMAN 2 / 12"
    },

    {
        title: "PERJUANGAN DENGAN ILMU",
        image: "assets/pages/page-03.png",
        audio: "assets/audio/page-03.mp3",
        number: "HALAMAN 3 / 12"
    },

    {
        title: "KEKUATAN DALAM PERSATUAN",
        image: "assets/pages/page-04.png",
        audio: "assets/audio/page-04.mp3",
        number: "HALAMAN 4 / 12"
    },

    {
        title: "MENUJU KEMERDEKAAN",
        image: "assets/pages/page-05.png",
        audio: "assets/audio/page-05.mp3",
        number: "HALAMAN 5 / 12"
    },

    {
        title: "INDONESIA MERDEKA!",
        image: "assets/pages/page-06.png",
        audio: "assets/audio/page-06.mp3",
        number: "HALAMAN 6 / 12"
    },

    {
        title: "PERJUANGAN KITA",
        image: "assets/pages/page-07.png",
        audio: "assets/audio/page-07.mp3",
        number: "HALAMAN 7 / 12"
    },

    {
        title: "BELAJAR ADALAH PERJUANGAN",
        image: "assets/pages/page-08.png",
        audio: "assets/audio/page-08.mp3",
        number: "HALAMAN 8 / 12"
    },

    {
        title: "BERKARYA DAN BERINOVASI",
        image: "assets/pages/page-09.png",
        audio: "assets/audio/page-09.mp3",
        number: "HALAMAN 9 / 12"
    },

    {
        title: "BIJAK MENGGUNAKAN INFORMASI",
        image: "assets/pages/page-10.png",
        audio: "assets/audio/page-10.mp3",
        number: "HALAMAN 10 / 12"
    },

    {
        title: "JANGAN BIARKAN TEKNOLOGI MEMECAH KITA",
        image: "assets/pages/page-11.png",
        audio: "assets/audio/page-11.mp3",
        number: "HALAMAN 11 / 12"
    },

    {
        title: "GILIRAN KITA",
        image: "assets/pages/page-12.png",
        audio: "assets/audio/page-12.mp3",
        number: "HALAMAN 12 / 12"
    }

];


// =========================================
// VARIABEL
// =========================================

let currentPage = 0;

let currentAudio = null;

let audioMuted = false;


// =========================================
// CACHE GAMBAR
// =========================================

const imageCache = {};


// =========================================
// PRELOAD GAMBAR
// =========================================

function preloadImage(index) {

    if (
        index < 0 ||
        index >= pages.length
    ) {
        return;
    }

    if (imageCache[index]) {
        return imageCache[index];
    }

    const img = new Image();

    img.src = pages[index].image;

    imageCache[index] = img;

    return img;
}


// =========================================
// PRELOAD SEMUA GAMBAR
// =========================================

function preloadSemuaGambar() {

    pages.forEach(function (_, index) {

        preloadImage(index);

    });

}


// =========================================
// PRELOAD AUDIO
// =========================================

const audioCache = {};

function preloadAudio(index) {

    if (
        index < 0 ||
        index >= pages.length
    ) {
        return;
    }

    if (audioCache[index]) {
        return audioCache[index];
    }

    const audio =
        new Audio();

    audio.src =
        pages[index].audio;

    audio.preload =
        "auto";

    audio.load();

    audioCache[index] =
        audio;

    return audio;
}


// =========================================
// PRELOAD SEMUA AUDIO
// =========================================

function preloadSemuaAudio() {

    pages.forEach(function (_, index) {

        preloadAudio(index);

    });

}


// =========================================
// MULAI KOMIK
// =========================================

function mulaiKomik() {

    const cover =
        document.getElementById(
            "coverScreen"
        );

    const reader =
        document.getElementById(
            "readerScreen"
        );

    if (!cover || !reader) {

        console.error(
            "Cover atau Reader tidak ditemukan."
        );

        return;
    }

    cover.style.display =
        "none";

    reader.style.display =
        "flex";

    currentPage = 0;

    tampilkanHalaman();

}


// =========================================
// ALIAS
// =========================================

function bukaPengantar() {

    mulaiKomik();

}


// =========================================
// TAMPILKAN HALAMAN
// =========================================

function tampilkanHalaman() {

    const page =
        pages[currentPage];

    const comicPage =
        document.getElementById(
            "comicPage"
        );

    const pageTitle =
        document.getElementById(
            "pageTitle"
        );

    const pageNumber =
        document.getElementById(
            "pageNumber"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );

    const prevButton =
        document.getElementById(
            "prevButton"
        );

    const nextButton =
        document.getElementById(
            "nextButton"
        );


    if (!comicPage) {

        return;

    }


    // =====================================
    // HENTIKAN AUDIO SEBELUM GANTI GAMBAR
    // =====================================

    hentikanAudio();


    // =====================================
    // INFORMASI HALAMAN
    // =====================================

    if (pageTitle) {

        pageTitle.textContent =
            page.title;

    }


    if (pageNumber) {

        pageNumber.textContent =
            page.number;

    }


    if (progressText) {

        progressText.textContent =
            page.number;

    }


    if (prevButton) {

        prevButton.disabled =
            currentPage === 0;

    }


    if (nextButton) {

        nextButton.disabled =
            currentPage ===
            pages.length - 1;

    }


    // =====================================
    // KURSOR
    // =====================================

    if (currentPage === 0) {

        comicPage.style.cursor =
            "pointer";

    } else {

        comicPage.style.cursor =
            "default";

    }


    // =====================================
    // AMBIL GAMBAR DARI CACHE
    // =====================================

    const cachedImage =
        preloadImage(currentPage);


    // =====================================
    // JIKA GAMBAR SUDAH SELESAI
    // =====================================

    if (
        cachedImage.complete &&
        cachedImage.naturalWidth > 0
    ) {

        comicPage.src =
            cachedImage.src;

        setelahGambarSiap();

        return;

    }


    // =====================================
    // JIKA GAMBAR BELUM SELESAI
    // =====================================

    cachedImage.onload =
        function () {

            comicPage.src =
                cachedImage.src;

            setelahGambarSiap();

        };


    cachedImage.onerror =
        function () {

            console.error(
                "Gagal memuat gambar:",
                page.image
            );

            comicPage.src =
                page.image;

        };

}


// =========================================
// SETELAH GAMBAR SIAP
// =========================================

function setelahGambarSiap() {

    /*
       Beri sedikit waktu agar browser
       benar-benar menyelesaikan rendering
       gambar sebelum audio dimulai.
    */

    requestAnimationFrame(
        function () {

            requestAnimationFrame(
                function () {

                    putarAudioHalaman();

                }
            );

        }
    );


    // =====================================
    // SIAPKAN HALAMAN BERIKUTNYA
    // =====================================

    preloadImage(
        currentPage + 1
    );

    preloadImage(
        currentPage - 1
    );

    preloadAudio(
        currentPage + 1
    );

}


// =========================================
// PUTAR AUDIO
// =========================================

function putarAudioHalaman() {

    hentikanAudio();


    const page =
        pages[currentPage];


    if (!page.audio) {

        return;

    }


    // Gunakan audio cache

    const cachedAudio =
        preloadAudio(currentPage);


    if (!cachedAudio) {

        return;

    }


    currentAudio =
        cachedAudio;


    currentAudio.currentTime =
        0;

    currentAudio.volume =
        1;

    currentAudio.muted =
        audioMuted;


    currentAudio.onended =
        function () {

            updateAudioButton();

        };


    const playPromise =
        currentAudio.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function (error) {

                console.log(
                    "Autoplay diblokir browser:",
                    error
                );

                updateAudioButton();

            }
        );

    }


    updateAudioButton();

}


// =========================================
// HENTIKAN AUDIO
// =========================================

function hentikanAudio() {

    if (currentAudio) {

        currentAudio.pause();

        currentAudio.currentTime =
            0;

        currentAudio.onended =
            null;

        currentAudio =
            null;

    }

}


// =========================================
// PLAY / PAUSE
// =========================================

function toggleAudio() {

    if (!currentAudio) {

        putarAudioHalaman();

        return;

    }


    if (
        currentAudio.paused
    ) {

        currentAudio.play();

    } else {

        currentAudio.pause();

    }


    updateAudioButton();

}


// =========================================
// MUTE
// =========================================

function toggleMute() {

    audioMuted =
        !audioMuted;


    if (currentAudio) {

        currentAudio.muted =
            audioMuted;

    }


    updateAudioButton();

}


// =========================================
// UPDATE TOMBOL AUDIO
// =========================================

function updateAudioButton() {

    const audioButton =
        document.getElementById(
            "audioButton"
        );


    if (!audioButton) {

        return;

    }


    if (audioMuted) {

        audioButton.textContent =
            "🔇";

        audioButton.title =
            "Aktifkan Suara";

        return;

    }


    if (
        currentAudio &&
        !currentAudio.paused
    ) {

        audioButton.textContent =
            "⏸";

        audioButton.title =
            "Jeda Audio";

    } else {

        audioButton.textContent =
            "🔊";

        audioButton.title =
            "Putar Audio";

    }

}


// =========================================
// HALAMAN BERIKUTNYA
// =========================================

function halamanBerikutnya() {

    if (
        currentPage <
        pages.length - 1
    ) {

        currentPage++;

        tampilkanHalaman();

    }

}


// =========================================
// ALIAS
// =========================================

function berikutnya() {

    halamanBerikutnya();

}


// =========================================
// HALAMAN SEBELUMNYA
// =========================================

function halamanSebelumnya() {

    if (
        currentPage > 0
    ) {

        currentPage--;

        tampilkanHalaman();

    }

}


// =========================================
// ALIAS
// =========================================

function sebelumnya() {

    halamanSebelumnya();

}


// =========================================
// KEMBALI KE COVER
// =========================================

function kembaliKeCover() {

    hentikanAudio();


    const reader =
        document.getElementById(
            "readerScreen"
        );

    const cover =
        document.getElementById(
            "coverScreen"
        );


    if (reader) {

        reader.style.display =
            "none";

    }


    if (cover) {

        cover.style.display =
            "flex";

    }


    currentPage = 0;

}


// =========================================
// ALIAS
// =========================================

function kembaliCover() {

    kembaliKeCover();

}


// =========================================
// FULLSCREEN
// =========================================

function toggleFullscreen() {

    if (
        !document.fullscreenElement
    ) {

        document.documentElement
            .requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}


// =========================================
// ALIAS
// =========================================

function layarPenuh() {

    toggleFullscreen();

}


// =========================================
// KLIK LANJUT PENGANTAR
// =========================================

document.addEventListener(
    "click",
    function (event) {

        if (
            currentPage !== 0
        ) {

            return;

        }


        const comicPage =
            document.getElementById(
                "comicPage"
            );


        if (!comicPage) {

            return;

        }


        const rect =
            comicPage.getBoundingClientRect();


        if (

            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom

        ) {

            return;

        }


        const x =
            (event.clientX - rect.left)
            / rect.width;


        const y =
            (event.clientY - rect.top)
            / rect.height;


        if (

            x >= 0.65 &&
            x <= 0.95 &&
            y >= 0.70 &&
            y <= 0.90

        ) {

            event.preventDefault();

            event.stopPropagation();

            halamanBerikutnya();

        }

    },
    true
);


// =========================================
// KEYBOARD
// =========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowRight"
        ) {

            halamanBerikutnya();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            halamanSebelumnya();

        }

    }
);


// =========================================
// SAAT DOKUMEN SIAP
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Persiapkan semua gambar dan audio
           sejak awal agar perpindahan halaman
           lebih cepat.
        */

        preloadSemuaGambar();

        preloadSemuaAudio();

        tampilkanHalaman();

    }
);