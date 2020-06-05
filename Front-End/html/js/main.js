<<<<<<< Updated upstream
window.onload = function(){
    this.buildpage();
=======
window.onload = function () {
  this.buildpage();

  var mobileSideBar = document.getElementById('menu');
  mobileSideBar.addEventListener(
    "click", function () { document.getElementById('mobile-menu').style = "display:flex" });
>>>>>>> Stashed changes
}

function buildpage() {
  var header = document.createElement("header");

  //put logo
  var logo = document.createElement("a");
  logo.href = ".\\index.html";
  var imageForLogo = document.createElement("img");
  imageForLogo.className = "logo";
  imageForLogo.setAttribute("src", "../assets/logo.png");
  imageForLogo.setAttribute("alt", "logo");
  logo.appendChild(imageForLogo);
  header.appendChild(logo);
  var pageNames = [".\\index.html", ".\\parkdates.html", ".\\statistics.html", ".\\mapMarker.html"];
  var linkText = ["Vizualizare date parcuri de masini", "Vizualizare statistici", "Harta"]
  var links = [];
  var a = [];
  var navLinksContainer = document.createElement("nav");
  var navLinks = document.createElement("ul");
  navLinks.className = "navLinks";
  for (var i = 0; i < 3; i++) {
    links[i] = document.createElement("li");
    a[i] = document.createElement("a");
    a[i].href = pageNames[i + 1];
    a[i].innerText = linkText[i];
    links[i].appendChild(a[i]);
    navLinks.appendChild(links[i]);
<<<<<<< Updated upstream
   }
   navLinksContainer.appendChild(navLinks);
   header.appendChild(navLinksContainer);
   
   var contact = document.createElement("a");
   contact.className = "cta";
   contact.innerText = "Contact";
   header.appendChild(contact);
   var burgerMenu = document.createElement("p");
   burgerMenu.innerText = "Meniu";
   burgerMenu.className = "cta menu"
   header.appendChild(burgerMenu);
=======
  }
  navLinksContainer.appendChild(navLinks);
  header.appendChild(navLinksContainer);

  var contact = document.createElement("a");
  contact.id = "contact-button";
  contact.href = "#footer-id";
  contact.className = "cta";
  contact.innerText = "Contact";
  header.appendChild(contact);
  var burgerMenu = document.createElement("p");
  burgerMenu.innerText = "Meniu";
  burgerMenu.className = "cta"
  burgerMenu.id = "menu";
  header.appendChild(burgerMenu);
>>>>>>> Stashed changes
  var body = document.getElementsByTagName("body")[0];
  body.insertBefore(header, body.firstChild);
}
<<<<<<< Updated upstream
=======

function closeMenu() {
  document.getElementById('mobile-menu').style = "display:none";
}

>>>>>>> Stashed changes
