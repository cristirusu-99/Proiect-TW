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

export class MyMongo {

    private MongoClient;
    private url;// 'mongodb://localhost:27017'
    private database: string;
    private table: string;
<<<<<<< HEAD
    private static client;
    private static db;
    private static dColectie;

    constructor(database: string, table: string) {
        this.database = database;
        this.table = table;
        this.url = process.env.MONGOLAB_URI || 'mongodb+srv://test:test@cluster0-3bxxk.mongodb.net/test'
    }

    public static async init(database: string, table: string) {
        const { db: { host, port, name } } = config; //mongodb+srv://<username>:<password>@cluster0-3bxxk.mongodb.net/test?retryWrites=true&w=majority
        var url = process.env.MONGOLAB_URI || 'mongodb+srv://test:test@cluster0-3bxxk.mongodb.net/test'
        await MyMongo.db_connect(url, database, table);
    }
    private static async db_connect(url, database, table) {
        var MongoClient = require('mongodb').MongoClient;
        if (MyMongo.client == undefined) {
            MyMongo.client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true" 
            MyMongo.db = MyMongo.client.db(database);
            MyMongo.dColectie = await MyMongo.db.collection(table);
        }
    }

    public async query(params, param2 = {}): Promise<Car[]> {
        try {
            if (MyMongo.client == undefined) {
                await MyMongo.db_connect(this.url, this.database, this.table)
            }
            let result = await MyMongo.dColectie.find(params, param2);
=======

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
>>>>>>> master
            let v = await result.toArray();
            return v;
        }
        catch (err) {
            console.error(err);
        }
<<<<<<< HEAD

=======
        finally { client.close() };
>>>>>>> master
    }

    public async count(params): Promise<Number> {
        var rez = 0;
        (await this.query(params, { TOTALVEHICULE: 1, _id: 0 })).forEach(element => {
            if (element.TOTALVEHICULE != null && element.TOTALVEHICULE != "")
<<<<<<< HEAD
                rez = rez + parseInt(element.TOTALVEHICULE, 10);
=======
                // if (element.TOTALVEHICULE.match(/[^0-9]/) == null ){ // pentru ca data base facut de romani 
                rez = rez + parseInt(element.TOTALVEHICULE, 10);
            //    if( isNaN( parseInt(element.TOTALVEHICULE, 10) )) 
            //       console.log("Asta : \'" + element.TOTALVEHICULE + "\'");
            // }
>>>>>>> master
        });
        return rez;
    }

    public async update(params, param2 = {}): Promise<boolean> {
<<<<<<< HEAD
        try {
            if (MyMongo.client == undefined) {
                await MyMongo.db_connect(this.url, this.database, this.table)
            }
            let result = await MyMongo.dColectie.update(params, param2);
=======
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
            let result = await dColectie.update(params, param2);
>>>>>>> master
            let v = await result.toArray();
            return v;
        }
        catch (err) {
            console.error(err);
        }
<<<<<<< HEAD

    }

    public async addOne(param: Car): Promise<boolean> {
        try {
            if (MyMongo.client == undefined) {
                await MyMongo.db_connect(this.url, this.database, this.table)
            }
            let dColectie = MyMongo.db.collection(this.table);
=======
        finally { client.close() };
    }

    public async addOne(param : Car): Promise<boolean> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
>>>>>>> master
            let result = await dColectie.insertOne(param);
            return true;
        }
        catch (err) {
            console.error(err);
        }
<<<<<<< HEAD

    }

    public async addMany(param: Car[]): Promise<boolean> {

        try {
            if (MyMongo.client == undefined) {
                await MyMongo.db_connect(this.url, this.database, this.table)
            }
            let dColectie = MyMongo.db.collection(this.table);
=======
        finally { client.close() };
    }

    public async addMany(param : Car[]): Promise<boolean> {
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
>>>>>>> master
            let result = await dColectie.insertMany(param);
            return true;
        }
        catch (err) {
            console.error(err);
        }
<<<<<<< HEAD

=======
        finally { client.close() };
>>>>>>> master
    }


    public async delete(params, param2 = {}): Promise<boolean> {
<<<<<<< HEAD
        try {
            if (MyMongo.client == undefined) {
                await MyMongo.db_connect(this.url, this.database, this.table)
            }
            let dColectie = MyMongo.db.collection(this.table);
=======
        let client, db;
        this.MongoClient = require('mongodb').MongoClient;
        try {
            client = await this.MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true });//eventual de scos "useUnifiedTopology: true"
            db = client.db(this.database);
            let dColectie = db.collection(this.table);
>>>>>>> master
            let result = await dColectie.deleteMany(params);
            return true;
        }
        catch (err) {
            console.error(err);
        }
<<<<<<< HEAD

=======
        finally { client.close() };
>>>>>>> master
    }



}