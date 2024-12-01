document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-content .close');
    const prevArrow = document.querySelector('.arrow.prev');
    const nextArrow = document.querySelector('.arrow.next');
    const images = Array.from(document.querySelectorAll('#gallery img'));
    const captions = Array.from(document.querySelectorAll('.gallery-caption'));
    let currentIndex = -1;

    // Create and append a caption element for the lightbox
    const lightboxCaption = document.createElement('div');
    lightboxCaption.id = 'lightbox-caption';
    lightboxCaption.style.color = 'white';
    lightboxCaption.style.marginTop = '10px';
    lightboxCaption.style.fontSize = '16px';
    lightbox.appendChild(lightboxCaption);

    function showLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = captions[currentIndex].textContent || '';
        lightbox.classList.add('visible');
    }

    function closeLightbox() {
        lightbox.classList.remove('visible');
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = captions[currentIndex].textContent || '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = captions[currentIndex].textContent || '';
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
