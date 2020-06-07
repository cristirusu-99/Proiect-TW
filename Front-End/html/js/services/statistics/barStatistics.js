import { barCount, getMarciByJudete } from "../charts/bar.js"
import { List_judete } from "../../constants/judete.js";
let bar_arry = [];

const input = [];
const input2 = ["dacia", "audi", "bmw", "opel"];
var bar_total_masini = document.getElementById("bar_total_masini");


let test = (event) => {
    checkIfEmpty();
    let judetSelectat = document.getElementById('barchart_creator');
    let judet = judetSelectat.value;

    const containerId = "barchart_" + judet;
    const id_card = "bar_grid_" + judet;
    const id_select = "bar_select_criteriu_" + judet;


    // getMarciByJudete(input2, containerId);
    barCount(input, "bar_total_masini");
    //  document.getElementById(id_button_remove).addEventListener("click", remove);
    //  document.getElementById(id_select).addEventListener("change", pickCategory);
};

function checkIfEmpty() {
    if (input.length != 0) {
        bar_total_masini.style.display = "block";
    } else {
        bar_total_masini.style.display = "none";
    }
}

let test2 = (event) => {
    const judet = event.target.id.split("_")[2];

    if (input.includes(judet)) {
        const poz = input.indexOf(judet);
        if (poz > -1) {
            input.splice(poz, 1);
            checkIfEmpty();
        }
    } else {
        input.push(judet);
    }
    input.sort();
}

function initSelectJudete(id) {
    document.getElementById(id).addEventListener("change", test)
    document.getElementById("button_list").insertAdjacentHTML('beforeend', `<section id="butoane" class="buttons-grid">`);
    var a = document.getElementById("butoane");

    List_judete.forEach(judet => {
        const id_input = "id_input_" + judet;
        a.insertAdjacentHTML('beforeend', ` 
        <div class = "text-card" >
        <label class="switch">
            <input id="`+ id_input + `" type="checkbox"></input>
            <span class="slider"></span>
        </label>
        `+ judet + `
        </div>`
        )
        document.getElementById(id_input).addEventListener("click", test2);

    });
    a.insertAdjacentHTML('beforeend', '</section>');
};








window.addEventListener('DOMContentLoaded', (event) => {
    initSelectJudete("barchart_creator")
});