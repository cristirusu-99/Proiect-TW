const SERVER = {
    WEB_ADRESS: "http://proiectul-ala-smecher-la-tw.herokuapp.com",
    LOCAL_ADRESS: "http://127.0.0.1:3000",
    ADRESS: "http://127.0.0.1:3000"
};
const API = {
    CARS_API: SERVER.WEB_ADRESS + "/api/v1/cars/",
    ADMIN_API: SERVER.WEB_ADRESS + "/api/v1/admin/"
};

const URL_KEY_WORDS = {
    ORDERBY: "ORDER_BY_",
    FIELD: "FIELD_",
    ID: "_id",
    AND: "&",
    EQUAL: "=",
    BY: "by?"
};
const WEB_ADDRES = {
    GEOCODE: "https://maps.googleapis.com/maps/api/geocode/json",

}
const
    VALUES = {
        GOOGLE_API_KEY: "AIzaSyAn1ZLNOz98u9Osh41DfcoC8bmM8TLzRoU"
    }


const URL = API.CARS_API + "by?JUDET=GALATI";
const RAWURL = API.CARS_API;
const ORDERBY = "ORDER_BY_";
const FIELD = "FIELD_";
const ID = "_id";
const AND = "&";
const EQUAL = "=";
const BY = "by?";

const translationColumnTables = {
   CATEGORIENATIONALA: "Categorie Nationala",
   CATEGORIECOMUNITARA: "Categorie Comunitara",
   JUDET: "Judet",
   MARCA: "Marca",
   TOTALVEHICULE: "Total Vehicule",
   DESCRIERECOMERCIALA: "Descriere",
   AN:"An"

}

export {
    SERVER,
    API,
    URL_KEY_WORDS,
    WEB_ADDRES,
    VALUES,
    URL, ORDERBY, FIELD, EQUAL, BY, ID, AND, RAWURL, translationColumnTables
};
 
 
