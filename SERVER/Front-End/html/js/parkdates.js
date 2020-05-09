
window.addEventListener('DOMContentLoaded', (event) => {
    getAllDates(filter);
  });


  function  getAllDates(filter){
    var dataFromGet = [];
    fetch('http://127.0.0.1:3000/api/v1/cars/byjudet?judet=BACAU')
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
                      var arrow = document.createElement("i");
                      arrow.classList.add("sort-asc");
                      th.appendChild(document.createTextNode(val))
                      th.appendChild(arrow);
                      firstTr.appendChild(th);
                      th.onclick =function(value)
                      {
                          makeSomething(data,this.innerText,this);
                       }  ;
                     })
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
   var child = sth.children[0];
  
   if(child.classList.contains("sort-asc"))
   {
    sort ="desc";
    child.classList.remove("sort-asc");
    child.classList.add("sort-desc");
   }
    else
     {
        sort ="asc";
        child.classList.add("sort-asc");
        child.classList.remove("sort-desc");
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

    function filter(){
      var filter = document.getElementById("filter-popup-button");
      var form = document.createElement("form");
      form.setAttribute("id","id-form");
      form.style.width = "300px";
      form.style.height ="320px";
      form.style.zIndex = 2;
      form.style.position = "fixed";
      form.style.backgroundColor = "#fff9f9";
      form.style.display ="none";
      form.style.flexFlow = "column";
      form.style.borderRadius = "20px";
      form.style.justifyContent="center"
      form.style.alignItems="center";
      form.addEventListener('submit', sendParametersToServer);

      filter.appendChild(form);
      var attributes = document.getElementsByTagName("thead");
      var headerValues =attributes[0].children[0].cells;
      for(var i = 0 ; i< headerValues.length; i++) {
        var text = headerValues[i].innerText;         
      var label = document.createElement("label");
      label.setAttribute("for",text);
      label.innerText = text;
      var input = document.createElement("input");
      input.setAttribute("id",text);
      input.name = text;
      input.type = text; 
      input.style.borderRadius="20px"
      input.style.width="100px";
      input.style.height="20px";
      input.size="4"
      label.style.padding ="5px";
      form.appendChild(label);
      form.appendChild(input);

        }

        buttonForm = document.createElement("button");
        buttonForm.setAttribute("id","button-form-submit");
        buttonForm.style.width="50px";
        buttonForm.style.height="30px";
        form.appendChild(buttonForm);

    }
    function buttonFormAppear()
    {
     var form = document.getElementById("id-form");
      form.style.display="flex";
      window.addEventListener("click",handleClicks);
    }

    function logSubmit(event) {
      log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    }

    function sendParametersToServer(event)
    {
      var url = "http://127.0.0.1:3000/api/v1/cars/by?";
      console.log("Bianca it works!");
      event.preventDefault();
     var form =  document.getElementById("id-form");
     for( var x = 0; x < form.elements.length - 1; x++)
      {
        console.log(form.elements[x].name); 
       if(form.elements[x].value) url = url + form.elements[x].name + "="+form.elements[x].value + "&";
     }
     url = url.substr(0,url.length-1);
     console.log(url);
   
     updateTable(url);
    }

    function updateTable(url)
    {
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        storeData(data);})
      .catch(function(error) {
          console.log('Request failed', error);
        });
  
      
    }

     function handleClicks(event) {
      var form = document.getElementById("id-form");
      if(event.target.tagName !="FORM" && event.target.alt != "filter-popup"&& event.target.parentNode.tagName != "FORM" ||event.target.id=="button-form-submit"){
        form.style.display= "none";
        window.removeEventListener("click",handleClicks);

      }
    }