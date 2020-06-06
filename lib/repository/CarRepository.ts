import { Car } from "../models/Car";
import { MyMongo } from "./MyMongoDB";

export class CarRepository {
    private ObjectId;
    private carModel;
    private static database: MyMongo<Car>;
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        this.carModel = new Car().getModelForClass(Car);
        if (CarRepository.database == undefined)
            CarRepository.database = new MyMongo("CarsDatabase", "Car");
    }
    //GET
    public getAll(): Promise<Car[]> {
        return CarRepository.database.query<Car>({});
    }

    public getById(id): Promise<Car[]> {
        return CarRepository.database.query<Car>(this.ObjectId(id));
    }

    public getBy(input, field = {}, sort = {}): Promise<Car[]> {
        return CarRepository.database.query(input, field, sort);
    }

    public getCount(input, field = {}, sort = {}): Promise<Number> {
        return CarRepository.database.count(input);
    }


    //POST
    public addOne(newCar): Promise<boolean> {
        return CarRepository.database.addOne(newCar)
    }

    public addMany(newCars: Car[]): Promise<boolean> {
        return CarRepository.database.addMany(newCars)
    }

    public update(queryParams: any, document: any): Promise<boolean> {
        //   return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
        // return CarRepository.database.query("{}");
        return CarRepository.database.update(queryParams, document);
    }

    //DELETE
    public delete(input): Promise<boolean> {
        //   db.Car.deleteMany({JUDET: "GALATI"})
        return CarRepository.database.delete(input);
    }


}