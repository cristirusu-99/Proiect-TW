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
const js_sha256_1 = require("js-sha256");
class AdminController {
    constructor() {
        this.fs = require('fs');
        this.lastKeyDate = null;
        this.init();
        this.AdminModel = new Admin_1.Admin().getModelForClass(Admin_1.Admin);
        this.urlParser = new MyURLparser_1.MyURLparser();
        this.key = this.renewKey();
        console.log("somepass: " + this.encodePass("tester"));
    }
    renewKey() {
        if (this.lastKeyDate == null || (Date.now() - this.lastKeyDate) > AdminController.timeOut) {
            this.key = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
            this.lastKeyDate = Date.now();
            console.log("New key: " + this.key);
        }
        return this.key;
    }
    encodePass(pass) {
        return js_sha256_1.sha256.hmac(this.key, pass);
    }
    static whenDone(res, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }
    verifySession(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // let foundAdmins : Admin[] = await this.adminRepository.getBy({USERNAME:user});
            let foundAdmins = yield this.adminRepository.getAll();
            if (foundAdmins.length == 0) {
                AdminController.validSession = false;
                AdminController.stateChanged = true;
            }
            else {
                AdminController.validSession = false;
                AdminController.stateChanged = true;
                foundAdmins.forEach(admin => {
                    if (token == js_sha256_1.sha256.hmac(this.key, admin.PASSHASH) && user == admin.USERNAME) {
                        AdminController.validSession = true;
                    }
                });
            }
        });
    }
    verifyUser(user, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            // let foundAdmins : Admin[] = await this.adminRepository.getBy({USERNAME:user});
            let foundAdmins = yield this.adminRepository.getAll();
            if (foundAdmins.length == 0) {
                AdminController.validUser = false;
                AdminController.stateChanged = true;
            }
            else {
                AdminController.validUser = false;
                AdminController.stateChanged = true;
                foundAdmins.forEach(admin => {
                    if (js_sha256_1.sha256.hmac(this.key, js_sha256_1.sha256(pass)) == js_sha256_1.sha256.hmac(this.key, admin.PASSHASH) && user == admin.USERNAME) {
                        AdminController.validUser = true;
                    }
                });
            }
        });
    }
    logIn(req, res) {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let password = body['password'];
            this.verifyUser(user, password).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        });
                    }
                    else {
                        res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
                        res.end('ok');
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
    getSessionToken(req, res) {
        let value = req.url.split("?")[1].split("=")[1];
        this.adminRepository.getBy({ USERNAME: value }, {}, {}).then(data => {
            let currentKey = this.renewKey();
            let timeLeft = AdminController.timeOut - (Date.now() - this.lastKeyDate);
            let results = { timeout: timeLeft.toString(),
                sessionToken: js_sha256_1.sha256.hmac(currentKey, data[0].PASSHASH) };
            AdminController.whenDone(res, results);
        });
    }
    getKey(req, res) {
        res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
        res.end(JSON.stringify({ key: this.renewKey() }));
    }
    getAllAdmins(req, res) {
        this.adminRepository.getAll().then(data => {
            AdminController.whenDone(res, data);
        });
    }
    addOne(req, res) {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        });
                    }
                    else {
                        let newCar = body['toPost'];
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
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        });
                    }
                    else {
                        let newCars = body['toPost'];
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
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        });
                    }
                    else {
                        let parameters = this.urlParser.getInput(req);
                        let updateDoc = body['toUpdate'];
                        this.carRepository.update(parameters[0], updateDoc).then(a => {
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
    delete(req, res) {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
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
        Router_1.MyRouter.get(adresaAdmin + "getkey", this.getKey.bind(this));
        Router_1.MyRouter.get(adresaAdmin + "getsessiontoken", this.getSessionToken.bind(this));
        //POST
        Router_1.MyRouter.post(adresaAdmin + "addone", this.addOne.bind(this));
        Router_1.MyRouter.post(adresaAdmin + "addmany", this.addMany.bind(this));
        Router_1.MyRouter.post(adresaAdmin + "login", this.logIn.bind(this));
        //PUT
        Router_1.MyRouter.put(adresaAdmin + "update", this.update.bind(this));
        //DELETE
        Router_1.MyRouter.delete(adresaAdmin + "delete", this.delete.bind(this));
    }
}
AdminController.timeOut = 300000; // 1 minute timeout for a key
AdminController.validSession = false;
AdminController.stateChanged = false;
AdminController.validUser = false;
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