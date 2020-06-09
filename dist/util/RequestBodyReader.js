"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var fs = require('fs');
var path = require('path');
class RequestBodyReader {
    static readBody(request) {
        let reqBody = '';
        console.log("aici ?");
        console.log(request.method, request.url, request.headers);
        //console.log(request);
        request.on('data', chunk => {
            console.log(reqBody);
            reqBody += chunk.toString();
        });
        request.on('end', () => {
            console.log(reqBody);
            return this.setBodyObj(JSON.parse(reqBody));
        });
        return this.getBodyObj();
    }
    static setBodyObj(body) {
        this.bodyObj = body;
    }
    static getBodyObj() {
        return this.bodyObj;
    }
}
exports.RequestBodyReader = RequestBodyReader;
//# sourceMappingURL=RequestBodyReader.js.map