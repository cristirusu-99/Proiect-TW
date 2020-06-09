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
const Car_1 = require("../models/Car");
const Router_1 = require("../util/Router");
const config_1 = require("../config");
const MyURLparser_1 = require("./MyURLparser");
const HttpCodes_1 = require("../util/HttpCodes");
class CarController {
    constructor() {
        this.init();
        this.carModel = new Car_1.Car().getModelForClass(Car_1.Car);
        this.urlParser = new MyURLparser_1.MyURLparser();
    }
    //functie folosita pentru oferirea raspunsurilor la request-uri
    static whenDone(res, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }
    //functie ce trateaza un request privind cererea tuturor intrarilor din BD
    getAll(request, res) {
        this.carRepository.getAll().then(data => { CarController.whenDone(res, data); });
    }
    //functie ce trateaza un request privind cererea dupa ID a unei intrari din BD
    getById(req, res) {
        let parameters = this.urlParser.getInput(req);
        this.carRepository.getById(parameters[0]['_ID']).then(data => {
            CarController.whenDone(res, data);
        });
    }
    //functie ce trateaza un request privind cererea multicriteriala a intrarilor din BD
    getBy(req, res) {
        const parameters = this.urlParser.getInput(req);
        this.carRepository.getBy(parameters[0], parameters[1], parameters[2]).then(data => {
            CarController.whenDone(res, data);
        });
    }
    //funtie ce trateaza un request privind cererea numarului de masini pe anumite criterii
    getCount(req, res) {
        let parameters = this.urlParser.getInput(req);
        this.carRepository.getCount(parameters[0]).then(data => {
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
            res.end(data.toString());
        });
    }
    //functie ce trateaza un request privind cererea numarului total de masini
    getCountAll(req, res) {
        this.carRepository.getCount({}).then(data => {
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
            res.end(data.toString());
        });
    }
    //functie ce mapeaza rutele tratate de clasa
    init() {
        const { app: { adresaApi } } = config_1.config;
        //GET
        Router_1.MyRouter.get(adresaApi + "getall", this.getAll.bind(this));
        Router_1.MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        Router_1.MyRouter.get(adresaApi + "by", this.getBy.bind(this));
        Router_1.MyRouter.get(adresaApi + "count", this.getCount.bind(this));
        Router_1.MyRouter.get(adresaApi + "countall", this.getCountAll.bind(this));
    }
}
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", CarRepository_1.CarRepository)
], CarController.prototype, "carRepository", void 0);
exports.CarController = CarController;
// http://127.0.0.1:3000/api/v1/cars/getall
// http://127.0.0.1:3000/api/v1/cars/byid?id=5e92f9b0f6a34939587644ce
// http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA
// http://127.0.0.1:3000/api/v1/cars/count?JUDET=IASI&MARCA=SKODA
// http://127.0.0.1:3000/api/v1/cars/countall
// http://127.0.0.1:3000/api/v1/admin/addone
// http://127.0.0.1:3000/api/v1/admin/addone
//# sourceMappingURL=CarController.js.map