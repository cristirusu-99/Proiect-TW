import { Car } from "../models/Car";
import { Provides } from "typescript-ioc";
<<<<<<< HEAD

=======
import { ICarRepository } from "./ICarRepository";
>>>>>>> master
import { Typegoose } from "typegoose";
import * as mongoose from 'mongoose';
import { config } from "../config";
import { json } from "body-parser";
import { Db } from "mongodb";
import { MyMongo } from "./MyMongoDB";
<<<<<<< HEAD

=======
@Provides(ICarRepository)
>>>>>>> master
export class CarRepository {
    private ObjectId;
    private database: MyMongo;
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        this.database = new MyMongo("CarsDatabase", "Car");
    }
    //GET
    public getAll(): Promise<Car[]> {
        return this.database.query({});
    }

    public getById(id: string): Promise<Car[]> {
        return this.database.query(this.ObjectId(id));
    }

    public getBy(input): Promise<Car[]> {
        return this.database.query(input);
    }

    public getCount(input): Promise<Number> {
        return this.database.count(input);
    }


    //POST
    public addOne(newCar): Promise<boolean> {
        return this.database.addOne(newCar)
    }

    public addMany(newCars : Car[]): Promise<boolean> {
        return this.database.addMany(newCars)
    }

    public update(id: string, document: any): Promise<Car[]> {
        //   return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
        return  this.database.query("{}");
    }

    //DELETE
    public delete(input): Promise<boolean> {
        //   db.Car.deleteMany({JUDET: "PLM"})
        return  this.database.delete(input);
    }

    
}