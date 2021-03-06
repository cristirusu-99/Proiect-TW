"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let posts = require("../resources/PostRequestBodyEx.json");
let postOFUEx = posts['postOneForbiddenUserEx'];
let postMFUEx = posts['postManyForbiddenUserEx'];
let postOFTEx = posts['postOneForbiddenTokenEx'];
let postMFTEx = posts['postManyForbiddenTokenEx'];
require("mongoose");
require('../../models/Car');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
chai.should();
chai.use(chaiHttp);
chai.use(require('chai-json'));
describe('/POST cars status code 4XX', () => {
    describe('403 SHOULD NOT ALLOW COMMANDS FROM USERS WITH WRONG NAMES AND/OR TOKENS', () => {
        it('it should try to POST a car in the database with a wrong userName', (done) => {
            chai.request(server)
                .post('/api/v1/admin/addone')
                .type('form')
                .send(JSON.stringify(postOFUEx))
                .end((err, res) => {
                res.should.have.status(403);
                done();
            });
        });
        it('it should try to POST a car in the database with a wrong sessionToken', (done) => {
            chai.request(server)
                .post('/api/v1/admin/addone')
                .type('form')
                .send(JSON.stringify(postOFTEx))
                .end((err, res) => {
                res.should.have.status(403);
                done();
            });
        });
        it('it should try to POST a vector of cars in the database with a wrong userName', (done) => {
            chai.request(server)
                .post('/api/v1/admin/addmany')
                .type('form')
                .send(JSON.stringify(postMFUEx))
                .end((err, res) => {
                res.should.have.status(403);
                done();
            });
        });
        it('it should try to POST a vector of cars in the database with a wrong sessionToken', (done) => {
            chai.request(server)
                .post('/api/v1/admin/addmany')
                .type('form')
                .send(JSON.stringify(postMFTEx))
                .end((err, res) => {
                res.should.have.status(403);
                done();
            });
        });
    });
});
//# sourceMappingURL=post4XX.js.map