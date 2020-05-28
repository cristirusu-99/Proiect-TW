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
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const CarRepository_1 = require("../repository/CarRepository");
const Router_1 = require("../util/Router");
const config_1 = require("../config");
const MyURLparser_1 = require("./MyURLparser");
const HttpCodes_1 = require("../util/HttpCodes");
const Admin_1 = require("../models/Admin");
class AdminController {
    constructor() {
        this.fs = require('fs');
        this.init();
        this.AdminModel = new Admin_1.Admin().getModelForClass(Admin_1.Admin);
        this.urlParser = new MyURLparser_1.MyURLparser();
    }
    verifyUser(user, token) {
        if (user != "userName" || token != "randomAlphaNumString") // de inlocuit cu querry DataBaza de Admini!!!
            return false;
        return true;
    }
    addOne(req, res) {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let sessionToken = body['sessionToken'];
            if (!this.verifyUser(user, sessionToken)) { // de facut function
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
            if (!this.verifyUser(user, sessionToken)) { // de facut function
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
            if (!this.verifyUser(user, sessionToken)) { // de facut function
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
        });
    }
    init() {
        const { app: { adresaAdmin } } = config_1.config;
        //POST
        Router_1.MyRouter.post(adresaAdmin + "addone", this.addOne.bind(this));
        Router_1.MyRouter.post(adresaAdmin + "addmany", this.addMany.bind(this));
        //PUT
        //DELETE
        Router_1.MyRouter.delete(adresaAdmin + "delete", this.delete.bind(this));
    }
}
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", CarRepository_1.CarRepository)
], AdminController.prototype, "carRepository", void 0);
exports.AdminController = AdminController;
// http://127.0.0.1:3000/api/v1/admin/addone
// http://127.0.0.1:3000/api/v1/admin/addone
//# sourceMappingURL=AdminController.js.map