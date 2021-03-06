export { };
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let cars = require("../resources/CarsControllerTestData.json");
let carsVector = cars['cars'];
let car = cars['car'];

let posts = require("../resources/PostRequestBodyEx.json")
let postOne = posts['postOneEx'];
let postMany = posts['postManyEx']
require("mongoose");
require('../../models/Car');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
chai.should();
const expect = chai.expect
chai.use(chaiHttp);
chai.use(require('chai-json'));



describe('/POST cars status code 2XX', () => {
    describe('200 ALL COMANDS SHULD BE WORKING AS INTENDED', () => {
        it('it should POST a car in the database ', (done) => {
            chai.request(server)
                .get('/api/v1/admin/getsessiontoken?USERNAME=bd29cfd49ddf77a8b2921c02dc880d54fce6cb77e048ae9c92980801')
                .end((err, res) => {
                    res.should.have.status(200);
                    let raspuns = JSON.parse(res.text);
                    postOne.sessionToken = raspuns.sessionToken;
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
                                    let raspuns = JSON.parse(res.text);
                                    expect(raspuns[0]).to.be.eql(car)
                                    done();
                                });
                        });
                });
        });
        it('it should POST a vector of cars in the database ', (done) => {

            let ary = []; //Ary Debug master
            // console.log("Test: " + typeof(ary));
            ary.push(car);
            for (let i = 0; i < carsVector.length; i++) {
                ary.push(carsVector[i]);
            }
            chai.request(server)
                .get('/api/v1/admin/getsessiontoken?USERNAME=bd29cfd49ddf77a8b2921c02dc880d54fce6cb77e048ae9c92980801')
                .end((err, res) => {
                    res.should.have.status(200);
                    let raspuns = JSON.parse(res.text);
                    postMany.sessionToken = raspuns.sessionToken;chai.request(server)
                        .post('/api/v1/admin/addmany')
                        .type('form')
                        .send(JSON.stringify(postMany))
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.text.should.be.eql("ok");

                            chai.request(server)
                                .get("/api/v1/cars/by?JUDET=" + carsVector[0].JUDET + "&AN=" + carsVector[0].AN)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    let raspuns = JSON.parse(res.text);
                                    expect(raspuns).to.be.eql(ary);
                                    done();
                                });
                        });
                })

        });
    });
});