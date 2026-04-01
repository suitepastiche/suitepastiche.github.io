---
layout: page
title: Gallery
permalink: /gallery/
gallery: true
description: See photos of past parties
---

<div class="gallery">
  {%- for img in site.data.gallery -%}
    {%- assign full = img.filename -%}
    <a class="gallery-item" href="{{ '/assets/gallery/' | append: full | relative_url }}">
      <img src="{{ '/assets/gallery/' | append: full | relative_url }}" alt="">
    </a>
  {%- endfor -%}
</div>

<div id="gallery-overlay" class="gallery-overlay">
  <button id="gallery-close" class="gallery-close" aria-label="Close">✕</button>
  <button id="gallery-prev" class="gallery-nav" aria-label="Previous image">&#8592;</button>
  <img id="gallery-overlay-img" src="" alt="">
  <button id="gallery-next" class="gallery-nav" aria-label="Next image">&#8594;</button>
</div>
