
// Import fungsi addClass dan removeClass dari modul utils-class
import { addClass, removeClass } from "./utils-class";

// Mendapatkan elemen HTML dengan ID "carousel"
const carouselId = document?.getElementById("carousel");

// Mendapatkan elemen dengan kelas "flex" sebagai anak dari elemen dengan ID "carousel"
const carouselItems = carouselId?.getElementsByClassName("flex")[0];

// Mendapatkan elemen dengan kelas "container" sebagai anak dari elemen dengan ID "carousel"
const carouselContainer = carouselId?.getElementsByClassName("container")[0];

// Variabel global untuk menyimpan state pergerakan dan tampilan carousel
let posX1 = 0,
  posX2 = 0,
  posInitial,
  posFinal,
  threshold = 100,
  itemToShow = 4,
  slides = carouselItems.getElementsByClassName("card"),
  slidesLength = slides.length, // Jumlah elemen dalam carousel
  slideSize = carouselItems.getElementsByClassName("card")[0].offsetWidth,
  index = 0,
  allowShift = true;

// Fungsi untuk menghitung dan mengatur offset carousel berdasarkan posisi container
function carouselCalculateOffset() {
  const carouselOffset = carouselContainer.getBoundingClientRect().left;
  carouselItems.style.paddingLeft = `${carouselOffset - 16}px`;
  carouselItems.style.paddingRight = `${carouselOffset - 16}px`;
}

// Fungsi utama untuk mengatur interaksi pengguna dan pergerakan carousel
function slide(wrapper, items) {
  // Menambahkan kelas "loaded" ke wrapper carousel
  wrapper.classList.add("loaded");

  // Menambahkan event listener untuk berbagai peristiwa
  items.addEventListener("mousedown", dragStart);
  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);
  items.addEventListener("transitionend", checkIndex);

  // Fungsi untuk menangani awal peristiwa drag/touch
  function dragStart(e) {
    e = e || window.Event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    // Menangani peristiwa touchstart
    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      // Menangani peristiwa mousedown
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  // Fungsi untuk menangani pergerakan elemen selama drag/touch
  function dragAction(e) {
    e = e || window.Event;

    // Menangani peristiwa touchmove
    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      // Menangani peristiwa mousemove
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    // Menggeser elemen carousel berdasarkan pergerakan pengguna
    items.style.left = `${items.offsetLeft - posX2}px`;
  }

  // Fungsi untuk menangani akhir peristiwa drag/touch
  function dragEnd() {
    posFinal = items.offsetLeft;

    // Menentukan arah pergerakan dan memanggil fungsi untuk menggeser carousel
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      // Jika pergerakan tidak mencapai ambang batas, kembalikan posisi awal
      items.style.left = `${posInitial}px`;
    }

    // Menghapus event listener mouseup dan mousemove
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // Fungsi untuk menggeser carousel ke kiri atau kanan
  function shiftSlide(direction, action) {
    // Menambahkan kelas untuk animasi transisi
    addClass(items, "transition-all duration-200");

    if (allowShift) {
      // Jika bukan peristiwa drag, tetapkan posisi awal
      if (!action) posInitial = items.offsetLeft;

      // Menggeser elemen carousel berdasarkan arah pergerakan
      items.style.left = `${posInitial - direction * slideSize}px`;

      // Menyesuaikan indeks carousel
      index += direction;
    }

    // Menonaktifkan pergerakan sementara
    allowShift = false;
  }

  // Fungsi untuk memeriksa indeks dan menyesuaikan posisi carousel setelah transisi selesai
  function checkIndex() {
    // Menunda penghapusan kelas animasi untuk menghindari gangguan transisi
    setTimeout(() => {
      removeClass(items, "transition-all duration-200");
    }, 200);

    // Menyesuaikan posisi dan indeks jika mencapai batas kiri atau kanan carousel
    if (index === -1) {
      items.style.left = `-${slidesLength * slideSize}px`;
      index = slidesLength - 1;
    }

    if (index === slidesLength - itemToShow) {
      items.style.left = `-${(slidesLength - itemToShow - 1) * slideSize}px`;
      index = slidesLength - itemToShow - 1;
    }

    // Jika mencapai batas akhir kanan atau kiri, reset posisi carousel
    if (index === slidesLength || index === slidesLength - 1) {
      items.style.left = "0px";
      index = 0;
    }

    // Mengaktifkan kembali pergerakan carousel
    allowShift = true;
  }
}

// Memastikan elemen dengan ID "carousel" ditemukan sebelum memanggil fungsi slide
if (carouselId) {
  // Memanggil fungsi slide dengan elemen-elemen yang diperlukan
  slide(carouselId, carouselItems);

  // Menambahkan event listener untuk mengatur offset saat halaman dimuat
  window.addEventListener("load", carouselCalculateOffset);

  // Menambahkan event listener untuk mengatur offset saat ukuran jendela diubah
  window.addEventListener("resize", carouselCalculateOffset);
}