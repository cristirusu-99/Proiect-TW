import { Inject } from "typescript-ioc";
import { CarRepository } from "../repository/CarRepository";
import { Car } from "../models/Car";
import { IncomingMessage, ServerResponse } from 'http'
import { MyRouter } from "../util/Router"
import { config } from "../config";
import { MyURLparser } from './MyURLparser';
import { HttpCodes } from '../util/HttpCodes'

export class CarController {                  //clasa care inplemnteza functionalitatile pentru utilizatori

    @Inject
    private carRepository: CarRepository;
    private carModel;
    private urlParser: MyURLparser;

    constructor() {
        this.init();
        this.carModel = new Car().getModelForClass(Car);
        this.urlParser = new MyURLparser();
    }
                                                        //functie folosita pentru oferirea raspunsurilor la request-uri
    private static whenDone(res: ServerResponse, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }
                                                        //functie ce trateaza un request privind cererea tuturor intrarilor din BD
    public getAll(request: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getAll().then(data => { CarController.whenDone(res, data); });
    }
                                                        //functie ce trateaza un request privind cererea dupa ID a unei intrari din BD
    public getById(req: IncomingMessage, res: ServerResponse): void {
        let parameters = this.urlParser.getInput(req);
        this.carRepository.getById(parameters[0]['_ID']).then(data => {
            CarController.whenDone(res, data);
        });
    }
                                                        //functie ce trateaza un request privind cererea multicriteriala a intrarilor din BD
    public getBy(req: IncomingMessage, res: ServerResponse): void {
        const parameters = this.urlParser.getInput(req);
        this.carRepository.getBy(parameters[0],parameters[1],parameters[2]).then(data => {
            CarController.whenDone(res, data);
        });
    }
                                                        //funtie ce trateaza un request privind cererea numarului de masini pe anumite criterii
    public getCount(req: IncomingMessage, res: ServerResponse): void {
        let parameters = this.urlParser.getInput(req);
        this.carRepository.getCount(parameters[0]).then(data => {
            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
            res.end(data.toString());
        });
    }
                                                        //functie ce trateaza un request privind cererea numarului total de masini
    public getCountAll(req: IncomingMessage, res: ServerResponse): void {
        this.carRepository.getCount({}).then(data => {
            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
            res.end(data.toString());
        });
    }
                                                        //functie ce mapeaza rutele tratate de clasa
    public init(): any {
        const { app: { adresaApi } } = config;
        //GET
        MyRouter.get(adresaApi + "getall", this.getAll.bind(this));
        MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        MyRouter.get(adresaApi + "by", this.getBy.bind(this));
        MyRouter.get(adresaApi + "count", this.getCount.bind(this));
        MyRouter.get(adresaApi + "countall", this.getCountAll.bind(this));
    }

}

// http://127.0.0.1:3000/api/v1/cars/getall

// http://127.0.0.1:3000/api/v1/cars/byid?id=5e92f9b0f6a34939587644ce

// http://127.0.0.1:3000/api/v1/cars/by?JUDET=IASI&MARCA=SKODA

// http://127.0.0.1:3000/api/v1/cars/count?JUDET=IASI&MARCA=SKODA

// http://127.0.0.1:3000/api/v1/cars/countall

// http://127.0.0.1:3000/api/v1/admin/addone

// http://127.0.0.1:3000/api/v1/admin/addone