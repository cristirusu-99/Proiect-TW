import {API} from "./constants/constants.js";

let timeOut;
let repeater;

async function onLoginSubmit(event) {
    event.preventDefault();
    console.log("Blablalba");
    //////
    let obj = {};
    obj.myFirstName = "some name"
    obj.foo = 'Another name';
    for (let key in obj)
        console.log(key + ': ' + obj[key]);
    /////
    let verify = await verifyIfValid();
    console.log(verify)
    if (verify) {
        document.getElementsByClassName("bg-modal")[0].remove();
        renderSections();
        document.getElementById("create-post").addEventListener("click", createPostAndDeleteForm);
        document.getElementById("create-select").addEventListener("click", createPostAndDeleteForm);
        document.getElementById("create-put").addEventListener("click", createPostAndDeleteForm);
        document.getElementById("create-delete").addEventListener("click", createPostAndDeleteForm);

        let url = API.ADMIN_API + "getsessiontoken?USERNAME=" + sessionStorage.getItem("username");
        sessionStorage.setItem("sessionToken",
            await fetch(url)
                .then((response) => {
                    let ret = response.json();
                    return ret;
                })
                .then((data) => {
                    timeOut = Number.parseInt(data.timeout);
                    repeater = window.setInterval(updateSessionToken, timeOut);
                    return data.sessionToken;
                }));
        sessionStorage.setItem("lastSessionTokenDate", Date.now().toString())
    } else {
        alert("Nume sau parola gresit/a!");
    }
}

async function updateSessionToken() {
    let url = API.ADMIN_API + "getsessiontoken?USERNAME=" + sessionStorage.getItem("username");
    sessionStorage.setItem("sessionToken",
        await fetch(url)
            .then((response) => {
                let ret = response.json();
                return ret;
            })
            .then((data) => {
                timeOut = Number.parseInt(data.timeout);
                window.clearInterval(repeater);
                repeater = window.setInterval(updateSessionToken, timeOut);
                return data.sessionToken;
            }));
    sessionStorage.setItem("lastSessionTokenDate", Date.now().toString())
}

function getSessionToken() {
    return sessionStorage.getItem("sessionToken");
}

function verifyIfValid() {
    // document.getElementsByClassName("bg-modal")[0].remove();
    //cod de scris , se face remove la popup si la tot containerul ce contine popup ul
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    sessionStorage.setItem("username", username);
    let url = API.ADMIN_API + "login";
    let body = {user: username, password: password};
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((response) => {
        return response.status === 200;
    })
}

function renderSections() {
    renderSectionForPost();
    renderSectionForPutSelect();
    renderSectionForPutUpdate()
    renderSectionForDelete();
}


function renderSectionForPost() {
    renderSpecificSection("post-section", "button", "create-post", "Creeaza o noua resursa!");
    //blabla
}

function renderSectionForPutSelect() {
    renderSpecificSection("put-section", "button", "create-select", "Selecteaza criteriile de modificare!");
    //blabla
}

function renderSectionForPutUpdate() {
    renderSpecificSection("put-section", "button", "create-put", "Modifica resurse!");
    //blabla
}

function renderSectionForDelete() {
    renderSpecificSection("delete-section", "button", "create-delete", "Sterge o resursa existenta!");
    //blabla
}

function renderSpecificSection(idName, buttonName, buttonId, textInButton) {
    let section = document.getElementById(idName);
    let button = document.createElement(buttonName);
    button.innerText = textInButton;
    if (idName === "put-section") {
        button.setAttribute("class", "sections-for-admin-put");
    } else {
        button.setAttribute("class", "sections-for-admin-post-delete");
    }
    button.setAttribute("id", buttonId);
    section.appendChild(button);
}

function getButtonId(buttonText) {
    switch (buttonText) {
        case "Creeaza":
            return "post";
        case "Selecteaza":
            return "select";
        case "Modifica":
            return "put";
        case "Sterge":
            return "delete";
        default :
            return "";
    }
}

function getButtonFunction(buttonId) {
    switch (buttonId) {
        case "submit-post":
            return addResource;
        case "submit-put":
            return updateResources;
        case "submit-delete":
            return deleteResources;
        default:
            return null;
    }
}

function createPostAndDeleteForm(event) {
    let title = document.createElement("h1");
    let buttonSubmitForm = document.createElement("button");
    let wordToPutOnButton = event.currentTarget.outerText;
    buttonSubmitForm.innerText = wordToPutOnButton.substring(0, wordToPutOnButton.indexOf(" "));
    buttonSubmitForm.setAttribute("id", "submit-" + getButtonId(buttonSubmitForm.innerText));
    title.innerText = event.currentTarget.innerText;
    let sectionForSpecificForm = event.target.parentElement;
    event.target.remove();
    let form = document.createElement("form");
    form.setAttribute("id", getButtonId(buttonSubmitForm.innerText))
    form.appendChild(title);
    createSpecificForm(form);
    //section.removeChild(button);
    sectionForSpecificForm.appendChild(form);
    form.appendChild(buttonSubmitForm);
    document.getElementById(buttonSubmitForm.getAttribute("id"))
        .addEventListener("click", getButtonFunction(buttonSubmitForm.getAttribute("id")))
}

