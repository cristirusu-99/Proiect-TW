import { IncomingMessage, ServerResponse } from 'http'
import { config } from "./config";
var http = require('http');
var fs = require('fs');
var path = require('path');

export class MyRouter {

    private static mapGet: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapPost: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapPut: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapDelete: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};


    public static get(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapGet[path] = functie;
    }

    public static post(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapPost[path] = functie;
    }

    public static put(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapPut[path] = functie;
    }

    public static delete(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapDelete[path] = functie;
    }


    public static route(request: IncomingMessage, response: ServerResponse): void {

        switch (request.method) {
            default: { response.end("Eroare"); response.writeHead(404, "Eroare"); } break;
            case "GET": { this.check(this.mapGet, request, response); } break;
            case "POST": { this.check(this.mapPost, request, response); } break;
            case "PUT": { this.check(this.mapPut, request, response); } break;
            case "DELETE": { this.check(this.mapDelete, request, response); } break;
        }
    }

    public static check(map: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } }, request: IncomingMessage, response: ServerResponse): void {
        const { app: { adresaApi, deniedPath } } = config;

        if (request.url.match(adresaApi) != null) {
            let path = request.url.split("?");
            console.log(path);
            if (map[path[0]] == undefined) {
                console.log('file not found: ' + request.url);
                response.writeHead(404, "Not Found");
                response.end();
            } else {
                map[path[0]](request, response);
            }
        }
        else {
            console.log('request ', request.url);

            var filePath = './Front-End/html' + request.url;
            if (filePath == './Front-End/html/') {
                filePath = './Front-End/html/index.html';
            }

            console.log('path: ', filePath);

            if (filePath.match(deniedPath) != null) {
                fs.readFile('./403.html', function (error, content) {
                    response.writeHead(403, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }

            var extname = String(path.extname(filePath)).toLowerCase();
            var mimeTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.wav': 'audio/wav',
                '.mp4': 'video/mp4',
                '.woff': 'application/font-woff',
                '.ttf': 'application/font-ttf',
                '.eot': 'application/vnd.ms-fontobject',
                '.otf': 'application/font-otf',
                '.wasm': 'application/wasm'
            };

            var contentType = mimeTypes[extname] || 'application/octet-stream';

            fs.readFile(filePath, function (error, content) {
                if (error) {
                    if (error.code == 'ENOENT') {
                        fs.readFile('./404.html', function (error, content) {
                            response.writeHead(404, { 'Content-Type': 'text/html' });
                            response.end(content, 'utf-8');
                        });
                    }
                    else {
                        response.writeHead(500);
                        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    }
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
    }


}



