import { Inject, Provides } from "typescript-ioc";
import { CarRepository } from "../repository/CarRepository";
import { Car } from "../models/Car";
import { IncomingMessage, ServerResponse } from 'http'
import { MyRouter } from "../router"
import { Router, request } from "express";
import { json } from "body-parser";
import { config } from "../config";
const { parse } = require('querystring');

export class CarController {
    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    @Inject
    private carRepository: CarRepository;
    private router: MyRouter;
    private carModel;

    constructor() {
        this.init();
        this.carModel = new Car().getModelForClass(Car);
    }
    // http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA
    private getParam(params: string) {
        var raspuns: string;
        var values: { [key: string]: string } = {};
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

    private getInput(req: IncomingMessage) { 
        var parametrii = req.url.split("?")[1];
        if (parametrii === undefined ) return { _ID: 'obiectGol' };
        return this.getParam(parametrii);
    }

    public getAll(request: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getAll().then(a => {
            if (a.length == 0)
                res.writeHead(this.HttpStatus_NoContent, 'application/json');
            else
                res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));
            // console.log(a);
        });
    }// http://127.0.0.1:3000/api/v1/cars/getall

    public getById(req: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getById(this.getInput(req)['_ID']).then(a => {
            if (a.length == 0)
                res.writeHead(this.HttpStatus_NoContent, 'application/json');
            else
                res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));
            //    console.log(a); // DEBUG 
        });
    }// http://127.0.0.1:3000/api/v1/cars/byid?id=5e92f9b0f6a34939587644ce

    public getBy(req: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getBy(this.getInput(req)).then(a => {
            if (a.length == 0)
                res.writeHead(this.HttpStatus_NoContent, 'application/json');
            else
                res.writeHead(this.HttpStatus_OK, 'application/json');
            res.end(JSON.stringify(a));

            //    console.log(a); // DEBUG 
        });
    }// http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA

    public getCount(req: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getCount(this.getInput(req)).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/text');
            res.end(a.toString());
        });
    }// http://127.0.0.1:3000/api/v1/cars/count?JUDET=IASI&MARCA=SKODA

    public getCountAll(req: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getCount({}).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/text');
            res.end(a.toString());
        });
    }// http://127.0.0.1:3000/api/v1/cars/countall

    public addOne(req: IncomingMessage, res: ServerResponse): void {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            var newCar: Car = JSON.parse(body);
            this.carRepository.addOne(newCar).then(a => {
                res.writeHead(this.HttpStatus_OK, 'text/text');
                res.end('ok');
            });
        });
    }// http://127.0.0.1:3000/api/v1/cars/addone

    public addMany(req: IncomingMessage, res: ServerResponse): void {
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
    }// http://127.0.0.1:3000/api/v1/cars/addone

    public update(req: IncomingMessage, res: ServerResponse): void {

    }

    public delete(req: IncomingMessage, res: ServerResponse): void {
        this.carRepository.delete(this.getInput(req)).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/text');
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