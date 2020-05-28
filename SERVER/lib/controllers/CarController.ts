import { Inject, Provides } from "typescript-ioc";
import { CarRepository } from "../repository/CarRepository";
import { Car } from "../models/Car";
import { IncomingMessage, ServerResponse } from 'http'
import { MyRouter } from "../util/Router"
import { json } from "body-parser";
import { config } from "../config";
import { MyURLparser } from './MyURLparser';
import { HttpCodes } from '../util/HttpCodes'
const { parse } = require('querystring');

export class CarController {

    @Inject
    private carRepository: CarRepository;
    private router: MyRouter;
    private carModel;
    private urlParser: MyURLparser;
    constructor() {
        this.init();
        this.carModel = new Car().getModelForClass(Car);
        this.urlParser = new MyURLparser();
    }

    private whenDone(res: ServerResponse, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }

    public getAll(request: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getAll().then(data => { this.whenDone(res, data); });
    }

    public getById(req: IncomingMessage, res: ServerResponse): void {
        let parameters = this.urlParser.getInput(req);
        this.carRepository.getById(parameters[0]['_ID']).then(data => {
            this.whenDone(res, data);
        });
    }

    public getBy(req: IncomingMessage, res: ServerResponse): void {
        const parameters = this.urlParser.getInput(req);
        this.carRepository.getBy(parameters[0],parameters[1],parameters[2]).then(data => {
            this.whenDone(res, data);
        });
    }

    public getCount(req: IncomingMessage, res: ServerResponse): void {
        let parameters = this.urlParser.getInput(req);
        this.carRepository.getCount(parameters[0]).then(data => {
            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
            res.end(data.toString());
        });
    }

    public getCountAll(req: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getCount({}).then(data => {
            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
            res.end(data.toString());
        });
    }

    public addOne(req: IncomingMessage, res: ServerResponse): void {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            var newCar: Car = JSON.parse(body);
            this.carRepository.addOne(newCar).then(a => {
                res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                res.end('ok');
            });
        });
    }

    public addMany(req: IncomingMessage, res: ServerResponse): void {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            var newCars = JSON.parse(body);
            this.carRepository.addMany(newCars).then(a => {
                res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                res.end('ok');
            });
        });
    }

    public update(req: IncomingMessage, res: ServerResponse): void {

    }

    public delete(req: IncomingMessage, res: ServerResponse): void {
        let parameters = this.urlParser.getInput(req);
        this.carRepository.delete(parameters[0]).then(a => {
            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
            res.end('ok');
        });
    }

    public init(): any {
        const { app: { adresaApi } } = config;
        //GET
        MyRouter.get(adresaApi + "getall", this.getAll.bind(this));
        MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        MyRouter.get(adresaApi + "by", this.getBy.bind(this));
        MyRouter.get(adresaApi + "count", this.getCount.bind(this));
        MyRouter.get(adresaApi + "countall", this.getCountAll.bind(this));
        //POST
        MyRouter.post(adresaApi + "addone", this.addOne.bind(this));
        MyRouter.post(adresaApi + "addmany", this.addMany.bind(this));
        //PUT

        //DELETE
        MyRouter.delete(adresaApi + "delete", this.delete.bind(this));
    }

}

// http://127.0.0.1:3000/api/v1/cars/getall

// http://127.0.0.1:3000/api/v1/cars/byid?id=5e92f9b0f6a34939587644ce

// http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA

// http://127.0.0.1:3000/api/v1/cars/count?JUDET=IASI&MARCA=SKODA

// http://127.0.0.1:3000/api/v1/cars/countall

// http://127.0.0.1:3000/api/v1/cars/addone

// http://127.0.0.1:3000/api/v1/cars/addone