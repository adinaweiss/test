document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-content .close');
    const prevArrow = document.querySelector('.arrow.prev');
    const nextArrow = document.querySelector('.arrow.next');
    const images = Array.from(document.querySelectorAll('#gallery img'));
    let currentIndex = -1;

    function showLightbox(index) {
        currentIndex = index;
        const selectedImage = images[currentIndex];
        lightboxImg.src = selectedImage.src;
        lightboxCaption.textContent = selectedImage.nextElementSibling.textContent;
        lightbox.classList.add('visible');
    }

    function closeLightbox() {
        lightbox.classList.remove('visible');
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxContent();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const selectedImage = images[currentIndex];
        lightboxImg.src = selectedImage.src;
        lightboxCaption.textContent = selectedImage.nextElementSibling.textContent;
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => showLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevArrow.addEventListener('click', prevImage);
    nextArrow.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('visible')) {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });
});
