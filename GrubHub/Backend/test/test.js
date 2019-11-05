var chai = require('chai'), chaiHttp = require('chai-http');


chai.use(chaiHttp);

var expect = chai.expect;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWEiLCJpZCI6IjVkYWFhMzM1OTc3MjEyNDEyMGNiZWUyMiIsImVtYWlsIjoiYWEiLCJyYWRpbyI6ImJ1eWVyIiwiaWF0IjoxNTcyOTM0ODU1LCJleHAiOjE1NzI5Mzg0NTV9.Aan9hki9LROeDdTGIq6_1cm69QEVkDTWNmElj4eFT6k";

it("Login API should check credentials and return status code if correct credentials", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/login')
        .send({ "username": "aa", "password": "aa", "radio": "buyer" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("should update data in buyer profile", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/buyerprofile')
        .set("Authorization", "Bearer " + token)
        .send({ "username": "aa", "email": "aa", "phone": "12345" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("should update data in owner profile", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/ownerprofile')
        .send({ "username": "kafka", "email": "kafka", "phone": "1234", "restaurant": "kakfa", "cuisine": "bb", "idcookie": "5" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("should change the order status", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/changestatus')
        .send({ "status": "Delivered", "orderid": "135dbfe035eeced05202af76bc" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})


it("should delete the item form the items table", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/deletesectionitems')
        .send({ "itemid": "5dbf7ba5c329960bb2208823" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

