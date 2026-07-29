import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 25);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 0.1});
const starVerticles = [];

for (let i = 0; i < 1500; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    starVerticles.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVerticles, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
gradient.addColorStop(0, '#ffffff');
gradient.addColorStop(0.3, '#ffcc00');
gradient.addColorStop(0.8, '#ff3300');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 512, 512);

const sunTexture = new THREE.CanvasTexture(canvas);

const sunGeo = new THREE.SphereGeometry(3, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({map: sunTexture});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const earthGeo = new THREE.SphereGeometry(0.6, 16, 16);
const earthMat = new THREE.MeshBasicMaterial({color: 0x0000ff});
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);

const moonGeo = new THREE.SphereGeometry(0.15, 12, 12);
const moonMat = new THREE.MeshBasicMaterial({color: 0xcccccc});
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.set(1.2, 0, 0);
earth.add(moon);

const probeGeo = new THREE.ConeGeometry(0.1, 0.3, 8);
const probeMat = new THREE.MeshBasicMaterial({color: 0xf59e0b});
const probe = new THREE.Mesh(probeGeo, probeMat);
probe.position.set(-1, 0.5, 0);
probe.rotation.x = Math.PI / 2;
earth.add(probe);

const planetGeo = new THREE.SphereGeometry(1.2, 16, 16);
const planetMat = new THREE.MeshBasicMaterial({color: 0xe2bf7d});
const planet = new THREE.Mesh(planetGeo, planetMat);
scene.add(planet);

const ringGeo = new THREE.TorusGeometry(2.2, 0.15, 8, 48);
const ringMat = new THREE.MeshBasicMaterial({color: 0xeab308});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2.2;
planet.add(ring);

let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.008;

    sun.rotation.y += 0.002;

    earth.position.x = Math.cos(time) * 10;
    earth.position.z = Math.sin(time) * 10;
    earth.rotation.y += 0.02;

    planet.position.x = Math.cos(time *0.6) * 16;
    planet.position.z = Math.sin(time * 0.6) * 16;
    planet.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

