"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const router_1 = require("./router");
const CarController_1 = require("./controllers/CarController");
<<<<<<< HEAD
const MyMongoDB_1 = require("./repository/MyMongoDB");
=======
>>>>>>> master
// check if a file exists - read the api docs to learn how to check if a file exists
// there is a special variable in each module __dirname it contains the directory name of this file
var http = require('http');
var url = require('url');
var fs = require('fs');
<<<<<<< HEAD
const { db: { host, name }, app: { port } } = config_1.config;
const CarControllerInit = new CarController_1.CarController;
MyMongoDB_1.MyMongo.init("CarsDatabase", "Car");
var server = http.createServer(function (request, response) {
    router_1.MyRouter.route(request, response);
});
server.listen(port);
console.log('Server running at http://127.0.0.1:' + port + '/');
=======
var server = http.createServer(function (request, response) {
    const CarControllerInit = new CarController_1.CarController;
    const { db: { host, port, name } } = config_1.config;
    const mongoUrl = 'mongodb://localhost:27017/CarsDatabase';
    router_1.MyRouter.route(request, response);
});
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
>>>>>>> master
module.exports = server;
//# sourceMappingURL=server.js.map