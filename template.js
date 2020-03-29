redirect = function() {
    window.location.href = "file:///D:/Facultate/Tehnologii%20Web/proiect%20tw/Proiect-TW/index.html";
  };

  var searchResult = document.getElementById("search-txt");
  var searchValue = searchResult? searchResult.value: []

  function search(context) {
    if(event.key === 'Enter' && context.value != [])  {
        alert(context.value);        
    }
}