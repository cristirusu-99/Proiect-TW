import { Car } from "../models/Car";
import { Provides } from "typescript-ioc";
import { ICarRepository } from "./ICarRepository";
import { Typegoose } from "typegoose";
import * as mongoose from 'mongoose';
import { config } from "../config";
import { json } from "body-parser";
import { Db } from "mongodb";

export class MyMongo {

    private MongoClient;
    private url;// 'mongodb://localhost:27017'
    private database: string;
    private table: string;

    constructor(database: string, table: string) {
        const { db: { host, port, name } } = config;
        this.url = 'mongodb' + "://" + host + ':' + port + '/' + name;
        this.database = database;
        this.table = table;
    }

    public async query(params, param2 = {}): Promise<Car[]> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
            let result = await dColectie.find(params, param2);
            let v = await result.toArray();
            return v;
        }
        catch (err) {
            console.error(err);
        }
        finally { client.close() };
    }

    public async count(params): Promise<Number> {
        var rez = 0;
        (await this.query(params, { TOTALVEHICULE: 1, _id: 0 })).forEach(element => {
            if (element.TOTALVEHICULE != null && element.TOTALVEHICULE != "")
                // if (element.TOTALVEHICULE.match(/[^0-9]/) == null ){ // pentru ca data base facut de romani 
                rez = rez + parseInt(element.TOTALVEHICULE, 10);
            //    if( isNaN( parseInt(element.TOTALVEHICULE, 10) )) 
            //       console.log("Asta : \'" + element.TOTALVEHICULE + "\'");
            // }
        });
        return rez;
    }

    public async update(params, param2 = {}): Promise<boolean> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
            let result = await dColectie.update(params, param2);
            let v = await result.toArray();
            return v;
        }
        catch (err) {
            console.error(err);
        }
        finally { client.close() };
    }

    public async addOne(param : Car): Promise<boolean> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
            let result = await dColectie.insertOne(param);
            return true;
        }
        catch (err) {
            console.error(err);
        }
        finally { client.close() };
    }

    public async addMany(param : Car[]): Promise<boolean> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
            let result = await dColectie.insertMany(param);
            return true;
        }
        catch (err) {
            console.error(err);
        }
        finally { client.close() };
    }


    public async delete(params, param2 = {}): Promise<boolean> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
            let result = await dColectie.deleteMany(params);
            return true;
        }
        catch (err) {
            console.error(err);
        }
        finally { client.close() };
    }



}