import "./main.scss";
import * as THREE from "three";
import FontFaceObserver from "fontfaceobserver";
import imagesLoaded from "imagesloaded";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

/* constants */
const FONT_TIMEOUT = 25000;

/* webgl */
class WebGL {
    constructor(domObject) {
        this.scene = new THREE.Scene();
        this.container = domObject.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xffffff, 1);
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(0, this.width / this.height, 400, 1000);
        this.camera_z = 600;
        this.camera.position.set(0, 0, this.camera_z);
        this.camera.fov = 2 * Math.atan(this.height / 2 / this.camera_z) * (180 / Math.PI);

        this.time = 0;
        this.images = [...document.querySelectorAll("img")];
        this.isPlaying = true;

        this.addImages();
        this.setPosition();
        this.resize();
        this.render();
        this.setupResize();
    }

    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    addImages() {
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                time: { value: 0 },
                uImage: { value: 0 },
            },
        });

        this.materials = [];

        this.imageStore = this.images.map((img) => {
            let bounds = img.getBoundingClientRect();
            let geometry = new THREE.PlaneBufferGeometry(bounds.width, bounds.height, 16, 16);
            let texture = new THREE.Texture(img);
            texture.needsUpdate = true;

            let material = this.material.clone();
            this.materials.push(material);
            material.uniforms.uImage.value = texture;

            let mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);

            return {
                img: img,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
                mesh: mesh,
            };
        });

        console.log(this.imageStore);
    }

    setPosition() {
        this.imageStore.forEach((o) => {
            o.mesh.position.y = -o.top + this.height / 2 - o.height / 2;
            o.mesh.position.x = o.left - this.width / 2 + o.width / 2;
        });
    }

    stop() {
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.render();
            this.isPlaying = true;
        }
    }

    render() {
        if (!this.isPlaying) return;
        this.time += 0.05;

        this.materials.forEach((m) => {
            m.uniforms.time.value = this.time;
        });

        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

let webgl = undefined;

/* preloader */

/* images */
const preloadImages = new Promise((resolve, reject) => {
    const imgLoad = imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
});

/* fonts */
let nmachinaRegular = new FontFaceObserver("nmachina-regular");
let nmachinaMedium = new FontFaceObserver("nmachina-medium");
let nmachinaBold = new FontFaceObserver("nmachina-bold");
let nmontrealRegular = new FontFaceObserver("nmontreal-regular");
let nmontrealMedium = new FontFaceObserver("nmontreal-medium");
let nmontrealBold = new FontFaceObserver("nmontreal-bold");

/* all */
Promise.all([
    nmachinaRegular.load(null, FONT_TIMEOUT),
    nmachinaMedium.load(null, FONT_TIMEOUT),
    nmachinaBold.load(null, FONT_TIMEOUT),
    nmontrealRegular.load(null, FONT_TIMEOUT),
    nmontrealMedium.load(null, FONT_TIMEOUT),
    nmontrealBold.load(null, FONT_TIMEOUT),
    preloadImages,
]).then(function () {
    console.log("all loaded");
    /* load webgl */
    webgl = new WebGL({
        dom: document.querySelector("#a-webgl-container"),
    });
});
