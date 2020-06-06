 function onClickFilterButton()
    {
     var form = document.getElementById("id-form");
     if (form != null)
      form.style.display="flex";
      window.addEventListener("click",handleClicks);
    }

    function handleClicks(event) {
        var form = document.getElementById("id-form");
        if(event.target.tagName !="FORM" && event.target.tagName != "BUTTON" && event.target.alt != "filter-popup-button" && event.target.parentNode.tagName != "FORM" ||event.target.id=="button-form-submit"){
          if(form != undefined)
          form.style.display= "none";
          window.removeEventListener("click",handleClicks);
  
        }
      }