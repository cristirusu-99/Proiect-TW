import { Car } from "../models/Car";
import { Provides } from "typescript-ioc";
import { ICarRepository } from "./ICarRepository";

@Provides(ICarRepository)
export class CarRepository implements ICarRepository {

    private CarModel;

    constructor() {
        this.CarModel = new Car().getModelForClass(Car);
    }

    public getAll(): Promise<Car[]> {
        return this.CarModel.find().exec();
    }

    public getById(id: string): Promise<Car> {
        return this.CarModel.findById(id).exec();
    }

    public add(document: Car): Promise<Car> {
        let newCar = new this.CarModel(document);
        return newCar.save();
    }

    public update(id: string, document: any): Promise<Car> {
        return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Car> {
        return this.CarModel.findByIdAndRemove(id).exec();
    }

    public getCarByJudet(cityName: string): Promise<Car[]> {
        return this.CarModel.find({ city: cityName }).exec();
    }
}