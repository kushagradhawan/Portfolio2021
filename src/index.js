/* sass  */
import "./main.scss";
import FontFaceObserver from "fontfaceobserver";
import imagesLoaded from "imagesloaded";

/* three and shaders */
import * as THREE from "three";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import linkVertex from "./shaders/link/linkVertex.glsl";
import linkFragment from "./shaders/link/linkFragment.glsl";
import postVertex from "./shaders/postprocessing/postVertex.glsl";
import postFragment from "./shaders/postprocessing/postFragment.glsl";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";

/* scroll */
import ASScroll from "@ashthornton/asscroll";
import Highway from "@dogstudio/highway";
import { gsap } from "gsap";
import NormalizeWheel from "normalize-wheel";

/* utils */
// import { math } from "./utils.js";
import { lerp } from "./utils.js";

/* map */
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

/* 



*/

/* constants */
const FONT_TIMEOUT = 25000;
const rollupElem = document.querySelector("#a-rollup-container");

/* variables */
let webgl = undefined;

/* init webgl + preloader + highway.js */

/* preloader */

/* all assets */

/* scroll */
class Scroll {
    constructor() {
        this.smoothScroll = new ASScroll({
            disableRaf: true,
            innerElement: ".a-scrollable",
            ease: 0.096,
            disableOnTouch: true,
        });
    }

    resetScroll() {
        this.smoothScroll.scrollTo(0);
    }

    enableScroll() {
        this.resetScroll();
        this.smoothScroll.enable();
    }

    disableScroll() {
        this.resetScroll();
        this.smoothScroll.disable();
    }
}

const smoothScrollInstance = new Scroll();

/* webgl */
class WebGL {
    constructor(domObject) {
        /* base */
        this.scene = new THREE.Scene();
        this.scene.background = null;
        this.container = domObject.dom;
        this.isPlaying = false;
        this.time = 0;

        /* layout */
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        /* renderer */
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);
        this.glitchPass = null;

        /* camera */
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
        this.camera_z = 600;
        this.camera.position.set(0, 0, this.camera_z);
        this.camera.fov = 2 * Math.atan(this.height / 2 / this.camera_z) * (180 / Math.PI);

        /* link nav */
        if (this.isMouseOver) this.onMouseOver(this.tempItemIndex);
        this.tempItemIndex = null;
        this.bodyContainer = document.body;
        this.mouse = new THREE.Vector2();

        /* infinite scroll */
        this.infiniteScroll = false;
        this.infiniteScrollObj = {
            ease: 0.05,
            current: 0,
            target: 0,
        };

        /* scroll pos */
        this.smoothScroll = smoothScrollInstance.smoothScroll;
        this.createGeometry();
        this.createMaterial();
        this.setupLinkImages();
        this.resize();
        this.setupResize();
        this.composerPass();
        this.render();
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

    createGeometry() {
        this.planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
    }

