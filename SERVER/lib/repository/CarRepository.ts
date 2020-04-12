import { Car } from "../models/Car";
import { Provides } from "typescript-ioc";
import { ICarRepository } from "./ICarRepository";
import { Typegoose } from "typegoose";
import * as mongoose from 'mongoose';
import { config } from "../config";
import { json } from "body-parser";
import { Db } from "mongodb";
@Provides(ICarRepository)
export class CarRepository  {

    private MongoClient;
    private url;// 'mongodb://localhost:27017'
    constructor() {
        const { db: { host, port, name } } = config;    
        this.url = 'mongodb' + "://" + host + ':' + port + '/' + name;

    }

    private async querry(params) :Promise<Car[]> {
        let client,db;
        this.MongoClient = require('mongodb').MongoClient;
        try {     
            client = await this.MongoClient.connect(this.url, {useNewUrlParser: true});
            db = client.db("CarsDatabase");
            let dColectie = db.collection('Car');
            let result = await dColectie.find(params);
            let v =  await result.toArray() ;
            return v;
        }
        catch(err) {
            console.error(err);
        }
        finally{ client.close() };
    }

    public getAll(): Promise< Car[]> {
        let a = "DAC" ;
        return this.querry({MARCA : a}) ;
    }

    public getById(id: string): Promise< Car[]> {
      //  return this.CarModel.findById(id).exec();
      return this.querry("{}") ;
    }

    public add(document: Car): Promise< Car[]> {
      //  let newCar = new this.CarModel(document);
       // return newCar.save();
       return this.querry("{}") ;
    }

    public update(id: string, document: any):  Promise< Car[]> {
     //   return this.CarModel.findByIdAndUpdate(id, document, { new: true }).exec();
     return this.querry("{}") ;
    }

    public delete(id: string): Promise< Car[]> {
    //    return this.CarModel.findByIdAndRemove(id).exec();
    return this.querry("{}") ;
    }

    public getCarByJudet(cityName: string):  Promise< Car[]> {
    //    return this.CarModel.find({ city: cityName }).exec();
    return this.querry("{}") ;
    }
}