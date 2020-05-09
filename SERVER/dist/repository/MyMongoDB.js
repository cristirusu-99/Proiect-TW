"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
class MyMongo {
    constructor(database, table) {
        const { db: { host, port, name } } = config_1.config;
        this.url = 'mongodb' + "://" + host + ':' + port + '/' + name;
        this.database = database;
        this.table = table;
    }
    query(params, param2 = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let client, db;
            this.MongoClient = require('mongodb').MongoClient;
            try {
                client = yield this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
                db = client.db(this.database);
                let dColectie = db.collection(this.table);
                let result = yield dColectie.find(params, param2);
                let v = yield result.toArray();
                return v;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                client.close();
            }
            ;
        });
    }
    count(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var rez = 0;
            (yield this.query(params, { TOTALVEHICULE: 1, _id: 0 })).forEach(element => {
                if (element.TOTALVEHICULE != null && element.TOTALVEHICULE != "")
                    // if (element.TOTALVEHICULE.match(/[^0-9]/) == null ){ // pentru ca data base facut de romani 
                    rez = rez + parseInt(element.TOTALVEHICULE, 10);
                //    if( isNaN( parseInt(element.TOTALVEHICULE, 10) )) 
                //       console.log("Asta : \'" + element.TOTALVEHICULE + "\'");
                // }
            });
            return rez;
        });
    }
    update(params, param2 = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let client, db;
            this.MongoClient = require('mongodb').MongoClient;
            try {
                client = yield this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
                db = client.db(this.database);
                let dColectie = db.collection(this.table);
                let result = yield dColectie.update(params, param2);
                let v = yield result.toArray();
                return v;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                client.close();
            }
            ;
        });
    }
    addOne(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let client, db;
            this.MongoClient = require('mongodb').MongoClient;
            try {
                client = yield this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
                db = client.db(this.database);
                let dColectie = db.collection(this.table);
                let result = yield dColectie.insertOne(param);
                return true;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                client.close();
            }
            ;
        });
    }
    addMany(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let client, db;
            this.MongoClient = require('mongodb').MongoClient;
            try {
                client = yield this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
                db = client.db(this.database);
                let dColectie = db.collection(this.table);
                let result = yield dColectie.insertMany(param);
                return true;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                client.close();
            }
            ;
        });
    }
    delete(params, param2 = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let client, db;
            this.MongoClient = require('mongodb').MongoClient;
            try {
                client = yield this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
                db = client.db(this.database);
                let dColectie = db.collection(this.table);
                let result = yield dColectie.deleteMany(params);
                return true;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                client.close();
            }
            ;
        });
    }
}
exports.MyMongo = MyMongo;
//# sourceMappingURL=MyMongoDB.js.map