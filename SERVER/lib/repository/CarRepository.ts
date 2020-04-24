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

    private async querry(params,param2 = {}): Promise<Car[]> {
        let client, db; 
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db("CarsDatabase");
            let dColectie = db.collection('Car');
            let result = await dColectie.find(params,param2);
            let v = await result.toArray();
            return v;
        }
        catch (err) {
            console.error(err);
        }
        finally { client.close() };
    }


    public async count(params) : Promise<Number> {
       var rez = 0  ;
        (await this.querry(params ,{TOTALVEHICULE : 1 ,_id : 0})).forEach(element => {
            if (element.TOTALVEHICULE != null && element.TOTALVEHICULE != "")
               // if (element.TOTALVEHICULE.match(/[^0-9]/) == null ){ // pentru ca data base facut de romani 
                    rez = rez +  parseInt(element.TOTALVEHICULE, 10);  
                //    if( isNaN( parseInt(element.TOTALVEHICULE, 10) )) 
                 //       console.log("Asta : \'" + element.TOTALVEHICULE + "\'");
               // }
        });
        return rez;
    }
    //GET
    public getAll(): Promise<Car[]> {
        return this.querry({});
    }

    public getById(id: string): Promise<Car[]> {
        return this.querry(this.ObjectId(id));
    }

    public getBy(input): Promise<Car[]> {
        return this.querry(input);
    }

    public getCount(input) : Promise<Number>{
        return this.count(input);
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