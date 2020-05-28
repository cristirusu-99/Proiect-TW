

var buttonCsv = document.getElementById("export-csv");

buttonCsv.onclick = function (){

    exportToCsv('result.csv',myDataSet);
}


function exportToCsv(filename, dataSet) {
  

    var csvFile ='';
    var keys = Object.keys(myDataSet);
    keys.forEach(key => csvFile = csvFile + key+ " , " + myDataSet[key] +'\n');
    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}