    createMaterial() {
        /* single material */
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            wireframe: false,
            uniforms: {
                time: { value: 0 },
                uImage: { value: 0 },
                uImageSizes: { value: new THREE.Vector2() },
                uPlaneSizes: { value: new THREE.Vector2() },
                uStrength: { value: 0 },
                uViewportSizes: { value: new THREE.Vector2(this.width, this.height) },
            },
        });
    }

    addImages() {
        this.images = [...document.querySelectorAll("img.image--scrollable")];
        this.materials = [];
        this.imageStore = this.images.map((img) => {
            let bounds = img.getBoundingClientRect();
            let texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            let material = this.material.clone();
            this.materials.push(material);

            material.uniforms.uImage.value = texture;
            material.uniforms.uImageSizes.value.x = img.naturalWidth;
            material.uniforms.uImageSizes.value.y = img.naturalHeight;
            material.uniforms.uPlaneSizes.value.x = bounds.width;
            material.uniforms.uPlaneSizes.value.y = bounds.height;

            let mesh = new THREE.Mesh(this.planeGeometry, material);
            mesh.scale.set(bounds.width, bounds.height, 1);
            this.scene.add(mesh);

            return {
                img,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
                mesh,
                infiniteExtra: 0,
                isBelow: false,
                isAbove: false,
            };
        });
    }

    setupLinkImages() {
        /* complete function to set up link images into webgl scene */
        this.linksWrapper = document.querySelector(".m-project-links");
        this.linkEffectStrength = 0.002;
        this.linkImageDimensions = { height: 0, width: 0 };

        /* create new material for links */
        this.linkMaterial = new THREE.ShaderMaterial({
            vertexShader: linkVertex,
            fragmentShader: linkFragment,
            wireframe: false,
            uniforms: {
                time: { value: 0 },
                uAlpha: { value: 0 },
                uImage: { value: 0 },
                uOffset: { value: new THREE.Vector2() },
                uImageSizes: { value: new THREE.Vector2() },
                uPlaneSizes: { value: new THREE.Vector2() },
                uViewportSizes: { value: new THREE.Vector2(this.width, this.height) },
            },
        });

        /* addImages */
        this.links = [...document.querySelectorAll(".m-link-item")];
        this.linkTextures = [];
        this.linkImageStore = this.links.map((element, index) => {
            let img = element.querySelector("img");
            let bounds = img.getBoundingClientRect();
            let texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            this.linkTextures.push(texture);

            /* set the bounds once, since all images have the same bounds */
            if (this.linkImageDimensions.height === 0 || this.linkImageDimensions.width === 0) {
                this.linkImageDimensions.height = bounds.height;
                this.linkImageDimensions.width = bounds.width;
                this.linkMaterial.uniforms.uImageSizes.value.x = img.naturalWidth;
                this.linkMaterial.uniforms.uImageSizes.value.y = img.naturalHeight;
                this.linkMaterial.uniforms.uImage.value = texture;
            }

            return {
                index,
                element,
                texture,
                img,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                top: bounds.top,
            };
        });

        /* update material uniforms */
        this.linkMaterial.uniforms.uPlaneSizes.value.x = this.linkImageDimensions.width;
        this.linkMaterial.uniforms.uPlaneSizes.value.y = this.linkImageDimensions.height;

        /* create single mesh */
        this.linkMesh = new THREE.Mesh(this.planeGeometry, this.linkMaterial);
        this.linkMesh.material.depthTest = false;
        this.linkMesh.scale.set(this.linkImageDimensions.width, this.linkImageDimensions.height, 1);
        this.scene.add(this.linkMesh);

        /* init event listeners */
        this.links.forEach((element, index) => {
            element.addEventListener("mouseover", this.onMouseOverLink.bind(this, index), false);
        });
        this.bodyContainer.addEventListener("mousemove", this.onMouseMoveLink.bind(this), false);
        this.linksWrapper.addEventListener("mouseleave", this.onMouseLeaveLink.bind(this), false);
    }

    /* link mouse functions/events */
    onMouseLeaveLink(event) {
        this.isMouseOver = false;
        gsap.to(this.linkMaterial.uniforms.uAlpha, {
            duration: 0.5,
            value: 0,
            ease: "power4.out",
        });
    }
    onMouseMoveLink(event) {
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;
        let x = this.mouse.x.map(-1, 1, -this.width / 2, this.width / 2);
        let y = this.mouse.y.map(-1, 1, -this.height / 2, this.height / 2);
        this.linkPosition = new THREE.Vector3(x, y, 0);
        gsap.to(this.linkMesh.position, {
            duration: 1,
            x: x,
            y: y,
            ease: "power4.out",
            onUpdate: this.onLinkPositionUpdate.bind(this),
        });
    }
    onLinkPositionUpdate() {
        let offset = this.linkMesh.position.clone().sub(this.linkPosition).multiplyScalar(-this.linkEffectStrength);
        this.linkMaterial.uniforms.uOffset.value = offset;
    }
    onMouseOverLink(index, event) {
        this.tempItemIndex = index;
        this.onMouseEnterLink();
        if (this.currentLinkItem && this.currentLinkItem.index === index) return;
        this.onLinkTargetChange(index);
    }
    onMouseEnterLink() {
        if (!this.currentLinkItem || !this.isMouseOver) {
            this.isMouseOver = true;
            gsap.to(this.linkMaterial.uniforms.uAlpha, {
                duration: 0.5,
                value: 1,
                ease: "power4.out",
            });
        }
    }
    onLinkTargetChange(index) {
        this.currentLinkItem = this.linkImageStore[index];
        if (!this.currentLinkItem.texture) return;
        this.linkMaterial.uniforms.uImage.value = this.currentLinkItem.texture;
    }

    /* set position */
    setPosition() {
        if (this.imageStore === null) return;
        this.imageStore.forEach((o) => {
            o.mesh.position.y = -this.smoothScroll.smoothScrollPos - o.top + this.height / 2 - o.height / 2;
            o.mesh.position.x = o.left - this.width / 2 + o.width / 2;
        });
    }

    setInfinitePosition() {
        if (this.imageStore === null) return;

        this.imageStore.forEach((o) => {
            o.isBelow = o.mesh.position.y + o.height / 2 < -this.height / 2;
            o.isAbove = o.mesh.position.y - o.height / 2 > this.height / 2;

            if (this.scrollDirection === "up" && o.isAbove) {
                o.infiniteExtra += this.infiniteGalleryHeight;
                o.isBelow = false;
                o.isAbove = false;
            }
            if (this.scrollDirection === "down" && o.isBelow) {
                o.infiniteExtra -= this.infiniteGalleryHeight;
                o.isBelow = false;
                o.isAbove = false;
            }

            o.mesh.position.y = this.currentInfiniteScrollPos - o.top + this.height / 2 - o.height / 2 - o.infiniteExtra;
            o.mesh.position.x = o.left - this.width / 2 + o.width / 2;
        });
    }

    setScrollParams() {
        this.currentScrollPos = 0;
        this.lastScrollPos = 0;
        this.scrollStrength = 0;
    }

    setInfiniteScrollParams() {
        this.infiniteScrollEase = 0.1;
        this.currentInfiniteScrollPos = 0;
        this.lastInfiniteScrollPos = 0;
        this.infiniteScrollPosTarget = 0;
        this.scrollStrength = 0;
        console.log(document.querySelector(".m-gallery__g"));
        this.infiniteGalleryHeight = document.querySelector(".js-main.o-gallery")
            ? document.querySelector(".m-gallery__g").getBoundingClientRect().height + 192
            : null;
        this.scrollDirection = null;
    }

    setInfiniteScroll() {
        window.addEventListener("mousewheel", this.onWheel.bind(this));
        window.addEventListener("wheel", this.onWheel.bind(this));
    }

    removeInfiniteScroll() {
        this.setInfiniteScrollParams();
        window.removeEventListener("mousewheel", this.onWheel);
        window.removeEventListener("wheel", this.onWheel);
    }

    onWheel(event) {
        if (this.infiniteScroll) {
            const normalized = NormalizeWheel(event);
            const speed = normalized.pixelY;
            this.infiniteScrollPosTarget += speed * 0.5;
        }
    }

    dispose() {
        this.stop();
        this.imageStore.forEach((o) => {
            this.scene.remove(o.mesh);
            o.mesh.material.uniforms.uImage.value.dispose();
            o.mesh.material.dispose();
            o.mesh.geometry.dispose();
        });
        this.materials = null;
        this.images = null;
        this.imageStore = null;
        this.renderer.render(this.scene, this.camera);
    }

    stop() {
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.render();
        }
    }

    composerPass() {
        this.composer = new EffectComposer(this.renderer);
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        // this.glitchPass = new GlitchPass();
        // this.glitchPass.renderToScreen = true;
        // this.composer.addPass(this.glitchPass);

        // custom shader pass
        var counter = 0.0;
        this.postEffect = {
            uniforms: {
                time: { value: 0 },
                scrollSpeed: { value: null },
                uStrength: { value: null },
                tDiffuse: { value: null },
            },
            vertexShader: postVertex,
            fragmentShader: postFragment,
        };

        this.customPass = new ShaderPass(this.postEffect);
        this.customPass.renderToScreen = true;
        this.composer.addPass(this.customPass);
    }

    /* render loop */
    render() {
        if (!this.isPlaying) return;

        this.time += 0.05;

        /* check for infinite scroll */
        if (this.infiniteScroll) {
            this.lastInfiniteScrollPos = this.currentInfiniteScrollPos;
            this.currentInfiniteScrollPos = lerp(this.currentInfiniteScrollPos, this.infiniteScrollPosTarget, this.infiniteScrollEase);

            /* only renders position when scrolled */
            if (Math.round(this.currentInfiniteScrollPos) !== Math.round(this.lastInfiniteScrollPos)) {
                this.setInfinitePosition();
                this.scrollDirection =
                    Math.round(this.currentInfiniteScrollPos) - Math.round(this.lastInfiniteScrollPos) > 0 ? "up" : "down";
                this.scrollStrength =
                    ((Math.round(this.currentInfiniteScrollPos) - Math.round(this.lastInfiniteScrollPos)) / this.width) * 512;
            }
        } else {
            this.smoothScroll.onRaf();
            this.lastScrollPos = this.currentScrollPos;
            this.currentScrollPos = this.smoothScroll.smoothScrollPos;

            /* only renders position when scrolled */
            if (Math.round(this.currentScrollPos) !== Math.round(this.lastScrollPos)) {
                this.setPosition();
                this.scrollStrength = ((Math.round(this.currentScrollPos) - Math.round(this.lastScrollPos)) / this.width) * 512;
            }
        }

        /* send scroll strength to uniforms */
        if (this.materials) {
            this.materials.forEach((m) => {
                m.uniforms.time.value = this.time;
                m.uniforms.uStrength.value = this.scrollStrength;
            });
        }

        this.customPass.uniforms.time.value = this.time;
        this.customPass.uniforms.uStrength.value = this.scrollStrength;
        requestAnimationFrame(this.render.bind(this));
        this.composer.render();
    }
}

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

    /* init page transitions */
    const highwayCore = new Highway.Core({
        renderers: {
            "ui-gallery": GalleryRenderer,
            "fa-case-study": HomeRenderer,
            home: HomeRenderer,
        },
        transitions: {
            default: PageTransition,
        },
    });
});

