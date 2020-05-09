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
    // http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA
    getParam(params) {
        var raspuns;
        var values = {};
        // console.log(params)
        params.split("&").forEach(parametru => {
            if (parametru.includes("=")) {
                var a = parametru.split("=");
                values[a[0]] = a[1].replace(/%20/g, " ");
            }
        });
        // console.log(values) {}
        return values;
    }
    getInput(req) {
        var parametrii = req.url.split("?")[1];
        if (parametrii === undefined)
            return { _ID: 'obiectGol' };
        return this.getParam(parametrii);
    }
    getAll(request, res) {
        this.carRepository.getAll().then(a => {
            if (a.length == 0)
                res.writeHead(this.HttpStatus_NoContent, 'application/json');
            else
                res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));
            // console.log(a);
        });
    } // http://127.0.0.1:3000/api/v1/cars/getall
    getById(req, res) {
        this.carRepository.getById(this.getInput(req)['_ID']).then(a => {
            if (a.length == 0)
                res.writeHead(this.HttpStatus_NoContent, 'application/json');
            else
                res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));
            //    console.log(a); // DEBUG 
        });
    } // http://127.0.0.1:3000/api/v1/cars/byid?id=5e92f9b0f6a34939587644ce
    getBy(req, res) {
        this.carRepository.getBy(this.getInput(req)).then(a => {
            if (a.length == 0)
                res.writeHead(this.HttpStatus_NoContent, 'application/json');
            else
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
    } // http://127.0.0.1:3000/api/v1/cars/count?JUDET=IASI&MARCA=SKODA
    getCountAll(req, res) {
        this.carRepository.getCount({}).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/text');
            res.end(a.toString());
        });
    } // http://127.0.0.1:3000/api/v1/cars/countall
    addOne(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            var newCar = JSON.parse(body);
            this.carRepository.addOne(newCar).then(a => {
                res.writeHead(this.HttpStatus_OK, 'text/text');
                res.end('ok');
            });
        });
    } // http://127.0.0.1:3000/api/v1/cars/addone
    addMany(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
            //console.log("Cont: " + body + " " + typeof(body));
        });
        req.on('end', () => {
            //console.log("Cont: " + body + " " + typeof(body));
            //bodyParser(body);
            var newCars = JSON.parse(body);
            //console.log("Cont: " + newCars.toString() + '\nCont: ' + typeof(newCars));
            this.carRepository.addMany(newCars).then(a => {
                res.writeHead(this.HttpStatus_OK, 'text/text');
                res.end('ok');
            });
        });
    } // http://127.0.0.1:3000/api/v1/cars/addone
    update(req, res) {
    }
    delete(req, res) {
        this.carRepository.delete(this.getInput(req)).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/text');
            res.end('ok');
        });
    }
    init() {
        const { app: { adresaApi } } = config_1.config;
        //GET
        router_1.MyRouter.get(adresaApi + "getall", this.getAll.bind(this));
        router_1.MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        router_1.MyRouter.get(adresaApi + "by", this.getBy.bind(this));
        router_1.MyRouter.get(adresaApi + "count", this.getCount.bind(this));
        router_1.MyRouter.get(adresaApi + "countall", this.getCountAll.bind(this));
        //POST
        router_1.MyRouter.post(adresaApi + "addone", this.addOne.bind(this));
        router_1.MyRouter.post(adresaApi + "addmany", this.addMany.bind(this));
        //PUT
        //DELETE
        router_1.MyRouter.delete(adresaApi + "delete", this.delete.bind(this));
    }
}
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", CarRepository_1.CarRepository)
], CarController.prototype, "carRepository", void 0);
exports.CarController = CarController;
//# sourceMappingURL=CarController.js.map