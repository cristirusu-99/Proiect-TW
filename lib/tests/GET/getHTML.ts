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
const expect = chai.expect
chai.use(chaiHttp);
chai.use(require('chai-json'));


describe('/GET HTML/CSS/JS', () => {
    /*
      * Test the /GET route
      */

    describe('HTML PAGES', () => {
        chai.request(server);
        it('1 it should be HTML ', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });

      /*  it('2 it should be HTML ', (done) => {
            chai.request(server)
                .get("/dateparcuri.html")
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        }); */

        it('3 it should be HTML ', (done) => {
            chai.request(server)
                .get("/mapMarker.html")
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });

        it('4 it should be HTML ', (done) => {
            chai.request(server)
                .get("/index.html")
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });

        it('5 it should be HTML ', (done) => {
            chai.request(server)
                .get("/statistics.html")
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });
    });


    describe('CSS PAGES', () => {



    });

    describe('JS PAGES', () => {



    });
});



