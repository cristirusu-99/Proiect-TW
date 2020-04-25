window.onload = function(){
    this.buildpage();
}

function buildpage()
{
    var header = document.createElement("header");

    //put logo
  var logo =  document.createElement("a");
  logo.href= ".\\index.html";
  var imageForLogo = document.createElement("img");
  imageForLogo.className = "logo";
  imageForLogo.setAttribute("src","../assets/logo.png" );
  imageForLogo.setAttribute("alt","logo");
  logo.appendChild(imageForLogo);
  header.appendChild(logo);
  var pageNames = [".\\index.html",".\\parkdates.html",".\\statistics.html",".\\mapMarker.html"];
  var linkText = ["Vizualizare date parcuri de masini","Vizualizare statistici","Harta"]
  var links=[];
  var a= [];
  var navLinksContainer = document.createElement("nav");
  var navLinks = document.createElement("ul");
  navLinks.className = "navLinks";
  for(var i = 0; i < 3; i++)
   { 
    links[i] = document.createElement("li");
    a[i]= document.createElement("a");
    a[i].href= pageNames[i+1];
    a[i].innerText = linkText[i];
    links[i].appendChild(a[i]);
    navLinks.appendChild(links[i]);
   }
   links[i] = document.createElement("li");
   var div = document.createElement("div");
   div.className = "Navlinks search-box";
   var searchInput = document.createElement("input");
   searchInput.placeholder = "Ce vrei sa cauti?";
   searchInput.setAttribute("id","search-box");
   searchInput.type = "text";
   div.appendChild(searchInput);
   links[i].appendChild(div);
   navLinks.appendChild(links[i]);
   navLinksContainer.appendChild(navLinks);
   header.appendChild(navLinksContainer);
   
   var contact = document.createElement("a");
   contact.className = "cta";
   contact.innerText = "Contact";
   header.appendChild(contact);
  var body = document.getElementsByTagName("body")[0];
  body.insertBefore(header,body.firstChild);
}
