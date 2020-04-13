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
    getAll(request, res) {
        var a = this.carRepository.getAll().then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/html');
            res.end(JSON.stringify(a));
            console.log(a);
        });
        //  console.log(vector.length);
        //  console.log(vector[0]);
    }
    getById(req, res) {
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
        router_1.MyRouter.get("/cars", this.getAll.bind(this));
        router_1.MyRouter.get("/cars:id", this.getById.bind(this));
        router_1.MyRouter.post("/cars", this.add.bind(this));
        router_1.MyRouter.put("/:id", this.delete.bind(this));
        //   MyRouter.post("",);
        //   MyRouter.delete("",);
        //   MyRouter.put("",);
    }
}
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", CarRepository_1.CarRepository)
], CarController.prototype, "carRepository", void 0);
exports.CarController = CarController;
//# sourceMappingURL=CarController.js.map