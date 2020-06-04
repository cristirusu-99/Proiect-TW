import * as Constants from "./constants/constants.js"
var actualUrl = Constants.URL;

window.addEventListener('DOMContentLoaded', (event) => {
    getAllDates(filter);
  });

  function  getAllDates(filter){
    var dataFromGet = [];
    var url = Constants.URL;
    fetch(url)
    .then((response) => {
      return  response.json();
    })
    .then((data) => {
      document.getElementById("pre-load").style = "display:none";
      document.getElementById("filter-popup-button").style="display:initial";
      retrieveColumnNames(data);
      filter();})
    .catch(function(error) {
        console.log('Request failed', error);
      });
  }


  function retrieveColumnNames(data)
  {
    var dataFromGet = data[0];
    var headerTable = Object.keys(dataFromGet);   
    prepareTableWithdata(data,headerTable,data.length);

  }

  function putArrowForSortAscDesc(header,principalRowTable,data)
  {
    header.filter(val => val != Constants.ID)
    .forEach( val =>{
                     var th = document.createElement("th");
                     var arrow = document.createElement("i");
                     arrow.classList.add("sort-asc");
                     arrow.style="display:none";
                     th.appendChild(document.createTextNode(Constants.translationColumnTables[val]))
                     th.appendChild(arrow);
                     principalRowTable.appendChild(th);
                     th.onclick =function(value)
                     {
                         createFullTable(data,this.innerText,this,"sort-asc");
                      }  ;
                    })
  }

  function prepareTableWithdata(data, header,counts){
     var element = document.getElementById('data-table');
     var table = document.createElement("table");
     table.setAttribute("id","table-data");
     var tableBody = document.createElement("tbody");
     tableBody.setAttribute("id","table-body");

     var headTable = document.createElement("thead");
     var firstTr = document.createElement("tr");
    
     putArrowForSortAscDesc(header,firstTr,data);
    headTable.appendChild(firstTr);
    table.appendChild(headTable);
    createBodyTable(element,tableBody,table,data,data.length);
  }

 function createBodyTable(element,tableBody,table,data,counts){   
    for( var i = 1 ; i < counts; i++){
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



  function createFullTable(data,nodeValue,sth,sort){
   var child = sth.children[0];
   var sorttype;
   var headTableCells =document.getElementsByTagName("thead")[0].children[0].cells;
   for(var i=0; i<6; i++)
    headTableCells[i].children[0].style ="visibility:hidden";
    child.style = "visibility:visible";
   if(child.classList.contains("sort-asc"))
   { 
     sorttype = -1;
    sort ="desc";
    child.classList.remove("sort-asc");
    child.classList.add("sort-desc");
   }
    else
     {
       sorttype = 1;
        sort ="asc";
        child.classList.add("sort-asc");
        child.classList.remove("sort-desc");
       }
     var element = document.getElementById('data-table');
     var table = document.getElementById("table-data");
     var tableBody = document.getElementById("table-body");
     if(tableBody != null)
      table.removeChild(tableBody);
    var tableBody = document.createElement("tbody");
    tableBody.setAttribute("id","table-body");
     var headTable = document.getElementsByTagName("thead");
     var translatedBackValue = getKeyByValue(Constants.translationColumnTables,nodeValue)
      actualUrl = createUrlWithParameters(actualUrl, translatedBackValue,sorttype); 
     updateTable(actualUrl);
    }

    function createUrlWithParameters(actualUrl,nodeValue,valueOrder){

      if(actualUrl.includes(nodeValue))
      {   
        var oldValueOrder;
        if(valueOrder == -1)
          oldValueOrder = 1;
        else oldValueOrder = -1;
        
          var actualUrl = actualUrl.replace(nodeValue+Constants.EQUAL + oldValueOrder,nodeValue+Constants.EQUAL + valueOrder);
      }
      else
          actualUrl =  actualUrl + Constants.AND+Constants.ORDERBY+nodeValue+ Constants.EQUAL + valueOrder;
          return actualUrl;
    }
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    function filter(){
      var filter = document.getElementById("filter-popup-button");
      var form = document.createElement("form");
      form.setAttribute("id","id-form");
      form.style.width = "300px";
      form.style.height ="320px";
      form.style.zIndex = 2;
      form.style.position = "fixed";
      form.style.backgroundColor = "rgba(0, 136, 169, 1)";
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
      input.style.textAlign = "center";
      input.style.borderRadius="20px"
      input.style.width="100px";
      input.style.height="20px";
      input.size="4"
      label.style.padding ="5px";
      form.appendChild(label);
      form.appendChild(input);
      }

       var buttonForm = document.createElement("button");
        buttonForm.setAttribute("id","button-form-submit");
        buttonForm.style.width = "50px";
        buttonForm.style.height ="30px";
        buttonForm.style.backgroundColor = "#24252a";
        buttonForm.style.borderColor = "#24252a";
        buttonForm.style.margin = "5px";
        buttonForm.style.color = "white"
        buttonForm.textContent = "Submit";
        form.appendChild(buttonForm);

    }    

    
    function logSubmit(event) {
      log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    }

    function sendParametersToServer(event)
    {
     
      console.log("Bianca it works!");
      event.preventDefault();
      var url = Constants.RAWURL +Constants.BY;
      var form =  document.getElementById("id-form");
     for( var x = 0; x < form.elements.length - 1; x++)
      {
        var name = form.elements[x].name;
        var valueForName = form.elements[x].value;
       if(valueForName) 
       {
        if(name == "Categorie Comunitara")
          valueForName +="  ";
        url = url + getKeyByValue(Constants.translationColumnTables,name) + Constants.EQUAL +valueForName+ Constants.AND;

       }
     }
     url = url.substr(0,url.length-1);    
     url = encodeURI(url);
     console.log(url);
     updateTable(url);
    }

    function updateTable(url)
    { actualUrl = url;
      document.getElementById("pre-load").style = "display:flex";
      document.getElementById("filter-popup-button").style="display:none";

      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById("pre-load").style = "display:none";
        document.getElementById("filter-popup-button").style="display:initial";
         var element = document.getElementById('data-table');
         var table = document.getElementById("table-data");
         var tableBody = document.getElementById("table-body");
         if(tableBody != null){
          table.removeChild(tableBody);
          tableBody.remove();
         }
        
         
           tableBody = document.createElement("tbody");
           tableBody.setAttribute("id","table-body");
           table.appendChild(tableBody);

         createBodyTable(element,tableBody,table,data,data.length);
        })
      .catch(function(error) {
          console.log('Request failed', error);
        });
  
      
    }

   