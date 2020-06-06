
function onLoginSubmit(event)
{   
    console.log("Blablalba");
    verifyIfValid();
}

function verifyIfValid()
{   
    document.getElementsByClassName("bg-modal")[0].remove();
    //cod de scris , se face remove la popup si la tot containerul ce contine popup ul
    renderSections()

}

function renderSections()
{
    renderSectionForPost();
    renderSectionForPut();
    renderSectionForDelete();
}


function renderSectionForPost()
{
    renderSpecificSection("post-section", "button", "Creeaza o noua resursa!");
    //blabla
}

function renderSectionForPut()
{
    renderSpecificSection("put-section", "button", "Modifica o resursa existenta!");
    //blabla
}

function renderSectionForDelete()
{
    renderSpecificSection("delete-section", "button", "Sterge o resursa existenta!");
    //blabla
}

function renderSpecificSection(idName, buttonName, textInButton)
{
    var section = document.getElementById(idName);
    var button = document.createElement(buttonName);
    button.innerText = textInButton;
    button.setAttribute("class","sections-for-admin");
    button.setAttribute("onclick","createForm(event)");
    section.appendChild(button);
   
}

function createForm(event)
{
    var title = document.createElement("h1");
    var buttonSubmitForm = document.createElement("button");
    var wordtoPutOnButton = event.currentTarget.outerText;
    buttonSubmitForm.innerText = wordtoPutOnButton.substring(0,wordtoPutOnButton.indexOf(" "));
    buttonSubmitForm.setAttribute("id","");
    title.innerText = event.currentTarget.innerText;
    var sectionForSpecificForm = event.target.parentElement;
    event.target.remove();
    var form = document.createElement("form");
    form.appendChild(title);
    createSpecificForm(form);
    //section.removeChild(button);
    sectionForSpecificForm.appendChild(form);
    form.appendChild(buttonSubmitForm);
}

function createSpecificForm(form)
{
    fieldsForCar= ["Judet","Categorie Nationala", "Categorie comunitare", "Descriere comerciala", "TotalVehicule"];
    for(var i = 0; i < 5; i++)
 {
    var input = document.createElement("input");
    input.setAttribute("class","login-input");
    input.setAttribute("placeholder",fieldsForCar[i]);
    form.appendChild(input);
 } 

 form.setAttribute("class","login-form")


    
}

