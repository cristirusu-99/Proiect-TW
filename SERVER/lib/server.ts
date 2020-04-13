import { IncomingMessage, ServerResponse } from 'http'
import { config } from "./config";
import { MyRouter } from "./router"
import { CarController } from "./controllers/CarController"
import * as mongoose from "mongoose";
import { Car } from 'models/Car';
import { Inject } from "typescript-ioc";
// check if a file exists - read the api docs to learn how to check if a file exists
// there is a special variable in each module __dirname it contains the directory name of this file

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request: IncomingMessage, response: ServerResponse) {
    console.log(request.method);
    let identiifiers = request.url.split('/');
    console.log(identiifiers);
    let asd = new CarController;

    const { db: { host, port, name } } = config;
    const mongoUrl = 'mongodb://localhost:27017/CarsDatabase';





    MyRouter.route(request, response);



}
).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');


/*
      if (!err) {
            var dotoffset = request.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                ? 'text/plain'
                : {
                    '.html': 'text/html',
                    '.ico': 'image/x-icon',
                    '.jpg': 'image/jpeg',
                    '.png': 'image/png',
                    '.gif': 'image/gif',
                    '.css': 'text/css',
                    '.js': 'text/javascript',
                    '.json': 'application/json'
                }[request.url.substr(dotoffset)];
            response.setHeader('Content-type', mimetype);
            response.end(data);
            console.log(request.url, mimetype);
        } else {
            console.log('file not found: ' + request.url);
               response.writeHead(404, "Not Found");
            response.end();
        }
*/