"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const HttpCodes_1 = require("../util/HttpCodes");
var http = require('http');
var fs = require('fs');
var path = require('path');
class MyRouter {
    static get(path, functie) {
        this.mapGet[path] = functie;
    }
    static post(path, functie) {
        this.mapPost[path] = functie;
    }
    static put(path, functie) {
        this.mapPut[path] = functie;
    }
    static delete(path, functie) {
        this.mapDelete[path] = functie;
    }
    static route(request, response) {
        switch (request.method) {
            default:
                {
                    response.end("Eroare");
                    response.writeHead(404, "Eroare");
                }
                break;
            case "GET":
                {
                    this.check(this.mapGet, request, response);
                }
                break;
            case "POST":
                {
                    this.check(this.mapPost, request, response);
                }
                break;
            case "PUT":
                {
                    this.check(this.mapPut, request, response);
                }
                break;
            case "DELETE":
                {
                    this.check(this.mapDelete, request, response);
                }
                break;
        }
    }
    static check(map, request, response) {
        const { app: { adresaApi, deniedPath } } = config_1.config;
        if (request.url.match(deniedPath) != null) {
            fs.readFile('./403.html', function (error, content) {
                response.writeHead(HttpCodes_1.HttpCodes.HttpStatus_Forbidden, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
            });
        }
        if (request.url.match(adresaApi) != null) {
            let path = request.url.split("?");
            if (map[path[0]] == undefined) {
                response.writeHead(HttpCodes_1.HttpCodes.HttpStatus_NotFound, "File Not Found");
                response.end();
            }
            else {
                map[path[0]](request, response);
            }
        }
        else {
            var filePath = './Front-End/html' + request.url;
            if (filePath == './Front-End/html/') {
                filePath = './Front-End/html/index.html';
            }
            var extname = String(path.extname(filePath)).toLowerCase();
            const mimeTypes = config_1.config.mimeType;
            var contentType = mimeTypes[extname] || 'application/octet-stream';
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    if (error.code == 'ENOENT') {
                        fs.readFile('./404.html', function (error, content) {
                            response.writeHead(HttpCodes_1.HttpCodes.HttpStatus_NotFound, { 'Content-Type': 'text/html' });
                            response.end(content, 'utf-8');
                        });
                    }
                    else {
                        response.writeHead(HttpCodes_1.HttpCodes.HttpStatus_InternalServerError);
                        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    }
                }
                else {
                    response.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
    }
}
exports.MyRouter = MyRouter;
MyRouter.mapGet = {};
MyRouter.mapPost = {};
MyRouter.mapPut = {};
MyRouter.mapDelete = {};
//# sourceMappingURL=Router.js.map