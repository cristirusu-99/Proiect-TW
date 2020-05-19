"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Book = require('../../models/Car');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
const expect = chai.expect;
const host = "http://localhost:3000";
const path = "/api/v1/cars/by?JUDET=GALATI";
chai.use(chaiHttp);
chai.use(require('chai-json'));
//Our parent block
describe('Books', () => {
    /*
      * Test the /GET route
      */
    describe('/GET cars', () => {
        const request = chai.request(server);
    });
});
//# sourceMappingURL=getService.js.map