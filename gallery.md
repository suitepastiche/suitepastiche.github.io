---
layout: page
title: Gallery
permalink: /gallery/
gallery: true
description: See photos of past parties
---

<div class="gallery-wrap">
  <div class="gallery">
    {%- for img in site.data.gallery -%}
      {%- assign full = img.filename -%}
      <a class="gallery-item" href="{{ '/assets/gallery/' | append: full | relative_url }}" data-full="{{ '/assets/gallery/' | append: full | relative_url }}">
        <img src="{{ '/assets/gallery/thumbs/' | append: full | relative_url }}" loading="{% if forloop.index <= 6 %}eager{% else %}lazy{% endif %}" decoding="async" alt="">
      </a>
    {%- endfor -%}
  </div>
</div>

<div id="gallery-overlay" class="gallery-overlay">
  <button id="gallery-close" class="gallery-close" aria-label="Close">✕</button>
  <button id="gallery-prev" class="gallery-nav" aria-label="Previous image">&#8592;</button>
  <div class="gallery-overlay-inner">
    <img id="gallery-overlay-img" src="" alt="">
  </div>
  <button id="gallery-next" class="gallery-nav" aria-label="Next image">&#8594;</button>
</div>