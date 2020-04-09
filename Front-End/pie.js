google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Autoutilitare',     11],
    ['Tractoare',      2],
    ['Autobuze',  2],
    ['Autovehicule', 2],
    ['Microbuze',    7]
  ]);

  var options = {
    title: 'Distributie Vehicule',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));

  chart.draw(data, options);}
// sursa https://developers.google.com/chart/interactive/docs/gallery/piechart