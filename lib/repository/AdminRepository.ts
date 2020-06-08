import { Admin } from "../models/Admin";
import { MyMongo } from "./MyMongoDB";

export class AdminRepository {
    private ObjectId;
    private static database: MyMongo<Admin>;
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        if (AdminRepository.database == undefined)
              AdminRepository.database = new MyMongo("CarsDatabase", "Admin");
    }
    //GET
    public getAll(): Promise<Admin[]> {
        return AdminRepository.database.query({});
    }

    public getById(id): Promise<Admin[]> {
        return AdminRepository.database.query(this.ObjectId(id));
    }

    public getBy(input, field = {}, sort = {}): Promise<Admin[]> {
        return AdminRepository.database.query(input, field, sort);
    }

    //POST
    public addOne(newAdmin : Admin): Promise<boolean> {
        return AdminRepository.database.addOne(newAdmin)
    }

    public addMany(newAdmins: Admin[]): Promise<boolean> {
        return AdminRepository.database.addMany(newAdmins)
    }

    public update(queryParams: any, document: any): Promise<boolean> {
        return AdminRepository.database.update(queryParams, document);
    }

    //DELETE
    public delete(input): Promise<boolean> {

        return AdminRepository.database.delete(input);
    }


}