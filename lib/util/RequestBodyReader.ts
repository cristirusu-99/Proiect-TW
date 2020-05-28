import { IncomingMessage, ServerResponse } from 'http'
import { config } from "../config/config";
import { HttpCodes } from "../util/HttpCodes"
var http = require('http');
var fs = require('fs');
var path = require('path');

export class RequestBodyReader {
    private static bodyObj;

    public static readBody(request: IncomingMessage): JSON {
        let reqBody = '';
        console.log("aici ?");
        console.log(request.method, request.url, request.headers)
        //console.log(request);
        request.on('data', chunk => {
            console.log(reqBody);
            reqBody += chunk.toString();
        });
        request.on('end', () => {
            console.log(reqBody);
          return  this.setBodyObj(JSON.parse(reqBody));
        });
        return this.getBodyObj();
        
    }

    private static setBodyObj(body: JSON) {
        this.bodyObj = body;
    }

    public static getBodyObj(): JSON {
        return this.bodyObj;
    }
}