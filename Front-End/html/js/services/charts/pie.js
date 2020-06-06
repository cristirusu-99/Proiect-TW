google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
var datesFromGet = [];
window.addEventListener('DOMContentLoaded', (event) => {
  drawChart();
});

let nume = "MARCA";

function drawChart() {
  var url = "http://127.0.0.1:3000/api/v1/cars/by?JUDET=GALATI";

  fetch(url )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
}
function fucntie_smechera(data, cuvant) {
  var obiect = new Map();
  data.forEach((valoare) => {
    if (obiect.has(valoare[cuvant])) {
      obiect.set(valoare[cuvant], obiect.get(valoare[cuvant]) + parseInt(valoare.TOTALVEHICULE));
    } else {
      obiect.set(valoare[cuvant], parseInt(valoare.TOTALVEHICULE));
    }
  })
  return obiect;
}

function onPieDropdownChange(id) {
  criteria = document.getElementById(id).value;
  nume = criteria;
  drawChart();
}
