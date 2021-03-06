export { };
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require("mongoose");
require('../../models/Car');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
chai.should();
chai.use(chaiHttp);
chai.use(require('chai-json'));
//Our parent block


describe('/GET cars status code 4XX', () => {
    describe('403 COMMANDS SHOULD NOT RETURN FORBIDDEN FILES', () => {
        it('1 it should GET status code 403 ', (done) => {
            chai.request(server)
                .get("/../../index")
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
        
        it('2 it should try to GET all cars as a json but will GET status code 403 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by??")
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

    });
    describe('404 COMMANDS SHOULD NOT RETURN WHEN THERE IS NO RESULT', () => {
        it('1 it should GET status code 404 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/pathInvalid")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('2 it should GET status code 404 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/pathInvalid?")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('3 it should GET status code 404 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/pathInvalid?=")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('4 it should GET status code 404 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/pathInvalid&MARCA=AUDI")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('5 it should GET status code 404 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/by&MARCA=AUDI")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('6 it should GET status code 404 ', (done) => {
            chai.request(server)
                .get("/api/v1/cars/")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });
});