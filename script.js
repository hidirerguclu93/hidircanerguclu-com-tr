// Galeri öğeleri ve modal elemanlarını seçiyoruz
const galleryItems = document.querySelectorAll('.gallery-item img');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content img');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.modal-close');

let currentIndex = -1; // Şu anki resmin indeksini tutar
let startTouchX = 0; // Başlangıç dokunma X koordinatı
let endTouchX = 0; // Bitiş dokunma X koordinatı

// Modalı açma işlevi
function openModal(index) {
    currentIndex = index; // Tıklanan resmin indeksini kaydet
    const imgSrc = galleryItems[currentIndex].src;
    const imgAlt = galleryItems[currentIndex].alt;

    modalContent.src = imgSrc;
    modalCaption.textContent = imgAlt;
    modal.style.display = 'flex'; // Modalı görünür yap
}

// Modalı kapatma işlevi
function closeModalFunction() {
    modal.style.display = 'none';
    currentIndex = -1; // Şu anki resmi sıfırla
}

// Modalda yön tuşlarını işlemek
function handleKeydown(event) {
    if (event.key === 'ArrowRight') {
        // Sağ ok tuşu
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openModal(currentIndex);
    } else if (event.key === 'ArrowLeft') {
        // Sol ok tuşu
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentIndex);
    } else if (event.key === 'Escape') {
        // Esc tuşu ile kapatma
        closeModalFunction();
    }
}

// Resme tıklayınca modal açma
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
});

// Modalı kapatma işlevi (X'e tıklama)
closeModal.addEventListener('click', closeModalFunction);

// Tüm belgeye klavye dinleyicisi ekleme
document.addEventListener('keydown', handleKeydown);

// Dokunmatik ekran için kaydırma desteği ekliyoruz
modal.addEventListener('touchstart', (e) => {
    startTouchX = e.touches[0].clientX; // Başlangıç koordinatını kaydet
});

modal.addEventListener('touchmove', (e) => {
    endTouchX = e.touches[0].clientX; // Bitiş koordinatını al
});

modal.addEventListener('touchend', (e) => {
    if (Math.abs(startTouchX - endTouchX) < 10) {
        // Eğer yatay kaydırma yoksa, dokunmayı kapama işlevi olarak değerlendir
        closeModalFunction();
    } else if (startTouchX - endTouchX > 50) {
        // Sağdan sola kaydırma: Sonraki resme geç
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openModal(currentIndex);
    } else if (endTouchX - startTouchX > 50) {
        // Soldan sağa kaydırma: Önceki resme geç
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentIndex);
    }
});

// Modal alanına tıklayarak kapama
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunction();
    }
});
