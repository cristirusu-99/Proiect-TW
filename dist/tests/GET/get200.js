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
describe('Cars', () => {
    describe('/GET cars status code 200 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {
        it('it should GET an object', (done) => {
            chai.request(server)
                .get("/api/v1/cars/byid?_ID=5ea049b9a2dbb33538d92f79")
                .end((err, res) => {
                //  console.log(res)
                res.should.have.status(200);
                var raspuns = JSON.parse(res.text);
                expect(raspuns[0]).to.be.eql({
                    _id: '5ea049b9a2dbb33538d92f79',
                    JUDET: 'BUCURESTI',
                    CATEGORIENATIONALA: 'AUTOTURISM',
                    CATEGORIECOMUNITARA: 'M1  ',
                    MARCA: 'DACIA',
                    DESCRIERECOMERCIALA: '',
                    TOTALVEHICULE: '123157'
                });
                done();
            });
        });
        it('it should GET status code 200', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?JUDET=IASI")
                .end((err, res) => {
                var rezultat = JSON.parse(res.text);
                if (rezultat.length > 100)
                    done();
            });
        });
        it('it should GET status code 200 but size 0', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?JUDET=numeInvalid")
                .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.have.lengthOf(2);
                done();
            });
        });
        it('1 it should GET status code 200 but size 0', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?JUDET=numeInvalid")
                .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.have.lengthOf(2);
                done();
            });
        });
        it('2 it should GET status code 200 but size 0', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?=")
                .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.have.lengthOf(2);
                done();
            });
        });
        it('3 it should GET status code 200 but size 0', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?=&&")
                .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.have.lengthOf(2);
                done();
            });
        });
        it('4 it should GET status code 200 but size 0', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?aaaa=aaa&b=b&c=c")
                .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.have.lengthOf(2);
                done();
            });
        });
    });
});
//# sourceMappingURL=get200.js.map