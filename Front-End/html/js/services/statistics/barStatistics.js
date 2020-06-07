import { barCount, getMarciByJudete } from "../charts/bar.js"
import { List_judete } from "../../constants/judete.js";
let bar_arry = [];

const listaCuJudeteSelectate = [];
const listaCuMarciSelectate = [];
var bar_total_masini = document.getElementById("bar_total_masini");


let countAndCompare = (event) => {
    checkIfEmpty();
    let judetSelectat = document.getElementById('barchart_creator');
    let judet = judetSelectat.value;

    const containerId = "barchart_" + judet;
    const id_card = "bar_grid_" + judet;
    const id_select = "bar_select_criteriu_" + judet;


    // getMarciByJudete(input2, containerId);
    barCount(listaCuJudeteSelectate, "bar_total_masini");
    //  document.getElementById(id_button_remove).addEventListener("click", remove);
    //  document.getElementById(id_select).addEventListener("change", pickCategory);
};

function checkIfEmpty() {
    if (listaCuJudeteSelectate.length != 0) {
        bar_total_masini.style.display = "block";
    } else {
        bar_total_masini.style.display = "none";
    }
}

let addAndRemove = (event) => {
    const judet = event.target.id.split("_")[2];

    if (listaCuJudeteSelectate.includes(judet)) {
        const poz = listaCuJudeteSelectate.indexOf(judet);
        if (poz > -1) {
            listaCuJudeteSelectate.splice(poz, 1);
            checkIfEmpty();
        }
    } else {
        listaCuJudeteSelectate.push(judet);
    }
    listaCuJudeteSelectate.sort();
}

function initSelectJudete(id) {
    document.getElementById(id).addEventListener("click", countAndCompare)
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
        document.getElementById(id_input).addEventListener("click", addAndRemove);

    });
    a.insertAdjacentHTML('beforeend', '</section>');
};

let test = (event) => {
    var s = document.getElementById("lname").value;
    listaCuMarciSelectate.push(s);
    getMarciByJudete(listaCuJudeteSelectate, listaCuMarciSelectate, "test")
}

function initTest(id) {
    document.getElementById("btest").addEventListener("click", test);

}




window.addEventListener('DOMContentLoaded', (event) => {
    initSelectJudete("barchart_creator")
    initTest("test");
});