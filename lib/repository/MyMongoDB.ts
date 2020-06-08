import {Car} from "../models/Car";
import {config} from "../config";
import {prop, Typegoose} from 'typegoose';

export class MyMongo<T extends Typegoose> {

    private MongoClient;
    private url;// 'mongodb://localhost:27017'
    private database: string;
    private table: string;
    private static client;
    private static db;
    private dColectie;

    constructor(database: string, table: string) {
        this.database = database;
        this.table = table;
        this.url = process.env.MONGOLAB_URI || 'mongodb+srv://test:test@cluster0-3bxxk.mongodb.net/test'
    }

    public static async init(database: string, table: string) {
        const {db: {host, port, name}} = config; //mongodb+srv://<username>:<password>@cluster0-3bxxk.mongodb.net/test?retryWrites=true&w=majority
        var url = process.env.MONGOLAB_URI || 'mongodb+srv://test:test@cluster0-3bxxk.mongodb.net/test'
        await MyMongo.db_connect(url, database, table);
    }

    private static async db_connect(url, database, table) {
        var MongoClient = require('mongodb').MongoClient;
        if (MyMongo.client == undefined) {
            MyMongo.client = await MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});//eventual de scos "useUnifiedTopology: true"
            MyMongo.db = MyMongo.client.db(database);
        }
    }

    public async query<T>(params, fields = {}, sortParams = {}): Promise<T[]> {
        if (params.nu_fa_nimic === "adevarat") {
            return [];
        }
        try {
            await this.ifMongoNotOpen();
            this.dColectie = await MyMongo.db.collection(this.table);
            let result = await this.dColectie.find(params).project(fields).sort(sortParams);
            let v = await result.toArray();
            return v;
        } catch (err) {
            console.error(err);
        }

    }

    public async count(params): Promise<Number> {
        var rez = 0;
        (await this.query<Car>(params, {TOTALVEHICULE: 1, _id: 0})).forEach(element => {
            if (element.TOTALVEHICULE)
                rez = rez + element.TOTALVEHICULE;
        });
        return rez;
    }

    public async update(params, param2 = {}): Promise<boolean> {
        try {
            await this.ifMongoNotOpen();
            this.dColectie = await MyMongo.db.collection(this.table);
            let result = await this.dColectie.updateMany(params, param2);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }

    }

    public async addOne(param: T): Promise<boolean> {
        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            let result = await dColectie.insertOne(param);
            return true;
        } catch (err) {
            console.error(err);
        }

    }

    public async addMany(param: T[]): Promise<boolean> {

        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            let result = await dColectie.insertMany(param);
            return true;
        } catch (err) {
            console.error(err);
        }

    }


    public async delete(params, param2 = {}): Promise<boolean> {
        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            let result = await dColectie.deleteMany(params);
            return true;
        } catch (err) {
            console.error(err);
        }

    }

    private async ifMongoNotOpen() {
        if (MyMongo.client == undefined) {
            await MyMongo.db_connect(this.url, this.database, this.table)
        }
    }


}