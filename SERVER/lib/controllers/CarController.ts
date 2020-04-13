import { Inject, Provides } from "typescript-ioc";
import { CarRepository } from "../repository/CarRepository";
import { Car } from "../models/Car";
import { IncomingMessage, ServerResponse } from 'http'
import { MyRouter } from "../router"
import { Router } from "express";
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

    public getAll(request: IncomingMessage, res: ServerResponse): void {
        var a = this.carRepository.getAll().then(a => {
            res.writeHead(this.HttpStatus_OK, 'text/html');
            res.end(JSON.stringify(a));
            console.log(a);
        });

        //  console.log(vector.length);
        //  console.log(vector[0]);


    }

    public getById(req: IncomingMessage, res: ServerResponse): void {

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
        MyRouter.get("/cars", this.getAll.bind(this));
        MyRouter.get("/cars:id", this.getById.bind(this));
        MyRouter.post("/cars", this.add.bind(this));
        MyRouter.put("/:id", this.delete.bind(this));
        //   MyRouter.post("",);
        //   MyRouter.delete("",);
        //   MyRouter.put("",);
    }

}