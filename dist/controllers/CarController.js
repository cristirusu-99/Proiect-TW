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
const router_1 = require("../router");
const config_1 = require("../config");
const { parse } = require('querystring');
class CarController {
    constructor() {
        this.HttpStatus_NoContent = 204;
        this.HttpStatus_OK = 200;
        this.HttpStatus_BadRequest = 400;
        this.HttpStatus_NotFound = 404;
        this.HttpStatus_Created = 201;
        this.init();
        this.carModel = new Car_1.Car().getModelForClass(Car_1.Car);
    }
    getParam(params) {
        var raspuns;
        var values = {};
        console.log(params);
        params.split("&").forEach(parametru => {
            if (parametru.includes("=")) {
                var a = parametru.split("=");
                values[a[0]] = a[1].replace(/%20/g, " ");
            }
        });
        // http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA
        console.log(values);
        return values;
    }
    getInput(req) {
        var parametrii = req.url.split("?")[1];
        if (parametrii === undefined)
            return {};
        return this.getParam(parametrii);
    }
    getAll(request, res) {
        this.carRepository.getAll().then(a => {
            res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));
            // console.log(a);
        });
    } // http://127.0.0.1:3000/api/v1/cars/
    getById(req, res) {
        this.carRepository.getById(this.getInput(req)['_ID']).then(a => {
            res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));
            //    console.log(a); // DEBUG 
        });
    } // http://127.0.0.1:3000/api/v1/cars/byid?id=5e92f9b0f6a34939587644ce
    getBy(req, res) {
        this.carRepository.getBy(this.getInput(req)).then(a => {
            res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));
            //    console.log(a); // DEBUG 
        });
    } // http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA
    getCount(req, res) {
        this.carRepository.getCount(this.getInput(req)).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/text');
            res.end(a.toString());
        });
    }
    add(req, res) {
        console.log("merge nu ?");
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(body);
            res.end('ok');
        });
    }
    update(req, res) {
    }
    delete(req, res) {
    }
    init() {
        const { app: { adresaApi } } = config_1.config;
        //GET
        router_1.MyRouter.get(adresaApi, this.getAll.bind(this));
        router_1.MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        router_1.MyRouter.get(adresaApi + "by", this.getBy.bind(this));
        router_1.MyRouter.get(adresaApi + "count", this.getCount.bind(this));
        //POST
        router_1.MyRouter.post(adresaApi, this.add.bind(this));
        //PUT
        router_1.MyRouter.put("/:id", this.delete.bind(this));
        //DELETE
    }
}
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", CarRepository_1.CarRepository)
], CarController.prototype, "carRepository", void 0);
exports.CarController = CarController;
//# sourceMappingURL=CarController.js.map