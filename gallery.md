---
layout: page
title: Gallery
permalink: /gallery/
---

<div class="gallery-wrap">
  <div class="gallery">
    {%- for img in site.data.gallery -%}
      {%- assign full = img.filename -%}
      <a class="gallery-item" href="{{ '/assets/gallery/' | append: full | relative_url }}" data-full="{{ '/assets/gallery/' | append: full | relative_url }}">
        <img src="{{ '/assets/gallery/' | append: full | relative_url }}" loading="lazy" decoding="async">
      </a>
    {%- endfor -%}
  </div>
</div>

<!-- Lightbox overlay (no aria, no caption) -->
<div id="gallery-overlay" class="gallery-overlay">
  <button id="gallery-close" class="gallery-close">✕</button>
  <div class="gallery-overlay-inner">
    <img id="gallery-overlay-img" src="">
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('gallery-overlay');
  const overlayImg = document.getElementById('gallery-overlay-img');
  const closeBtn = document.getElementById('gallery-close');

  function openOverlay(src) {
    overlayImg.src = src;
    overlay.classList.add('is-open');
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    overlayImg.src = '';
  }

  document.querySelector('.gallery').addEventListener('click', function (e) {
    const a = e.target.closest('.gallery-item');
    if (!a) return;
    e.preventDefault();
    openOverlay(a.dataset.full);
  });

  closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeOverlay();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
  });
});
</script>
