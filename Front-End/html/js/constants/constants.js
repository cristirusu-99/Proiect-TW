
 
   const URL = "http://127.0.0.1:3000/api/v1/cars/by?JUDET=GALATI";
   const RAWURL = "http://127.0.0.1:3000/api/v1/cars/";
   const ORDERBY = "ORDER_BY_";
   const FIELD = "FIELD_";
   const ID = "_id";
   const AND = "&";
   const  EQUAL = "=";
   const  BY = "by?";

    let translationColumnTables = {
        CATEGORIENATIONALA :"Categorie Nationala",
        CATEGORIECOMUNITARA :"Categorie Comunitara",
        JUDET:"Judet",
        MARCA: "Marca",
        TOTALVEHICULE: "Total Vehicule",
        DESCRIERECOMERCIALA: "Categorie Comerciala",

    }
        
export {URL,ORDERBY,FIELD,EQUAL,BY,ID,AND,RAWURL,translationColumnTables};

