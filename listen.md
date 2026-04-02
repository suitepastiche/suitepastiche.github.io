---
layout: page
title: Listen
permalink: /listen/
mixcloud: true
description: Listen to recordings of past parties
---

Listen back to recordings of our most recent parties, or [listen to all on Mixcloud](https://www.mixcloud.com/suitepastiche/){:target="_blank" rel="noopener noreferrer"}.

{% for mix in site.data.mixes %}
<iframe class="mixcloud-player" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fsuitepastiche%2F{{ mix.slug | url_encode }}%2F" allow="encrypted-media; fullscreen; speaker-selection; web-share;"></iframe>

{% endfor %}