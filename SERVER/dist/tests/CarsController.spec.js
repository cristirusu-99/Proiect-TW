"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const mongoUnit = require("mongo-unit");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const dbData = require('SERVER/lib/tests/resources/CarsControllerTestData.json');
const cars = dbData['cars'];
const car = {};
const http = request('http');
before(() => mongoUnit
    .start());
beforeEach(() => mongoUnit.load(dbData));
afterEach(() => mongoUnit.drop());
after(() => mongoUnit.stop());
mocha_1.describe('/cars', () => {
    mocha_1.describe('GET /cars', () => {
        it('should return a list of 3 airports and the status 200', () => {
            return http.get('/api/v1/airports')
                .expect(200)
                .then(response => {
                chai_1.expect(response.body).to.eql(cars);
            });
        });
    });
});
//# sourceMappingURL=CarsController.spec.js.map