/* postload images */

/* logic for page transitions */

class GalleryRenderer extends Highway.Renderer {
    /* 
    works when going from any other page to Home or when a Home page loads,
    runs when added to DOM
    */
    onEnter() {
        console.log("on Home Enter");
        new Promise((resolve, reject) => {
            const imgLoad = imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
        }).then(() => {
            smoothScrollInstance.smoothScroll.enable(false, true, false, false);
            smoothScrollInstance.smoothScroll.disable();
            setTimeout(() => {
                webgl.addImages();
                webgl.infiniteScroll = true;
                webgl.setInfiniteScrollParams();
                webgl.setInfiniteScroll();
                webgl.setInfinitePosition();
                webgl.play();
                gsap.to("#a-rollup-container", {
                    duration: 1,
                    scaleY: 0,
                    ease: "circ.inOut",
                    onComplete: function () {
                        rollupElem.style.transformOrigin = "100% 100%";
                    },
                });
                console.log("played");
            }, 500);
        });
    }

    /* 
    works when going from any other page to Home or when a Home page loads,
    runs when transition's done is called (in this case, Home animate in)
    it waits for 'done' to be called in the 'in' method of a transition
    */
    onEnterCompleted() {
        console.log("on Home Enter Completed");
    }

    /* 
    works when going from Home to any other page, regardless of from.remove()
    */
    onLeave() {
        console.log("on Home Leave");
    }

