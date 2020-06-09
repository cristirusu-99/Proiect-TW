google.charts.load('current', { 'packages': ['corechart'] });

import { API, ORDERBY, FIELD, translationColumnTables } from "../../constants/constants.js";
import { addObiecteDinAceiasiMarca } from "../carService.js"
import { exportToWebp } from "../statistics/exports/WEBPExporter.js";
import { exportToCsv } from "../statistics/exports/CSVExporter.js";
const carsApi = API.CARS_API;

export function drawChart(judet,nume, container, ) {
  var url = carsApi + "by?JUDET=" + judet + "&" + FIELD + "_id=0"
    + "&" + FIELD + "TOTALVEHICULE=1"
    + "&" + FIELD + nume + "=1";
  localStorage.setItem("grid_"+judet,url+ "&" + FIELD + "DESCRIERECOMERCIALA=1");
  fetch(url)
    .then(response => response.json())
    .then((response) => {

      const options = {
        title: "Statistica pe criteriul '" + translationColumnTables[nume] + "' pe judetul: " + judet,
        is3D: true,
      };

      var valori = [["TITLU", "NUMAR MASINI"]];
      addObiecteDinAceiasiMarca(response, nume).forEach((value, key) => {
        valori.push([key, value]);
      })
      const data = google.visualization.arrayToDataTable(valori);
      


      let chart = new google.visualization.PieChart(document.getElementById(container));
      chart.draw(data, options);
    }

    )
}

