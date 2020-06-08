export { };
import {MyMongo} from '../../repository/MyMongoDB'
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let cars = require("../resources/CarsControllerTestData.json");
let car = cars['car'];
let carsIncVector = cars['updatedCarsInc'];
let carInc = cars['updatedCarInc'];
let carsSetVector = cars['updatedCarsSet'];
let carSet = cars['updatedCarSet'];
let carsFinalVector = cars['finalCars'];
let carFinal = cars['finalCar'];

let puts = require("../resources/PutRequestBodyEx.json");
let putInc = puts['putIncrementEx'];
let putSet = puts['putSetEx'];
let putMixed = puts['putMixedEx'];

let aryInc = new Array(); //Ary Debug master
// console.log("Test: " + typeof(ary));
aryInc.push(carInc);
for (var i = 0; i < carsIncVector.length; i++) {
    aryInc.push(carsIncVector[i]);
}

let arySet = new Array(); //Ary Debug master
// console.log("Test: " + typeof(ary));
arySet.push(carSet);
for (var i = 0; i < carsSetVector.length; i++) {
    arySet.push(carsSetVector[i]);
}

let aryFinal = new Array(); //Ary Debug master
// console.log("Test: " + typeof(ary));
aryFinal.push(carFinal);
for (var i = 0; i < carsFinalVector.length; i++) {
    aryFinal.push(carsFinalVector[i]);
}

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

describe('/PUT cars status code 2XX', () => {

    describe('200 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {

        it('it should UPDATE a car in the database, incrementing the TOTALVEHICULE field by 1 ', (done) => {
            chai.request(server)
                .get('/api/v1/admin/getsessiontoken?USERNAME=bd29cfd49ddf77a8b2921c02dc880d54fce6cb77e048ae9c92980801')
                .end((err, res) => {
                    res.should.have.status(200);
                    let raspuns = JSON.parse(res.text);
                    putInc.sessionToken = raspuns.sessionToken;
                    chai.request(server)
                        .put('/api/v1/admin/update?JUDET='+car.JUDET)
                        .type('form')
                        .send(JSON.stringify(putInc))
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.text.should.be.eql("ok");
                            chai.request(server)
                                .get("/api/v1/cars/by?JUDET=" + car.JUDET)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    let raspuns = JSON.parse(res.text);
                                    expect(raspuns).to.be.eql(aryInc)
                                    done();
                                });
                        });
                });

        });
        it('it should UPDATE a car in the database, setting new values to its fields, except _id ', (done) => {
            chai.request(server)
                .get('/api/v1/admin/getsessiontoken?USERNAME=bd29cfd49ddf77a8b2921c02dc880d54fce6cb77e048ae9c92980801')
                .end((err, res) => {
                    res.should.have.status(200);
                    let raspuns = JSON.parse(res.text);
                    putSet.sessionToken = raspuns.sessionToken;
                    chai.request(server)
                        .put('/api/v1/admin/update?JUDET='+car.JUDET)
                        .type('form')
                        .send(JSON.stringify(putSet))
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.text.should.be.eql("ok");
                            chai.request(server)
                                .get("/api/v1/cars/by?JUDET=" + car.JUDET)
                                .end((err, res) => {
                                    res.should.have.status(204);
                                    chai.request(server)
                                        .get("/api/v1/cars/by?JUDET=" + carSet.JUDET)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            let raspuns = JSON.parse(res.text);
                                            expect(raspuns).to.be.eql(arySet)
                                            done();
                                        });
                                });
                        });
                });
        });
        it('it should UPDATE a car in the database, setting new values to its fields, except _id and TOTALVEHICULE, and increment TOTALVEHICULE by 1 ', (done) => {
            chai.request(server)
                .get('/api/v1/admin/getsessiontoken?USERNAME=bd29cfd49ddf77a8b2921c02dc880d54fce6cb77e048ae9c92980801')
                .end((err, res) => {
                    res.should.have.status(200);
                    let raspuns = JSON.parse(res.text);
                    putMixed.sessionToken = raspuns.sessionToken;
                    chai.request(server)
                        .put('/api/v1/admin/update?JUDET='+carSet.JUDET)
                        .type('form')
                        .send(JSON.stringify(putMixed))
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.text.should.be.eql("ok");
                            chai.request(server)
                                .get("/api/v1/cars/by?JUDET=" + carSet.JUDET)
                                .end((err, res) => {
                                    res.should.have.status(204);
                                    chai.request(server)
                                        .get("/api/v1/cars/by?JUDET=" + carFinal.JUDET)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            let raspuns = JSON.parse(res.text);
                                            expect(raspuns).to.be.eql(aryFinal)
                                            done();
                                        });
                                });
                        });
                });
        });
    });
});