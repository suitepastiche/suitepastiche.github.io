document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('gallery-overlay');
  const overlayImg = document.getElementById('gallery-overlay-img');
  const closeBtn = document.getElementById('gallery-close');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = -1;

  function openOverlay(index) {
    currentIndex = index;
    overlayImg.src = items[index].href;
    overlay.classList.add('is-open');
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = index === items.length - 1 ? 'hidden' : 'visible';
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    overlayImg.src = '';
    currentIndex = -1;
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      openOverlay(index);
    });
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
