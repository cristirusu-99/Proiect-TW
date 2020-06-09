"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MyMongoDB_1 = require("./MyMongoDB");
class AdminRepository {
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        if (AdminRepository.database == undefined)
            AdminRepository.database = new MyMongoDB_1.MyMongo("CarsDatabase", "Admin");
    }
    //GET
    getAll() {
        return AdminRepository.database.query({});
    }
    getById(id) {
        return AdminRepository.database.query(this.ObjectId(id));
    }
    getBy(input, field = {}, sort = {}) {
        return AdminRepository.database.query(input, field, sort);
    }
    //POST
    addOne(newAdmin) {
        return AdminRepository.database.addOne(newAdmin);
    }
    addMany(newAdmins) {
        return AdminRepository.database.addMany(newAdmins);
    }
    update(queryParams, document) {
        return AdminRepository.database.update(queryParams, document);
    }
    //DELETE
    delete(input) {
        return AdminRepository.database.delete(input);
    }
}
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=AdminRepository.js.map