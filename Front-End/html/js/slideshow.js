<<<<<<< Updated upstream
var images = [];
var i = 0;
images[0] = "../assets/parkauto.jpg";
images[1] = "../assets/bus.jpeg";
images[2] = "../assets/trac.jpg";
images[3] = "../assets/fleet.jpg";
images[4] = "../assets/trucks.jpeg";
images[5] ="../assets/tractor.jpg"
images[6] = "../assets/CAR-PARK.jpg"

function changeImage(){
   var slide =  document.getElementById("slide");
   slide.src=images[i];
    if( i < images.length-1)
        i++;
    else i = 0;

    setTimeout(changeImage,1000);
=======
import { CARS_IMAGES as images } from "./constants/images.js";
var i=0;
function changeImage() {
    var slide = document.getElementById("slide");
    slide.src = images[i];
    if (i < images.length - 1)
        i++;
    else i = 0;

    setTimeout(changeImage, 7000);
>>>>>>> Stashed changes
}


window.addEventListener('DOMContentLoaded', (event) => {
    changeImage();
});