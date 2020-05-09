
function onDropdownValueChange(){
    myBarchart.draw();
    var criteria = document.getElementById("cars2").value;

}

function onPieDropdownChange(){
    var criteria = document.getElementById("cars1").value;
   // sendRequest(criteria);
   // recieveRequest();
    //schimb datele cu care fac pie-ul 
    pieDraw.data = data;
    pieDraw.drawPieChart();

}

