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
        removeLoadingAnimation();
        retrieveColumnNames(data);
        filter();})
    .catch(function(error) {
        console.log('Request failed', error);
      });
  }


function removeLoadingAnimation()
{
  document.getElementById("pre-load").style = "display:none";
  document.getElementById("filter-popup-button").style = "display:initial";
}



  function retrieveColumnNames(data)
  {
    var dataFromGet = data[0];
    var headerTable = Object.keys(dataFromGet);   
    prepareTableWithdata(data, headerTable, data.length);

  }

  function putArrowForSortAscDesc(header, principalRowTable, data)
  {
    header
    .filter(val => val != Constants.ID)
    .forEach( val =>{
                     createHeaderTableCell(principalRowTable, val, data);
                    })
  }

function createHeaderTableCell(principalRowTable, val, data)
{
  var th = document.createElement("th");
  var arrow = document.createElement("i");
 
  arrow.classList.add("sort-asc");
  arrow.style = "display:none";
  th.appendChild(document.createTextNode(Constants.translationColumnTables[val]))
  th.appendChild(arrow);
  principalRowTable.appendChild(th);
  
  th.onclick = function(value)
  {
      createFullTable(data, this.innerText, this, "sort-asc");
  };
}

  function prepareTableWithdata(data, header, counts)
  {
    var tableSection = document.getElementById('table-section');
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var headTable = document.createElement("thead");
    var firstTr = document.createElement("tr");
    
    table.setAttribute("id", "table-data");
    tableBody.setAttribute("id", "table-body");
    putArrowForSortAscDesc(header, firstTr, data);
    headTable.appendChild(firstTr);
    table.appendChild(headTable);
    
    createBodyTable(tableSection, tableBody, table, data, counts);
  }

 function createBodyTable(tableSection, tableBody, table, data, counts)
 {   
    for( var i = 1 ; i < counts; i++)
    {
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
 tableSection.appendChild(table);

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
     var element = document.getElementById('table-section');
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

    function filter()
    {
      var filter = document.getElementById("filter-popup-button");
      var form = createForm();
      var attributes = document.getElementsByTagName("thead");
      var headerValues =attributes[0].children[0].cells;

      form.addEventListener('submit', sendParametersToServer);
      filter.appendChild(form);
     
      
      for(var i = 0 ; i < headerValues.length; i++) 
      {
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

       var buttonForm = createButtonForm();      
       form.appendChild(buttonForm);

    }    

    function createForm()
    {
      var form = document.createElement("form");
      form.setAttribute("id", "id-form");
      setFormStyle(form);
     
      return form;
    }

    function setFormStyle(form)
    {
      setStyleToElement(form, "300px", "320px", "fixed", "", "rgba(0, 136, 169, 1)")
      form.style.zIndex = 2;
      form.style.display ="none";
      form.style.flexFlow = "column";
      form.style.borderRadius = "20px";
      form.style.justifyContent ="center"
      form.style.alignItems="center";
    }

    function createButtonForm()
    {
      var buttonForm = document.createElement("button");
         buttonForm.setAttribute("id", "button-form-submit");
      setButtonFormStyle(buttonForm);
      return buttonForm;
    }

    function setButtonFormStyle(buttonForm)
    {
      setStyleToElement(buttonForm, "50px", "30px", "","white","#24252a")
      buttonForm.style.borderColor = "#24252a";
      buttonForm.style.margin = "5px";
      buttonForm.textContent = "Submit";
    }


    function setStyleToElement(element, width, height, position, color, backgroundColor)
    {
      element.style.width = width;
      element.style.height = height;
      element.style.position = position;
      element.style.color = color;
      element.style.backgroundColor = backgroundColor;
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
      var flagCheckExistingInput = 0;
     for( var x = 0; x < form.elements.length - 1; x++)
      {
        var name = form.elements[x].name;
        var valueForName = form.elements[x].value;
       if(valueForName) 
       {
        flagCheckExistingInput = 1;
        if(name == "Categorie Comunitara")
          valueForName +="  ";
        url = url + getKeyByValue(Constants.translationColumnTables,name) + Constants.EQUAL +valueForName+ Constants.AND;

       }
     }
     if (flagCheckExistingInput == 0)
        url = Constants.RAWURL + "getall";
     else 
     {
        url = url.substr(0,url.length-1);    
        url = encodeURI(url);
     }
     console.log(url);
     
     updateTable(url);
    }

    function updateTable(url)
    { actualUrl = url;
      document.getElementById("pre-load").style = "display:flex";
      document.getElementById("filter-popup-button").style="display:none";
      document.getElementById("table-data").style = "visibility:hidden";

      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById("pre-load").style = "display:none";
        document.getElementById("filter-popup-button").style="display:initial";
        document.getElementById("table-data").style = "visibility:visible"
         var element = document.getElementById('table-section');
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
          document.getElementById("pre-load").style = "display:none";
          document.getElementById("filter-popup-button").style="display:initial";
          document.getElementById("table-data").style = "visibility:visible"
          alert("NU EXISTA NICI O MASINA CARE SA RESPECTE TOATE CERINTELE!");
        });
  
      
    }

   