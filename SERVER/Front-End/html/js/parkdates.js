
window.addEventListener('DOMContentLoaded', (event) => {
    getAllDates();
  });


  function getAllDates(){
    var dataFromGet = [];
    fetch('http://127.0.0.1:3000/api/v1/cars/byjudet?judet=IASI&fbclid=IwAR3_SxS0eT15LQa3-RMIrQPd1n-aIXXVPjUrYg_U5hRRTxey8VNlTRIIv9Y')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      storeData(data);})
    .catch(function(error) {
        console.log('Request failed', error);
      });

  }
  function countProperties(obj) {
    return Object.keys(obj).length;
} 
  function storeData(data,headerTable)
  {
    dataFromGet = data[0];
    var headerTable = Object.keys(dataFromGet);
    var countElemHeader= countProperties(headerTable);// get field names from first object 
   
    makeTableWithdata(data,headerTable,100);

  }

  function makeTableWithdata(data, header,counts){
     var element = document.getElementById('data-table');
     var table = document.createElement("table");
     table.setAttribute("id","table-data");
     var tableBody = document.createElement("tbody");
     tableBody.setAttribute("id","table-body");

     var headTable = document.createElement("thead");
     var firstTr = document.createElement("tr");
     header.filter(val => val != "_id")
     .forEach( val =>{var th = document.createElement("th");
                        th.classList.add("sort-asc");
                      th.onclick =function(value)
                      {
                          makeSomething(data,this.innerHTML,this);
                       }  ;
                      th.appendChild(document.createTextNode(val))
                     firstTr.appendChild(th);})
    headTable.appendChild(firstTr);
    table.appendChild(headTable);
    createBodyTable(element,tableBody,table,data,counts,"asc");
  }

 function createBodyTable(element,tableBody,table,data,counts, ordered)
 {
    
    for(i = 1 ; i < counts; i++){
    var row = document.createElement("tr");
    var dates =  Object.keys(data[i]);
    dates.filter(y=> y != '_id')
    .forEach( val =>
      {
        var column = document.createElement("td");
            column.appendChild(document.createTextNode(data[i][val]));
            row.appendChild(column);

        
    }
    );
    tableBody.appendChild(row);

  
 }
 table.appendChild(tableBody);
 element.appendChild(table);
 }


 function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  function makeSomething(data,nodeValue,sth){
      var sort;
   if(sth.classList.contains("sort-asc"))
   {
    sort ="desc";
    sth.classList.remove("sort-asc");
    sth.classList.add("sort-desc");
   }
    else
     {
        sort ="asc";
        sth.classList.add("sort-asc");
        sth.classList.remove("sort-desc");
       }
     data.sort(compareValues(nodeValue, sort));

     var element = document.getElementById('data-table');
     var table = document.getElementById("table-data");
     var tableBody = document.getElementById("table-body");
    table.removeChild(tableBody);
    var tableBody = document.createElement("tbody");
    tableBody.setAttribute("id","table-body");
     var headTable = document.getElementsByTagName("thead");
     createBodyTable(element,tableBody,table,data,100,"desc");
    }
