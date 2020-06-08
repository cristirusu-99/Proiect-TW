"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require("mongoose");
require('../../models/Car');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
describe('/GET cars status code 2XX', () => {
    describe('200 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {
        it('it should GET an object', (done) => {
            chai.request(server)
                .get("/api/v1/cars/byid?_ID=5eddfc5d0470073b8c00228c") // a se schimba in functie de DB!!! Rusu: 5ea173377ea1f143746d68d5 || Milea: 5ea049b9a2dbb33538d92f79
                .end((err, res) => {
                //  console.log(res)
                res.should.have.status(200);
                let raspuns = JSON.parse(res.text);
                expect(raspuns[0]).to.be.eql({
                    _id: '5eddfc5d0470073b8c00228c',
                    AN: 2019,
                    JUDET: 'BUCURESTI',
                    CATEGORIENATIONALA: 'AUTOTURISM',
                    CATEGORIECOMUNITARA: 'M1  ',
                    MARCA: 'DACIA',
                    DESCRIERECOMERCIALA: '',
                    TOTALVEHICULE: 123157
                });
                done();
            });
        });
        it('it should GET all cars where JUDET=IASI as a json ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?JUDET=IASI")
                .end((err, res) => {
                let rezultat = JSON.parse(res.text);
                if (rezultat.length > 100)
                    done();
            });
        });
    });
    // DE VERIFICAT DACA NU FACE URAT CAND II CERI PENTRU TABEL !!!
    describe('204 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {
        it('it should GET status code 204 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?JUDET=numeInvalid")
                .end((err, res) => {
                res.should.have.status(204);
                expect(res.text).to.have.lengthOf(0);
                done();
            });
        });
        it('1 it should GET status code 204 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?JUDET=numeInvalid")
                .end((err, res) => {
                res.should.have.status(204);
                expect(res.text).to.have.lengthOf(0);
                done();
            });
        });
        it('2 it should GET status code 204 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?=")
                .end((err, res) => {
                res.should.have.status(204);
                expect(res.text).to.have.lengthOf(0);
                done();
            });
        });
        it('3 it should GET status code 204 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?=&&")
                .end((err, res) => {
                res.should.have.status(204);
                expect(res.text).to.have.lengthOf(0);
                done();
            });
        });
        it('4 it should GET status code 204 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by?aaaa=aaa&b=b&c=c")
                .end((err, res) => {
                res.should.have.status(204);
                expect(res.text).to.have.lengthOf(0);
                done();
            });
        });
    });
});
//# sourceMappingURL=get2XX.js.map