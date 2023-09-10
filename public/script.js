import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const coneForm = document.getElementById('cone-form');
const sceneContainer = document.getElementById('scene-container');
const scene = new THREE.Scene();

// Создаем камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

// Создаем рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
sceneContainer.appendChild(renderer.domElement);

// Создаем контроллеры
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.autoRotate = false;
controls.maxDistance = 100;
controls.minDistance = 10;


function createConesFromData(height, radius, segments) {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    const geometry = new THREE.ConeGeometry(radius, height, segments);
    const material = new THREE.MeshBasicMaterial({color: 0xC0C0C0});
    const cone = new THREE.Mesh(geometry, material);
    // Создаем материал для линий с подсветкой
    const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000}); // Зеленая подсветка

    const edgesGeometry = new THREE.EdgesGeometry(geometry);

    // Создаем линейную модель боковых линий конуса
    const lines = new THREE.LineSegments(edgesGeometry, lineMaterial);

    scene.add(lines);
    scene.add(cone);
    animate();
}

// Функция для анимации
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Обработчик события отправки формы
coneForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Получаем значения из формы
    const height = parseFloat(document.getElementById('height').value);
    const radius = parseFloat(document.getElementById('radius').value);
    const segments = parseInt(document.getElementById('segments').value);

    const requestData = {
        height: height,
        radius: radius,
        segments: segments,
    };

    // Отправляем данные на сервер
    fetch('http://localhost:3000/calculate-cone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            createConesFromData(height, radius, segments);
        })
        .catch((error) => {
            console.error('Ошибка при отправке запроса:', error);
        });
});
