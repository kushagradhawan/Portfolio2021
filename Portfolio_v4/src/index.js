import "./styles/index.scss";
import nearestNextInteger from "./js/nearestNextInteger";
import nearestPreviousInteger from "./js/nearestPreviousInteger";
import DrawOnCanvas from "./js/webgl-logic";

/* run webgl logic */

const webglLogic = new DrawOnCanvas({
    dom: document.querySelector("#b-webgl-container"),
});

/* temporary js */

/* grid toggle */

// (name === 'true') ? 'Y' :'N';
const gridToggle = document.querySelector(".temporary-grid-toggle");
const grid = document.querySelector(".temporary-grid");
let gridState = false;
gridToggle.addEventListener("click", () => {
    if (gridState) {
        grid.style.opacity = 0;
        gridState = false;
    } else {
        grid.style.opacity = 1;
        gridState = true;
    }
});

/* js page adjustments */

const homeIntroductionImage = document.querySelector(".c-home__introduction .c-introduction__image");
homeIntroductionImage.style.width = homeIntroductionImage.getBoundingClientRect().width + 64 + "px";

/* this code aligns main content to the background grid */
const main = document.querySelector(".js-main");
const mainLeftPositon = main.getBoundingClientRect().left;
main.style.transform = `translate3d(${nearestPreviousInteger(mainLeftPositon, 16) - mainLeftPositon}px,0,0)`;

/* temporary grid adjustment */
grid.style.transform = `translate3d(${nearestPreviousInteger(mainLeftPositon, 16) - mainLeftPositon}px,0,0)`;

/* background strips adjustments */
const projectLinks = document.querySelector(".c-project-links");
projectLinksHeight = projectLinks.getBoundingClientRect().height;
const backgroundStrips = document.querySelector(".b-background-stripes");
backgroundStrips.style.top = `${projectLinksHeight}px`;
