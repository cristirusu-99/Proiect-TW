"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const CarRepository_1 = require("../repository/CarRepository");
const Router_1 = require("../util/Router");
const config_1 = require("../config");
const MyURLparser_1 = require("./MyURLparser");
const HttpCodes_1 = require("../util/HttpCodes");
const Admin_1 = require("../models/Admin");
const AdminRepository_1 = require("../repository/AdminRepository");
class AdminController {
    constructor() {
        this.fs = require('fs');
        this.init();
        this.AdminModel = new Admin_1.Admin().getModelForClass(Admin_1.Admin);
        this.urlParser = new MyURLparser_1.MyURLparser();
    }
    whenDone(res, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }
    verifyUser(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("In verifyUser!");
            // let foundAdmins : Admin[] = await this.adminRepository.getBy({USERNAME:user});
            let foundAdmins = yield this.adminRepository.getAll();
            console.log("Got admins!");
            if (foundAdmins.length == 0) {
                console.log("Got here?");
                AdminController.validUser = false;
                AdminController.stateChanged = true;
            }
            else {
                AdminController.validUser = false;
                AdminController.stateChanged = true;
                console.log("Or here?!");
                foundAdmins.forEach(admin => {
                    console.log(admin.USERNAME + " / " + admin.PASSHASH + " / " + admin.SESSIONTOKEN);
                    if (token == admin.SESSIONTOKEN && user == admin.USERNAME) {
                        console.log("token: " + token + "\t\tDBCont: " + admin.SESSIONTOKEN);
                        AdminController.validUser = true;
                    }
                });
            }
            // if (user != "userName" || token != "randomAlphaNumString") // de inlocuit cu querry DataBaza de Admini!!!
            //     return false;
            // return true;
        });
    }
    getAllAdmins(req, res) {
        this.adminRepository.getAll().then(data => { this.whenDone(res, data); });
    }
    addOne(req, res) {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifyUser(user, sessionToken).then(() => {
                console.log("SC: " + AdminController.stateChanged +
                    "\t\tVU: " + AdminController.validUser);
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) { // de facut function
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        });
                    }
                    else {
                        let newCar = body['toPost'];
                        console.log("Aici1 + " + newCar);
                        this.carRepository.addOne(newCar).then(a => {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
                            res.end('ok');
                        });
                    }
                }
                else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_InternalServerError, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
    addMany(req, res) {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifyUser(user, sessionToken).then(() => {
                console.log("SC: " + AdminController.stateChanged +
                    "\t\tVU: " + AdminController.validUser);
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) { // de facut function
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        });
                    }
                    else {
                        let newCars = body['toPost'];
                        console.log("Aici1 + " + newCars);
                        this.carRepository.addMany(newCars).then(a => {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
                            res.end('ok');
                        });
                    }
                }
                else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_InternalServerError, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
    update(req, res) {
    }
    delete(req, res) {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifyUser(user, sessionToken).then(() => {
                console.log("SC: " + AdminController.stateChanged +
                    "\t\tVU: " + AdminController.validUser);
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) { // de facut function
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        });
                    }
                    else {
                        let parameters = this.urlParser.getInput(req);
                        this.carRepository.delete(parameters[0]).then(a => {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
                            res.end('ok');
                        });
                    }
                }
                else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_InternalServerError, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
    init() {
        const { app: { adresaAdmin } } = config_1.config;
        //GET
        Router_1.MyRouter.get(adresaAdmin + "getadmins", this.getAllAdmins.bind(this));
        //POST
        Router_1.MyRouter.post(adresaAdmin + "addone", this.addOne.bind(this));
        Router_1.MyRouter.post(adresaAdmin + "addmany", this.addMany.bind(this));
        //PUT
        //DELETE
        Router_1.MyRouter.delete(adresaAdmin + "delete", this.delete.bind(this));
    }
}
AdminController.validUser = false;
AdminController.stateChanged = false;
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", CarRepository_1.CarRepository)
], AdminController.prototype, "carRepository", void 0);
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", AdminRepository_1.AdminRepository)
], AdminController.prototype, "adminRepository", void 0);
exports.AdminController = AdminController;
// http://127.0.0.1:3000/api/v1/admin/addone
// http://127.0.0.1:3000/api/v1/admin/addone
//# sourceMappingURL=AdminController.js.map