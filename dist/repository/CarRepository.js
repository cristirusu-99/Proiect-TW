"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = require("../models/Car");
const MyMongoDB_1 = require("./MyMongoDB");
class CarRepository {
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        this.carModel = new Car_1.Car().getModelForClass(Car_1.Car);
        if (CarRepository.database == undefined)
            CarRepository.database = new MyMongoDB_1.MyMongo("CarsDatabase", "Car");
    }
    //GET
    getAll() {
        return CarRepository.database.query({});
    }
    getById(id) {
        return CarRepository.database.query(this.ObjectId(id));
    }
    getBy(input, field = {}, sort = {}) {
        return CarRepository.database.query(input, field, sort);
    }
    getCount(input, field = {}, sort = {}) {
        return CarRepository.database.count(input);
    }
    //POST
    addOne(newCar) {
        return CarRepository.database.addOne(newCar);
    }
    addMany(newCars) {
        return CarRepository.database.addMany(newCars);
    }
    update(id, document) {
        //   return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
        return CarRepository.database.query("{}");
    }
    //DELETE
    delete(input) {
        //   db.Car.deleteMany({JUDET: "GALATI"})
        return CarRepository.database.delete(input);
    }
}
exports.CarRepository = CarRepository;
//# sourceMappingURL=CarRepository.js.map