export { };
import {MyMongo} from '../../repository/MyMongoDB'
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let cars = require("../resources/CarsControllerTestData.json");
let carsVector = cars['cars'];
let car = cars['car'];

let posts = require("../resources/PostRequestBodyEx.json")
let postOne = posts['postOneEx'];
let postMany = posts['postManyEx']

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

describe('/POST cars status code 2XX', () => {

    describe('200 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {

        it('it should POST a car in the database ', (done) => {
            chai.request(server)
                .post('/api/v1/admin/addone')
                .type('form')
                .send(JSON.stringify(postOne))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql("ok");
                    chai.request(server)
                        .get("/api/v1/cars/by?_id=" + JSON.parse(car._id))
                        .end((err, res) => {
                            res.should.have.status(200);
                            var raspuns = JSON.parse(res.text);
                            expect(raspuns[0]).to.be.eql(car)
                            done();
                        });
                });
        });
        it('it should POST a vector of cars in the database ', (done) => {

            var ary = new Array(); //Ary Debug master
            // console.log("Test: " + typeof(ary));
            ary.push(car);
            for (var i = 0; i < carsVector.length; i++) {
                ary.push(carsVector[i]);
            }
            chai.request(server)
                .post('/api/v1/admin/addmany')
                .type('form')
<<<<<<< HEAD:lib/tests/PUT/put2XX.ts
                .send(JSON.stringify(carsVector))
=======
                .send(JSON.stringify(postMany))
>>>>>>> beafe4e6d534bc677880a46ba43b61bcdd562795:lib/tests/POST/post2XX.ts
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql("ok");

                    chai.request(server)
                        .get("/api/v1/cars/by?JUDET=" + carsVector[0].JUDET)
                        .end((err, res) => {
                            res.should.have.status(200);
                            var raspuns = JSON.parse(res.text);
                            expect(raspuns).to.be.eql(ary);
                            done();
                        });
                });
        });
    });
});