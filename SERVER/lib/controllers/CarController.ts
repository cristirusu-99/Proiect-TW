import { Inject, Provides } from "typescript-ioc";
import { CarRepository } from "../repository/CarRepository";
import { Car } from "../models/Car";
import { IncomingMessage, ServerResponse } from 'http'
import { MyRouter } from "../router"
import { Router, request } from "express";
import { json } from "body-parser";
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

    private getParam(params: string[], id: string): string {
        var raspuns: string;
        params.forEach(parametru => {
            if (parametru.includes(id + "=")) {
                raspuns = parametru.split(id + "=")[1];
            }
        });
        return raspuns;
    }

    public getAll(request: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getAll().then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/html');
            res.end(JSON.stringify(a));
            console.log(a);
        });
    }

    public getById(req: IncomingMessage, res: ServerResponse): void {

        var id = this.getParam(req.url.split("&"), "id");
        console.log(id);
        this.carRepository.getById(id).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/html');
            res.end(JSON.stringify(a));
            console.log(a);
        });
    }

    public getByJudet(req: IncomingMessage, res: ServerResponse): void {

        var id = this.getParam(req.url.split("&"), "judet");
        console.log(id);
        this.carRepository.getByJudet(id).then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/html');
            res.end(JSON.stringify(a));
            console.log(a);
        });
    }

    public add(req: IncomingMessage, res: ServerResponse): void {
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

    public update(req: IncomingMessage, res: ServerResponse): void {

    }

    public delete(req: IncomingMessage, res: ServerResponse): void {

    }

    public init(): any {
        const adresaApi = "/api/v1/cars/"
        MyRouter.get(adresaApi, this.getAll.bind(this));
        MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        MyRouter.get(adresaApi + "byjudet", this.getByJudet.bind(this));

        MyRouter.post(adresaApi, this.add.bind(this));

        MyRouter.put("/:id", this.delete.bind(this));
        //   MyRouter.post("",);
        //   MyRouter.delete("",);
        //   MyRouter.put("",);
    }

}