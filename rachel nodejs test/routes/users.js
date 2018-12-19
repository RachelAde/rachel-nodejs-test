var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'contactdb';
const BSON = require('bson');


let db;

MongoClient.connect(url, function(err, client){
    if (err) {
        console.log('There was an error!');
    } else{
        db = client.db(dbName);
        console.log("Connected succesfully");
    }   
});


router.post('/signup', function(req, res) {
    db.collection('users').insert(req.body, function(err, user) {
        console.log(err, user);
        res.send("User created successfully!");
    });
});

router.get('/', function(req, res) {
    db.collection('users').find({}).toArray(function(err, user) {
        console.log(err, user);
        res.send(user);
    });
})

router.post('/login/', function(req, res) {
    // let id = req.params.id;
     let username = req.body.username;
     let password = req.body.password;
    db.collection('users').findOne({username:  username, password: password}, function(err, user) {
        if(username == user.username){
            if(password == user.password){
                req.session.user = user;
                res.send("Login successful!");
            } else{
            res.send("Wrong password!");
            }
        } else {
            res.send("Wrong username!");
        }
    });
});

router.get('/dashboard', function(req, res) {
    if (!req.session.user) {
        return res.status(401).send();
    }
    return res.status(200).send("Welcome!");
});



module.exports = router;