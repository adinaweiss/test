document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-content .close');
    const prevArrow = document.querySelector('.arrow.prev');
    const nextArrow = document.querySelector('.arrow.next');
    const images = Array.from(document.querySelectorAll('#gallery img')); // Convert NodeList to array
    let currentIndex = -1;

    // Show lightbox with the selected image
    function showLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightbox.classList.remove('hidden'); // Show the lightbox
        lightbox.classList.add('visible'); // For visibility styles
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('visible');
        lightbox.classList.add('hidden'); // Hide the lightbox
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop to last if at first
        showLightbox(currentIndex);
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length; // Loop to first if at last
        showLightbox(currentIndex);
    }

    // Event listeners for gallery images
    images.forEach((img, index) => {
        img.addEventListener('click', () => showLightbox(index));
    });

    // Event listeners for lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevArrow.addEventListener('click', prevImage);
    nextArrow.addEventListener('click', nextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('visible')) {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });
});