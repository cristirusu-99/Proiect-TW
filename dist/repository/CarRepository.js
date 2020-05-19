"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MyMongoDB_1 = require("./MyMongoDB");
class CarRepository {
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
}
exports.CarRepository = CarRepository;
//# sourceMappingURL=CarRepository.js.map