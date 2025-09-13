---
layout: page
title: Globe
icon: fas fa-globe
order: 5
---

<div id="globe-container" style="width: 100%; height: 600px; position: relative; background: #000;">
  <canvas id="globe-canvas"></canvas>
</div>

<script src="https://unpkg.com/three@0.158.0/build/three.min.js"></script>
<script>
const container = document.getElementById('globe-container');
const canvas = document.getElementById('globe-canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setClearColor(0x000011);

// Create globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({ 
  color: 0x4444ff,
  wireframe: true 
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 10;

// Animation
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

animate();
</script>
