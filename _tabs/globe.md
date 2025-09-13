---
layout: page
title: Globe
icon: fas fa-globe
order: 5
---

<div id="globe-container" style="width: 100%; height: 600px; position: relative;">
  <canvas id="globe"></canvas>
</div>

<script type="module">
import { Globe } from 'https://cdn.skypack.dev/@lilnasy/multiplayer-globe';

const globe = new Globe(document.getElementById('globe'));
globe.start();
</script>
