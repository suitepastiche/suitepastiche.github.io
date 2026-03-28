document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('gallery-overlay');
  const overlayImg = document.getElementById('gallery-overlay-img');
  const closeBtn = document.getElementById('gallery-close');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = -1;
  const fullCache = {};

  items.forEach(function (item) {
    const img = item.querySelector('img');
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function () { img.classList.add('loaded'); });
    }
  });

  function preload(index) {
    if (index < 0 || index >= items.length || fullCache[index]) return;
    // Preload thumbnail in case it was lazy-loaded off-screen
    new Image().src = items[index].querySelector('img').src;
    // Preload full image and cache the reference
    const img = new Image();
    fullCache[index] = img;
    img.src = items[index].dataset.full;
  }

  function openOverlay(index) {
    currentIndex = index;
    const item = items[index];
    const thumbSrc = item.querySelector('img').src;
    const fullSrc = item.dataset.full;

    preload(index);
    const fullImg = fullCache[index];

    if (fullImg.complete) {
      // Full image already cached from adjacent preloading — show directly
      overlayImg.src = fullSrc;
    } else {
      overlayImg.src = thumbSrc;
      if (thumbSrc !== fullSrc) {
        fullImg.onload = function () {
          if (currentIndex === index) overlayImg.src = fullSrc;
        };
        // Guard against race where image finished between .complete check and setting onload
        if (fullImg.complete && currentIndex === index) overlayImg.src = fullSrc;
      }
    }

    overlay.classList.add('is-open');
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = index === items.length - 1 ? 'hidden' : 'visible';

    // Preload adjacent images for flash-free navigation
    preload(index - 1);
    preload(index + 1);
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    overlayImg.src = '';
    currentIndex = -1;
  }

  document.querySelector('.gallery').addEventListener('click', function (e) {
    const a = e.target.closest('.gallery-item');
    if (!a) return;
    e.preventDefault();
    openOverlay(items.indexOf(a));
  });

  closeBtn.addEventListener('click', closeOverlay);
  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) openOverlay(currentIndex - 1);
  });
  nextBtn.addEventListener('click', function () {
    if (currentIndex < items.length - 1) openOverlay(currentIndex + 1);
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeOverlay();
  });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeOverlay();
    if (e.key === 'ArrowLeft' && currentIndex > 0) openOverlay(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < items.length - 1) openOverlay(currentIndex + 1);
  });
});