    /* 
    works when going from Home to any other page, regardless of from.remove()
    it waits for 'done' to be called in the 'out' method of a transition
    */
    onLeaveCompleted() {
        webgl.dispose();
        webgl.removeInfiniteScroll();
        webgl.infiniteScroll = false;
        console.log("on Home Leave Completed");
    }
}

class HomeRenderer extends Highway.Renderer {
    /* 
    works when going from any other page to Home or when a Home page loads,
    runs when added to DOM
    */
    onEnter() {
        console.log("on Home Enter");
        new Promise((resolve, reject) => {
            const imgLoad = imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
        }).then(() => {
            smoothScrollInstance.smoothScroll.enable(false, true, false, false);
            setTimeout(() => {
                webgl.addImages();
                webgl.setPosition();
                webgl.setScrollParams();
                webgl.play();
                gsap.to("#a-rollup-container", {
                    duration: 1,
                    scaleY: 0,
                    ease: "circ.inOut",
                    onComplete: function () {
                        rollupElem.style.transformOrigin = "100% 100%";
                    },
                });
                console.log("played");
            }, 500);
        });
    }

    /* 
    works when going from any other page to Home or when a Home page loads,
    runs when transition's done is called (in this case, Home animate in)
    it waits for 'done' to be called in the 'in' method of a transition
    */
    onEnterCompleted() {
        console.log("on Home Enter Completed");
    }

    /* 
    works when going from Home to any other page, regardless of from.remove()
    */
    onLeave() {
        console.log("on Home Leave");
    }

    /* 
    works when going from Home to any other page, regardless of from.remove()
    it waits for 'done' to be called in the 'out' method of a transition
    */
    onLeaveCompleted() {
        webgl.dispose();
        webgl.removeInfiniteScroll();
        webgl.infiniteScroll = false;
        console.log("on Home Leave Completed");
    }
}

class PageTransition extends Highway.Transition {
    /* 
    this func will be called to animate out the page before next page
     */
    out({ from, trigger, done }) {
        console.log("animated out started");
        gsap.to("#a-rollup-container", {
            duration: 1,
            scaleY: 1,
            ease: "circ.inOut",
            onComplete: function () {
                smoothScrollInstance.smoothScroll.disable();
                rollupElem.style.transformOrigin = "100% 0%";
                done();
                console.log("animated out finished");
            },
        });
    }

    /* 
    this func will be called to animate the next page in,
    also have to remove the previous page manually
    */
    in({ from, to, trigger, done }) {
        console.log("animation in started");
        from.remove();
        done();
        console.log("animated in finished");
    }
}
