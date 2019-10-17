var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Login API should check credentials and return status code if correct credentials", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/login')
        .send({ "username": "poi", "password": "poi", "radio": "buyer" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("should update data in buyer profile", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/buyerprofile')
        .send({ "username": "qw", "email": "qw", "phone": "1234" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("should update data in owner profile", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/ownerprofile')
        .send({ "username": "bb", "email": "bb", "phone": "1234", "restaurant": "bb", "cuisine": "bb", "idcookie": "5" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("should change the order status", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/changestatus')
        .send({ "status": "Delivered", "orderid": "13" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})


it("should delete the item form the items table", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/deletesectionitems')
        .send({ "itemid": "7" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

