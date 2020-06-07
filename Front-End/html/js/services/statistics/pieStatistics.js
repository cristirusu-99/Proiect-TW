import { List_judete } from "../../constants/judete.js";
import { drawChart } from "../charts/pie.js"

let pie_arry = [];

let pickCategory = (event) => {
  const judet = event.target.id.split("_")[2];
  const containerId = "piechart_" + judet;
  const id_select = "select_criteriu_" + judet;
  const search = document.getElementById(id_select).value;
  drawChart(judet, search, containerId);
};

let remove = (event) => {
  const judet = event.target.id.split("_")[2];
  let element = document.getElementById("grid_" + judet);
  console.log(element);
  element.remove();
  const poz = pie_arry.indexOf("piechart_" + judet);
  if (poz > -1) {
    pie_arry.splice(poz, 1);
  }
};

let select_judet = (event) => {
  let judetSelectat = document.getElementById('piechart_creator');
  let judet = judetSelectat.value;

  const containerId = "piechart_" + judet;
  const id_card = "grid_" + judet;
  const id_button_remove = "button_" + containerId;
  const id_select = "select_criteriu_" + judet;

  if (pie_arry.includes(containerId)) {
    return;
  }
  pie_arry.push(containerId);

  document.getElementById("pie_grid").insertAdjacentHTML('beforeend',
    `
<li id= "`+ id_card + `" class="card" >

<select id="`+ id_select + `" >
      <option value = "MARCA"> Marca </option>
      <option value = "CATEGORIENATIONALA"> Categorie Nationala </option>
      <option value = "CATEGORIECOMUNITARA"> Categorie Comunitara </option>
      <option value = "DESCRIERECOMERCIALA"> Descriere</option>
</select>
<div id="` + containerId + `"> </div>
<button class="button_delete_pi_chart" id="` + id_button_remove + `">Delete</button>
</li>`);

  drawChart(judet, "MARCA", containerId);

  document.getElementById(id_button_remove).addEventListener("click", remove);
  document.getElementById(id_select).addEventListener("change", pickCategory);
};


function initSelectJudete(id) {
  var s2 = document.getElementById(id);
  let optionArray = List_judete;
  s2.innerHTML = "";
  for (var option in optionArray) {
    var newOption = document.createElement("option");
    newOption.value = optionArray[option];
    newOption.innerHTML = optionArray[option];
    s2.options.add(newOption);
  }
  document.getElementById(id).addEventListener("change", select_judet)
}

window.addEventListener('DOMContentLoaded', (event) => {
  initSelectJudete("piechart_creator");
});