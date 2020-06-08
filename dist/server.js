"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const Router_1 = require("./util/Router");
const controllers_1 = require("./controllers");
const MyMongoDB_1 = require("./repository/MyMongoDB");
const AdminController_1 = require("./controllers/AdminController");
//fisier de initializare a serverului
const http = require('http');
const { app: { port } } = config_1.config;
new controllers_1.CarController;
new AdminController_1.AdminController;
MyMongoDB_1.MyMongo.init("CarsDatabase");
const server = http.createServer(function (request, response) {
    Router_1.MyRouter.route(request, response);
});
server.listen(port);
console.log('Server running at http://127.0.0.1:' + port + '/');
module.exports = server;
//# sourceMappingURL=server.js.map