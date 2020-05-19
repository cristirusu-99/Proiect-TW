"use strict";
<<<<<<< HEAD
Object.defineProperty(exports, "__esModule", { value: true });
const MyMongoDB_1 = require("./MyMongoDB");
class CarRepository {
=======
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const ICarRepository_1 = require("./ICarRepository");
const MyMongoDB_1 = require("./MyMongoDB");
let CarRepository = class CarRepository {
>>>>>>> master
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        this.database = new MyMongoDB_1.MyMongo("CarsDatabase", "Car");
    }
    //GET
    getAll() {
        return this.database.query({});
    }
    getById(id) {
        return this.database.query(this.ObjectId(id));
    }
    getBy(input) {
        return this.database.query(input);
    }
    getCount(input) {
        return this.database.count(input);
    }
    //POST
    addOne(newCar) {
        return this.database.addOne(newCar);
    }
    addMany(newCars) {
        return this.database.addMany(newCars);
    }
    update(id, document) {
        //   return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
        return this.database.query("{}");
    }
    //DELETE
    delete(input) {
        //   db.Car.deleteMany({JUDET: "PLM"})
        return this.database.delete(input);
    }
<<<<<<< HEAD
}
=======
};
CarRepository = __decorate([
    typescript_ioc_1.Provides(ICarRepository_1.ICarRepository),
    __metadata("design:paramtypes", [])
], CarRepository);
>>>>>>> master
exports.CarRepository = CarRepository;
//# sourceMappingURL=CarRepository.js.map