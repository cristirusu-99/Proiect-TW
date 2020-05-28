import { IncomingMessage, ServerResponse } from 'http'
import { config } from "./config";
import { MyRouter } from "./util/Router"
import { CarController } from "./controllers/CarController"
import {MyMongo} from './repository/MyMongoDB'

// check if a file exists - read the api docs to learn how to check if a file exists
// there is a special variable in each module __dirname it contains the directory name of this file

var http = require('http');
var url = require('url');
var fs = require('fs');
const { db: { host, name }, app :{port} } = config;

const CarControllerInit = new CarController;  

MyMongo.init("CarsDatabase", "Car");

var server = http.createServer(function (request: IncomingMessage, response: ServerResponse) {
    MyRouter.route(request, response); 
}
);

server.listen(port);
console.log('Server running at http://127.0.0.1:' + port + '/');


module.exports = server;

