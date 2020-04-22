"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const typescript_ioc_1 = require("typescript-ioc");
const ICarRepository_1 = require("./ICarRepository");
const config_1 = require("../config");
let CarRepository = class CarRepository {
    constructor() {
        const { db: { host, port, name } } = config_1.config;
        this.url = 'mongodb' + "://" + host + ':' + port + '/' + name;
        this.ObjectId = require('mongodb').ObjectId;
    }
    querry(params, param2 = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let client, db;
            this.MongoClient = require('mongodb').MongoClient;
            try {
                client = yield this.MongoClient.connect(this.url, { useNewUrlParser: true });
                db = client.db("CarsDatabase");
                let dColectie = db.collection('Car');
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
            (yield this.querry(params, { TOTALVEHICULE: 1, _id: 0 })).forEach(element => {
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
    //GET
    getAll() {
        return this.querry({});
    }
    getById(id) {
        return this.querry(this.ObjectId(id));
    }
    getBy(input) {
        return this.querry(input);
    }
    getCount(input) {
        return this.count(input);
    }
    add(document) {
        //  let newCar = new this.CarModel(document);
        // return newCar.save();
        return this.querry("{}");
    }
    //POST
    update(id, document) {
        //   return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
        return this.querry("{}");
    }
    //DELETE
    delete(id) {
        //    return this.CarModel.findByIdAndRemove(id).exec();
        return this.querry("{}");
    }
};
CarRepository = __decorate([
    typescript_ioc_1.Provides(ICarRepository_1.ICarRepository),
    __metadata("design:paramtypes", [])
], CarRepository);
exports.CarRepository = CarRepository;
//# sourceMappingURL=CarRepository.js.map