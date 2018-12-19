var supertest = require("supertest");
var should = require("should");
var mocha = require('mocha');

var server = supertest.agent("http://localhost:4001");


describe("GET /users", function() {
    it("should show users", function(done){

        server.get('http://localhost:${4001}/users')
        .get("/users")
        .expect("me", "/users")
        .expect(200)
        .end(function(err,res) {
            if (res){
                console.log("success")
            }
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            done();
        });
    });
});