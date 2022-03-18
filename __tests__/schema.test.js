require('dotenv').config();
const { describe, it } = require('mocha');
const url = process.env.URL;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Authentication', () => {
    let authToken = "", secret = "some secret";
    describe('/POST /auth/createToken', () => {
        it('it should return a token', (done) => {
            const testData = {
                data: {
                    a: "a",
                    b: "b"
                },
                secret,
                expiresIn: 2000
            }
            chai.request(url)
                .post('auth/createToken').send(testData)
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('authToken');
                    authToken = res.body.authToken;
                    done();
                });
        });
    });

    describe('/POST /auth/checkToken', () => {
        it('it should return a decoded token', (done) => {
            const testData = {
                secret,
                authToken
            }
            chai.request(url)
                .post('auth/checkToken').send(testData)
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('decoded');
                    done();
                });
        });
    });
});
