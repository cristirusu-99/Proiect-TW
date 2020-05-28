
function onDropdownValueChange(id){
    myBarchart.draw();
    var criteria = document.getElementById(id).value;

}

function onPieDropdownChange(){
    var criteria = document.getElementById("cars1").value;
   // sendRequest(criteria);
   // recieveRequest();
    //schimb datele cu care fac pie-ul 
    pieDraw.data = data;
    pieDraw.drawPieChart();

}

function  makeRequestWithSpecificCriteria(filter){
    var dataFromGet = [];
    fetch('http://127.0.0.1:3000/api/v1/cars/by?JUDET=ALBA')
    .then((response) => {
      return  response.json();
    })
    .then((data) => {
      storeData(data);
      filter();})
    .catch(function(error) {
        console.log('Request failed', error);
      });
    }