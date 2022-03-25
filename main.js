import './style.css'

import * as THREE from "three"

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


var box = new THREE.BoxGeometry(10, 10, 10);

// 立方体几何体box作为EdgesGeometry参数创建一个新的几何体
var edges = new THREE.EdgesGeometry(box);
// 立方体线框，不显示中间的斜线
var edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xff00ff
})
var line = new THREE.LineSegments(edges,edgesMaterial);
// 网格模型和网格模型对应的轮廓线框插入到场景中
scene.add(line);


function animate(){
    requestAnimationFrame(animate)
    line.rotation.x += 0.01

    render.render(scene,camera)
}
animate()
