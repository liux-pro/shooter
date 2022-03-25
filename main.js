import './style.css'

import * as THREE from "three"

import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const render = new THREE.WebGLRenderer(
    {
        canvas: document.querySelector("#bg")
    }
)
render.setPixelRatio(window.devicePixelRatio)
render.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(20)


const box = new THREE.BoxGeometry(10, 10, 10);

// 立方体几何体box作为EdgesGeometry参数创建一个新的几何体
const edges = new THREE.EdgesGeometry(box);
// 立方体线框，不显示中间的斜线
const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xff00ff
});
const line = new THREE.LineSegments(edges, edgesMaterial);
// 网格模型和网格模型对应的轮廓线框插入到场景中
scene.add(line);

const controls = new PointerLockControls(camera, render.domElement);

let speed = 0.1
let vForward = 0
let vRight = 0
let vUp = 0

document.querySelector("#lock").addEventListener("click", () => {
    controls.lock()
})
document.querySelector("#left").addEventListener("click", () => {
    controls.moveRight(-1)
})
const onKeyDown = function (event) {

    switch (event.code) {

        case 'ArrowUp':
        case 'KeyW':
            vForward = speed;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            vRight = -speed;
            break;

        case 'ArrowDown':
        case 'KeyS':
            vForward = -speed;
            break;

        case 'ArrowRight':
        case 'KeyD':
            vRight = speed;
            break;

        case 'Space':
            if (vUp === 0) vUp += speed;
            break;

    }

};

const onKeyUp = function (event) {

    switch (event.code) {

        case 'ArrowUp':
        case 'KeyW':
            vForward = 0;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            vRight = 0;
            break;

        case 'ArrowDown':
        case 'KeyS':
            vForward = 0;
            break;

        case 'ArrowRight':
        case 'KeyD':
            vRight = 0;
            break;

        case 'Space':
            if (vUp === 0) vUp += speed;
            break;

    }

};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


function animate() {
    requestAnimationFrame(animate)
    // line.rotation.x += 0.01
    if (vForward !== 0) {
        controls.moveForward(vForward)
        // vForward = gotoZero(vForward)
    }
    if (vRight !== 0) {
        controls.moveRight(vRight)
        // vRight = gotoZero(vRight)
    }
    render.render(scene, camera)
}

function gotoZero(num) {
    if (num === 0) return num
    let after
    if (num > 0) {
        after = num - speed
    } else {
        after = num + speed
    }
    if (after * num > 0) {
        return after
    } else {
        return 0
    }
}

animate()
