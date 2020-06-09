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
class MyMongo {
    constructor(database, table) {
        this.database = database;
        this.table = table;
        this.url = process.env.MONGOLAB_URI || 'mongodb+srv://test:test@cluster0-3bxxk.mongodb.net/test';
    }
    static init(database) {
        return __awaiter(this, void 0, void 0, function* () {
            //mongodb+srv://<username>:<password>@cluster0-3bxxk.mongodb.net/test?retryWrites=true&w=majority
            let url = process.env.MONGOLAB_URI || 'mongodb+srv://test:test@cluster0-3bxxk.mongodb.net/test';
            yield MyMongo.db_connect(url, database);
        });
    }
    static db_connect(url, database) {
        return __awaiter(this, void 0, void 0, function* () {
            let MongoClient = require('mongodb').MongoClient;
            if (MyMongo.client == undefined) {
                MyMongo.client = yield MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
                MyMongo.db = MyMongo.client.db(database);
            }
        });
    }
    query(params, fields = {}, sortParams = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.nu_fa_nimic === "adevarat") {
                return [];
            }
            try {
                yield this.ifMongoNotOpen();
                this.dCollection = yield MyMongo.db.collection(this.table);
                let result = yield this.dCollection.find(params).project(fields).sort(sortParams);
                return yield result.toArray();
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    count(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let rez = 0;
            (yield this.query(params, { TOTALVEHICULE: 1, _id: 0 })).forEach(element => {
                if (element.TOTALVEHICULE)
                    rez = rez + element.TOTALVEHICULE;
            });
            return rez;
        });
    }
    update(params, param2 = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ifMongoNotOpen();
                this.dCollection = yield MyMongo.db.collection(this.table);
                yield this.dCollection.updateMany(params, param2);
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        });
    }
    addOne(param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ifMongoNotOpen();
                let dColectie = MyMongo.db.collection(this.table);
                yield dColectie.insertOne(param);
                return true;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    addMany(param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ifMongoNotOpen();
                let dColectie = MyMongo.db.collection(this.table);
                yield dColectie.insertMany(param);
                return true;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    delete(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ifMongoNotOpen();
                let dColectie = MyMongo.db.collection(this.table);
                yield dColectie.deleteMany(params);
                return true;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    ifMongoNotOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (MyMongo.client == undefined) {
                yield MyMongo.db_connect(this.url, this.database);
            }
        });
    }
}
exports.MyMongo = MyMongo;
//# sourceMappingURL=MyMongoDB.js.map