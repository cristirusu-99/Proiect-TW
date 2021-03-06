export { };
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let cars = require("../resources/CarsControllerTestData.json");
let car = cars['car'];

let puts = require("../resources/PutRequestBodyEx.json");
let putWrongUser = puts['putForbiddenUserEx'];
let putWrongToken = puts['putForbiddenTokenEx'];
require("mongoose");
require('../../models/Car');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
chai.should();
chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('/PUT cars status code 2XX', () => {

    describe('200 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {

        it('it should try to UPDATE cars in the database with a wrong username ', (done) => {
            chai.request(server)
                .put('/api/v1/admin/update?JUDET='+car.JUDET)
                .type('form')
                .send(JSON.stringify(putWrongUser))
                .end((err, res) => {
                    res.should.have.status(403);
                    done()
                });
        });
        it('it should try to UPDATE cars in the database with a wrong session token ', (done) => {
            chai.request(server)
                .put('/api/v1/admin/update?JUDET='+car.JUDET)
                .type('form')
                .send(JSON.stringify(putWrongToken))
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

    });
});