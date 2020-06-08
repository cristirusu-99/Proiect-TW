export { };
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let cars = require("../resources/CarsControllerTestData.json");
let carsVector = cars['finalCars'];
let car = cars['finalCar'];

let deleteJson = require("../resources/DeleteRequestBodyEx.json")
let deleteWrongUserAndToken = deleteJson['deleteForbidenUserEx']

let mongoose = require("mongoose");
let Book = require('../../models/Car');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
const expect = chai.expect

const host = "http://localhost:3000";
const path = "/api/v1/cars/by?JUDET=GALATI";

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('/DELETE cars status code 2XX', () => {

    describe('200 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {

        it('it should try to DELETE a car from the database added in the PUT test', (done) => {
            chai.request(server)
                .delete("/api/v1/admin/delete?_id=" + JSON.parse(car._id))
                .type('form')
                .send(JSON.stringify(deleteWrongUserAndToken))
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it('it should try to DELETE the rest of the cars, added in the PUT test, from the database', (done) => {
            chai.request(server)
                .delete("/api/v1/admin/delete?JUDET=" + carsVector[0].JUDET)
                .type('form')
                .send(JSON.stringify(deleteWrongUserAndToken))
                .end((err, res) => {
                    res.should.have.status(403);
                    done();

                });
        });
    });
});