function createSpecificForm(form) {
    let fieldsForCar = ["An", "Judet", "Categorie Nationala", "Categorie comunitara", "Marca", "Descriere comerciala", "Total Vehicule"];
    for (let i = 0; i < 7; i++) {
        let input = document.createElement("input");
        input.setAttribute("id", fieldsForCar[i].toLowerCase().replace(/ /g, "-")
            + "-" + form.getAttribute("id"));
        input.setAttribute("class", "login-input");
        input.setAttribute("placeholder", fieldsForCar[i]);
        form.appendChild(input);
    }

    form.setAttribute("class", "login-form")


}

async function generateBody(criteria) {
    let an = document.getElementById("an-" + criteria).value;
    let judet = document.getElementById("judet-" + criteria).value;
    let cn = document.getElementById("categorie-nationala-" + criteria).value;
    let cc = document.getElementById("categorie-comunitara-" + criteria).value;
    let marca = document.getElementById("marca-" + criteria).value;
    let dc = document.getElementById("descriere-comerciala-" + criteria).value;
    let tv = document.getElementById("total-vehicule-" + criteria).value;
    // let data = {
    //     AN: an,
    //     JUDET: judet,
    //     CATEGORIENATIONALA: cn,
    //     CATEGORIECOMUNITARA: cc,
    //     MARCA: marca,
    //     DESCRIERECOMERCIALA: dc,
    //     TOTALVEHICULE: tv
    // };
    let data = {};
    if (an !== "") data.AN = Number.parseInt(an);
    if (judet !== "") data.JUDET = judet;
    if (cn !== "") data.CATEGORIENATIONALA = cn;
    if (cc !== "") data.CATEGORIECOMUNITARA = cc;
    if (marca !== "") data.MARCA = marca;
    if (dc !== "") data.DESCRIERECOMERCIALA = dc;
    if (tv !== "") data.TOTALVEHICULE = Number.parseInt(tv);
    console.log(JSON.stringify(data));
    let obj;
    if (criteria === "post") {
        obj = {
            user: sessionStorage.getItem("username"),
            sessionToken: getSessionToken(),
            toPost: data
        }
    } else {
        obj = {
            user: sessionStorage.getItem("username"),
            sessionToken: getSessionToken(),
            toUpdate: {$set: data}
        }
    }
    return obj;
}

async function addResource(event) {
    console.log("Add Res!");
    let body = await generateBody("post")
    console.log(JSON.stringify(body));
    let url = API.ADMIN_API + "addone";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((response) => {
        alert("Operatie finalizata cu cod: " + response.status);
    });
    event.preventDefault();
}

async function updateResources(event) {
    console.log("Update Res!");
    let updateCriteria = generateSelectURL("select");
    console.log(updateCriteria);
    let url = API.ADMIN_API + "update?" + updateCriteria;
    let body = await generateBody("put");
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((response) => {
        alert("Operatie finalizata cu cod: " + response.status);
    });
    event.preventDefault();
}

function generateSelectURL(criteria) {
    let an = document.getElementById("an-" + criteria).value;
    let judet = document.getElementById("judet-" + criteria).value;
    let cn = document.getElementById("categorie-nationala-" + criteria).value;
    let cc = document.getElementById("categorie-comunitara-" + criteria).value;
    let marca = document.getElementById("marca-" + criteria).value;
    let dc = document.getElementById("descriere-comerciala-" + criteria).value;
    let tv = document.getElementById("total-vehicule-" + criteria).value;
    let obj = {
        AN: an,
        JUDET: judet,
        CATEGORIENATIONALA: cn,
        CATEGORIECOMUNITARA: cc,
        MARCA: marca,
        DESCRIERECOMERCIALA: dc,
        TOTALVEHICULE: tv
    };
    let selectCriteria = "";
    for (let key in obj) {
        if (obj[key] !== "") {
            selectCriteria += "&" + key + "=" + obj[key];
        }
    }
    return selectCriteria.substring(1);
}

async function deleteResources(event) {
    console.log("Delete Res!");
    let body = {
        user: sessionStorage.getItem("username"),
        sessionToken: getSessionToken()
    };
    console.log(JSON.stringify(body));
    let deleteCriteria = generateSelectURL("delete");
    console.log(deleteCriteria);
    let url = API.ADMIN_API + "delete?" + deleteCriteria;
    console.log(url);
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((response) => {
        alert("Operatie finalizata cu cod: " + response.status);
    });
    event.preventDefault();
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("button-submit").addEventListener("click", onLoginSubmit);
});