import { Inject, Provides } from "typescript-ioc";
import { CarRepository } from "../repository/CarRepository";
import { Car } from "../models/Car";
import { IncomingMessage, ServerResponse } from 'http'
import { MyRouter } from "../util/Router"
import { json } from "body-parser";
import { config } from "../config";
import { MyURLparser } from "./MyURLparser";
import { HttpCodes } from "../util/HttpCodes";
import { RequestBodyReader } from "../util/RequestBodyReader"
import { Admin } from "../models/Admin"
export class AdminController {

    @Inject
    private carRepository: CarRepository;
    private router: MyRouter;
    private AdminModel;
    private urlParser: MyURLparser;
    private fs = require('fs')

    constructor() {
        this.init();
        this.AdminModel = new Admin().getModelForClass(Admin);
        this.urlParser = new MyURLparser();
    }

    private verifyUser(user: string, token: string): boolean {
        if (user != "userName" || token != "randomAlphaNumString") // de inlocuit cu querry DataBaza de Admini!!!
            return false;
        return true;
    }

    public addOne(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            if (!this.verifyUser(user, sessionToken)) {                          // de facut function
                this.fs.readFile('./403.html', function (error, content) {
                    res.writeHead(HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {

                let newCar: Car = body['toPost'];
                console.log("Aici1 + " + newCar);
                this.carRepository.addOne(newCar).then(a => {
                    res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                    res.end('ok');
                });
            }
        });
    }

    public addMany(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            if (!this.verifyUser(user, sessionToken)) {                          // de facut function
                this.fs.readFile('./403.html', function (error, content) {
                    res.writeHead(HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                let newCars: Car[] = body['toPost'];
                console.log("Aici1 + " + newCars);
                this.carRepository.addMany(newCars).then(a => {
                    res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                    res.end('ok');
                });
            }
        });
    }
    public update(req: IncomingMessage, res: ServerResponse): void {

    }

    public delete(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            if (!this.verifyUser(user, sessionToken)) {                          // de facut function
                this.fs.readFile('./403.html', function (error, content) {
                    res.writeHead(HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                let parameters = this.urlParser.getInput(req);
                this.carRepository.delete(parameters[0]).then(a => {
                    res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                    res.end('ok');
                });
            }
        });
    }

    public init(): any {
        const { app: { adresaAdmin } } = config;
        //POST
        MyRouter.post(adresaAdmin + "addone", this.addOne.bind(this));
        MyRouter.post(adresaAdmin + "addmany", this.addMany.bind(this));
        //PUT

        //DELETE
        MyRouter.delete(adresaAdmin + "delete", this.delete.bind(this));
    }

}

// http://127.0.0.1:3000/api/v1/admin/addone

// http://127.0.0.1:3000/api/v1/admin/addone