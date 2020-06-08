import { IncomingMessage, ServerResponse } from 'http'
import { config } from "./config";
import { MyRouter } from "./util/Router"
import { CarController } from "./controllers"
import {MyMongo} from './repository/MyMongoDB'
import { AdminController } from './controllers/AdminController';

//fisier de initializare a serverului

const http = require('http');
const {app :{port} } = config;
new CarController;
new AdminController;
MyMongo.init("CarsDatabase");
const server = http.createServer(function (request: IncomingMessage, response: ServerResponse) {
        MyRouter.route(request, response);
    }
);

server.listen(port);
console.log('Server running at http://127.0.0.1:' + port + '/');


module.exports = server;

