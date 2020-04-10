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
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = require("../models/Car");
const typescript_ioc_1 = require("typescript-ioc");
const ICarRepository_1 = require("./ICarRepository");
let CarRepository = class CarRepository {
    constructor() {
        this.CarModel = new Car_1.Car().getModelForClass(Car_1.Car);
    }
    getAll() {
        return this.CarModel.find().exec();
    }
    getById(id) {
        return this.CarModel.findById(id).exec();
    }
    add(document) {
        let newCar = new this.CarModel(document);
        return newCar.save();
    }
    update(id, document) {
        return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }
    delete(id) {
        return this.CarModel.findByIdAndRemove(id).exec();
    }
    getCarByJudet(cityName) {
        return this.CarModel.find({ city: cityName }).exec();
    }
};
CarRepository = __decorate([
    typescript_ioc_1.Provides(ICarRepository_1.ICarRepository),
    __metadata("design:paramtypes", [])
], CarRepository);
exports.CarRepository = CarRepository;
//# sourceMappingURL=CarRepository.js.map