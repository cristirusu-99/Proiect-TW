google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

import * as CONSTANTS from "../../constants/constants.js";

const API_CARS = CONSTANTS.API.CARS_API;
const key_words = CONSTANTS.URL_KEY_WORDS;
var datesFromGet = [];

window.addEventListener('DOMContentLoaded', (event) => {
  drawChart();
});

let nume = "MARCA";

function drawChart() {
  var url = API_CARS + key_words.BY + "JUDET=GALATI";

  fetch(url)
    .then((response) => {
      response.json().then((data) => {
        var valori = [["TITLU", "NUMAR MASINI"]];
        var options = {
          title: 'My Sexy Chart',
          //pieSliceText: 'label',
          is3D: true,
          width: 700,
          haight: 700
        };


        fucntie_smechera(data, nume)
          .forEach((value, key) => {
            valori.push([key, value]);
          })
        data = google.visualization.arrayToDataTable(valori);

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      })
    })
}
function fucntie_smechera(data, cuvant) {
  var obiect = new Map();
  data.forEach((valoare) => {
    if (obiect.has(valoare[cuvant])) {
      obiect.set(valoare[cuvant], obiect.get(valoare[cuvant]) + valoare.TOTALVEHICULE);
    } else {
      obiect.set(valoare[cuvant], valoare.TOTALVEHICULE);
    }
  })
  return obiect;
}

function onPieDropdownChange(id) {
  criteria = document.getElementById(id).value;
  nume = criteria;
  drawChart();
}
