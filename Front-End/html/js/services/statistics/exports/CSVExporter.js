//  var buttonCsv = document.getElementById("export-csv");

// buttonCsv.onclick = function (){

//     exportToCsv('result.csv',myDataSet);
// }


export function exportToCsv(event) {
    
    const data = event.target.id.split("button_csv_")[1].split("_");

    var id = "grid_" + data[0];
    var url = localStorage.getItem(id);

    var dataFromGet = []; 
    fetch(url)
    .then((response) => {
      return  response.json();
    })
    .then((data) => { dataFromGet = data;
        exportCSV("fisier.csv",dataFromGet);
     })
    .catch(function(error) {
        console.log('Request failed', error);
      });


}

function exportCSV(filename, myDataSet){
    var csvFile ='';
    var i = 0;
    var map = {};
    myDataSet.forEach(data => { map[data["MARCA"] +" "+ data["DESCRIERECOMERCIALA"]] = data["TOTALVEHICULE"];
    })
    var keys = Object.keys(map);
    keys.forEach(key => csvFile = csvFile + key+ " , " + map[key] +'\n');
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