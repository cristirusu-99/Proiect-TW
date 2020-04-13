import { Car } from "../models/Car";
import { Provides } from "typescript-ioc";
import { ICarRepository } from "./ICarRepository";
import { Typegoose } from "typegoose";
import * as mongoose from 'mongoose';
import { config } from "../config";
import { json } from "body-parser";
import { Db } from "mongodb";
@Provides(ICarRepository)
export class CarRepository {
    private ObjectId;
    private MongoClient;
    private url;// 'mongodb://localhost:27017'
    constructor() {
        const { db: { host, port, name } } = config;
        this.url = 'mongodb' + "://" + host + ':' + port + '/' + name;
        this.ObjectId = require('mongodb').ObjectId;
    }

    private async querry(params): Promise<Car[]> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useNewUrlParser: true });
            db = client.db("CarsDatabase");
            let dColectie = db.collection('Car');
            let result = await dColectie.find(params);
            let v = await result.toArray();
            return v;
        }
        catch (err) {
            console.error(err);
        }
        finally { client.close() };
    }
//GET
    public getAll(): Promise<Car[]> {
        return this.querry({});
    }

    public getById(id: string): Promise<Car[]> {
        return this.querry(this.ObjectId(id));
    }

    public getByJudet(judet: string): Promise<Car[]> { 
        return this.querry({JUDET : judet});
    }

    public add(document: Car): Promise<Car[]> {
        //  let newCar = new this.CarModel(document);
        // return newCar.save();
        return this.querry("{}");
    }
//POST
    public update(id: string, document: any): Promise<Car[]> {
        //   return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
        return this.querry("{}");
    }

//DELETE
    public delete(id: string): Promise<Car[]> {
        //    return this.CarModel.findByIdAndRemove(id).exec();
        return this.querry("{}");
    }


}