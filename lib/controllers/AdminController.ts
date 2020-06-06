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
import { AdminRepository } from "../repository/AdminRepository";
export class AdminController {

    @Inject
    private carRepository: CarRepository;
    @Inject
    private adminRepository: AdminRepository
    private router: MyRouter;
    private AdminModel;
    private urlParser: MyURLparser;
    private fs = require('fs')

    private static validUser : boolean = false;
    private static stateChanged : boolean = false;

    constructor() {
        this.init();
        this.AdminModel = new Admin().getModelForClass(Admin);
        this.urlParser = new MyURLparser();
    }

    private whenDone(res: ServerResponse, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }

    private async verifyUser(user: string, token: string): Promise<void> {
        console.log("In verifyUser!");
        // let foundAdmins : Admin[] = await this.adminRepository.getBy({USERNAME:user});
        let foundAdmins : Admin[] = await this.adminRepository.getAll();
        console.log("Got admins!");
        if (foundAdmins.length == 0) {
            console.log("Got here?");
            AdminController.validUser = false;
            AdminController.stateChanged = true;
        } else {
            AdminController.validUser = false;
            AdminController.stateChanged = true;
            console.log("Or here?!");
            foundAdmins.forEach(admin => {
                console.log(admin.USERNAME + " / " + admin.PASSHASH + " / " + admin.SESSIONTOKEN);
                if (token == admin.SESSIONTOKEN && user == admin.USERNAME) {
                    console.log("token: " + token + "\t\tDBCont: " + admin.SESSIONTOKEN)
                    AdminController.validUser = true;
                }
            });
        }
    }

    public getAllAdmins(req: IncomingMessage, res: ServerResponse): void {
        this.adminRepository.getAll().then(data => { this.whenDone(res, data); });
    }

    public addOne(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifyUser(user, sessionToken).then( () => {
                console.log("SC: " + AdminController.stateChanged +
                                "\t\tVU: " + AdminController.validUser)
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) {                          // de facut function
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
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
            });
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
            this.verifyUser(user, sessionToken).then( () => {
                console.log("SC: " + AdminController.stateChanged +
                                "\t\tVU: " + AdminController.validUser)
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) {                          // de facut function
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
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
            });
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
            this.verifyUser(user, sessionToken).then( () => {
                console.log("SC: " + AdminController.stateChanged +
                                "\t\tVU: " + AdminController.validUser)
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) {                          // de facut function
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
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }

    public init(): any {
        const { app: { adresaAdmin } } = config;
        //GET
        MyRouter.get(adresaAdmin + "getadmins", this.getAllAdmins.bind(this));

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