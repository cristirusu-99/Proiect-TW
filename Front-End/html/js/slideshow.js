import { CARS_IMAGES as images } from "./constants/images.js";
var i=0;
function changeImage() {
    var slide = document.getElementById("slide");
    slide.src = images[i];
    if (i < images.length - 1)
        i++;
    else i = 0;

    setTimeout(changeImage, 7000);
}


window.addEventListener('DOMContentLoaded', (event) => {
    changeImage();
});