import {Inject} from "typescript-ioc";
import {CarRepository} from "../repository/CarRepository";
import {Car} from "../models/Car";
import {IncomingMessage, ServerResponse} from 'http'
import {MyRouter} from "../util/Router"
import {config} from "../config";
import {MyURLparser} from "./MyURLparser";
import {HttpCodes} from "../util/HttpCodes";
import {Admin} from "../models/Admin"
import {AdminRepository} from "../repository/AdminRepository";
import {sha256} from 'js-sha256'

export class AdminController {                  //clasa care inplemnteza functionalitatile pentru administratori

    @Inject
    private carRepository: CarRepository;
    @Inject
    private adminRepository: AdminRepository
    private AdminModel;
    private urlParser: MyURLparser;
    private fs = require('fs');
    private key: string;                                //cheie temporara folosita pentru realizarea si compararea HASH-urilor
    private lastKeyDate = null;                         //ultimul timp la care a fost generata o cheie
    private static timeOut = 300000;                    //perioada de valabilitatea a unei chei: 5 minute

    private static validSession: boolean = false;       //flag-uri pentru validararea unui utilizator sau a unei sesiuni
    private static stateChanged: boolean = false;
    private static validUser: boolean = false;

    constructor() {
        this.init();
        this.AdminModel = new Admin().getModelForClass(Admin);
        this.urlParser = new MyURLparser();
        this.key = this.renewKey();
    }

    private renewKey(): string {                        //functie pentru reinnoirea cheii
        if (this.lastKeyDate == null || (Date.now() - this.lastKeyDate) > AdminController.timeOut) {
            this.key = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
            this.lastKeyDate = Date.now();
        }
        return this.key;
    }

    private encodePass(pass: string): string {          //functie folosita pentru HASH-uri
        return sha256.hmac(this.key, pass);
    }
                                                        //functie folosita pentru oferirea raspunsurilor la request-uri
    private static whenDone(res: ServerResponse, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }
                                                        //functie pentru verificarea validitatii unei sesiuni
    private async verifySession(user: string, token: string): Promise<void> {
        // let foundAdmins : Admin[] = await this.adminRepository.getBy({USERNAME:user});
        let foundAdmins: Admin[] = await this.adminRepository.getAll();
        if (foundAdmins.length == 0) {
            AdminController.validSession = false;
            AdminController.stateChanged = true;
        } else {
            AdminController.validSession = false;
            AdminController.stateChanged = true;
            foundAdmins.forEach(admin => {
                if (token == sha256.hmac(this.key, admin.PASSHASH) && user == admin.USERNAME) {
                    AdminController.validSession = true;
                }
            });
        }
    }
                                                        //functie pentru verificarea validitatii unui utilizator
    private async verifyUser(user: string, pass: string): Promise<void> {
        // let foundAdmins : Admin[] = await this.adminRepository.getBy({USERNAME:user});
        let foundAdmins: Admin[] = await this.adminRepository.getAll();
        if (foundAdmins.length == 0) {
            AdminController.validUser = false;
            AdminController.stateChanged = true;
        } else {
            AdminController.validUser = false;
            AdminController.stateChanged = true;
            foundAdmins.forEach(admin => {
                if (sha256.hmac(this.key, sha256(pass)) == sha256.hmac(this.key, admin.PASSHASH) && user == admin.USERNAME) {
                    AdminController.validUser = true;
                }
            });
        }
    }
                                                        //functie care trateaza un request de login
    public logIn(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let password = body['password'];
            this.verifyUser(user, password).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validUser) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes.HttpStatus_Forbidden, {'Content-Type': 'text/html'});
                            res.end(content, 'utf-8');
                        });
                    } else {
                        res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                        res.end('ok');
                    }
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, {'Content-Type': 'text/html'});
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
                                                            //functie care trateaza un request pentru sessionToken
    public getSessionToken(req:IncomingMessage, res:ServerResponse): void {
        let value = req.url.split("?")[1].split("=")[1];
        this.adminRepository.getBy({USERNAME: value}, {}, {}).then(data => {
            let currentKey = this.renewKey();
            let timeLeft = AdminController.timeOut - (Date.now() - this.lastKeyDate);
            let results = {timeout: timeLeft.toString(),
                sessionToken:sha256.hmac(currentKey, data[0].PASSHASH)}
            AdminController.whenDone(res, results);
        })
    }
                                                            //functie care trateaza un request pentru adaugarea unei intrai in BD
    public addOne(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes.HttpStatus_Forbidden, {'Content-Type': 'text/html'});
                            res.end(content, 'utf-8');
                        });
                    } else {
                        let newCar: Car = body['toPost'];
                        this.carRepository.addOne(newCar).then(() => {
                            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                            res.end('ok');
                        });
                    }
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, {'Content-Type': 'text/html'});
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
                                                            //functie care trateaza un request pentru adaugarea mai multor intrai in BD
    public addMany(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes.HttpStatus_Forbidden, {'Content-Type': 'text/html'});
                            res.end(content, 'utf-8');
                        });
                    } else {
                        let newCars: Car[] = body['toPost'];
                        this.carRepository.addMany(newCars).then(() => {
                            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                            res.end('ok');
                        });
                    }
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, {'Content-Type': 'text/html'});
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
                                                            //functie care trateaza un request pentru modificarea multicriteriala a intrarilor din BD
    public update(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes.HttpStatus_Forbidden, {'Content-Type': 'text/html'});
                            res.end(content, 'utf-8');
                        });
                    } else {
                        let parameters = this.urlParser.getInput(req);
                        let updateDoc = body['toUpdate'];
                        this.carRepository.update(parameters[0], updateDoc).then(() => {
                            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                            res.end('ok');
                        });
                    }
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, {'Content-Type': 'text/html'});
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
                                                            //functie care trateaza un request pentru stergerea multicriteriala a intrarilor din BD
    public delete(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let user = body['user'];
            let sessionToken = body['sessionToken'];
            this.verifySession(user, sessionToken).then(() => {
                if (AdminController.stateChanged) {
                    AdminController.stateChanged = false;
                    if (!AdminController.validSession) {
                        this.fs.readFile('./403.html', function (error, content) {
                            res.writeHead(HttpCodes.HttpStatus_Forbidden, {'Content-Type': 'text/html'});
                            res.end(content, 'utf-8');
                        });
                    } else {
                        let parameters = this.urlParser.getInput(req);
                        this.carRepository.delete(parameters[0]).then(() => {
                            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                            res.end('ok');
                        });
                    }
                } else {
                    this.fs.readFile('./500.html', function (error, content) {
                        res.writeHead(HttpCodes.HttpStatus_InternalServerError, {'Content-Type': 'text/html'});
                        res.end(content, 'utf-8');
                    });
                }
            });
        });
    }
                                                            //functie ce mapeaza rutele tratate de clasa
    public init(): any {
        const {app: {adresaAdmin}} = config;
        //GET
        MyRouter.get(adresaAdmin + "getsessiontoken", this.getSessionToken.bind(this));

        //POST
        MyRouter.post(adresaAdmin + "addone", this.addOne.bind(this));
        MyRouter.post(adresaAdmin + "addmany", this.addMany.bind(this));
        MyRouter.post(adresaAdmin + "login", this.logIn.bind(this));

        //PUT
        MyRouter.put(adresaAdmin + "update", this.update.bind(this));

        //DELETE
        MyRouter.delete(adresaAdmin + "delete", this.delete.bind(this));
    }

}

// http://127.0.0.1:3000/api/v1/admin/addone

// http://127.0.0.1:3000/api/v1/admin/addone