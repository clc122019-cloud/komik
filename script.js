// =========================================
// KOMIK DIGITAL - SCRIPT UTAMA + AUDIO
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
// VARIABEL UTAMA
// =========================================

let currentPage = 0;

let currentAudio = null;

let audioMuted = false;


// =========================================
// MULAI KOMIK
// =========================================

function mulaiKomik() {

    const cover =
        document.getElementById("coverScreen");

    const reader =
        document.getElementById("readerScreen");

    if (!cover || !reader) {

        console.error(
            "Cover atau Reader tidak ditemukan."
        );

        return;
    }

    cover.style.display = "none";

    reader.style.display = "flex";

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
        document.getElementById("comicPage");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageNumber =
        document.getElementById("pageNumber");

    const progressText =
        document.getElementById("progressText");

    const prevButton =
        document.getElementById("prevButton");

    const nextButton =
        document.getElementById("nextButton");


    if (!comicPage) {

        console.error(
            "comicPage tidak ditemukan."
        );

        return;
    }


    // =====================================
    // GAMBAR
    // =====================================

    comicPage.src =
        page.image;

    comicPage.alt =
        page.title;


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


    // =====================================
    // TOMBOL NAVIGASI
    // =====================================

    if (prevButton) {

        prevButton.disabled =
            currentPage === 0;

    }


    if (nextButton) {

        nextButton.disabled =
            currentPage === pages.length - 1;

    }


    // =====================================
    // KURSOR PENGANTAR
    // =====================================

    if (currentPage === 0) {

        comicPage.style.cursor =
            "pointer";

    } else {

        comicPage.style.cursor =
            "default";

    }


    // =====================================
    // AUDIO
    // =====================================

    putarAudioHalaman();

}


// =========================================
// PUTAR AUDIO HALAMAN
// =========================================

function putarAudioHalaman() {

    // Hentikan audio sebelumnya

    hentikanAudio();


    const page =
        pages[currentPage];


    if (!page.audio) {

        return;

    }


    currentAudio =
        new Audio(page.audio);


    currentAudio.preload =
        "auto";

    currentAudio.volume =
        1;


    currentAudio.muted =
        audioMuted;


    // =====================================
    // SAAT AUDIO SELESAI
    // =====================================

    currentAudio.addEventListener(
        "ended",
        function () {

            updateAudioButton();

        }
    );


    // =====================================
    // PLAY
    // =====================================

    const hasil =
        currentAudio.play();


    if (hasil !== undefined) {

        hasil.catch(
            function (error) {

                /*
                 Browser dapat memblokir
                 autoplay audio.

                 Audio akan tetap tersedia
                 melalui tombol audio.
                */

                console.log(
                    "Autoplay audio diblokir browser:",
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

        currentAudio.src = "";

        currentAudio = null;

    }

}


// =========================================
// PLAY / PAUSE AUDIO
// =========================================

function toggleAudio() {

    if (!currentAudio) {

        putarAudioHalaman();

        return;

    }


    if (currentAudio.paused) {

        currentAudio.play();

    } else {

        currentAudio.pause();

    }


    updateAudioButton();

}


// =========================================
// MUTE / UNMUTE
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
//
// Tombol LANJUT berada di dalam gambar
// pengantar.png.
//
// Area klik dibaca berdasarkan posisi
// relatif terhadap gambar.
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


        // Pastikan klik ada di gambar

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


        // Area LANJUT

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

        tampilkanHalaman();

    }
);