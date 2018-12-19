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

router.post('/', function(req, res, next) {
    let contact = req.body;
    db.collection('contacts').insert(contact, function(err, result) {
        console.log(err, result);
        res.send("Contact created successfully");
    });
});


router.get('/', function(req, res, next) {
    db.collection('contacts').find({}).toArray(function(err, contact) {
        console.log(err, contact);
        res.send(contact);
    });
});

router.put('/:id', function(req, res, next) {
    let id = req.params.id;
    let contact = req.body;
    db.collection('contacts').update({'_id':new BSON.ObjectID(id)}, contact, {safe: true}, function(err, contact) {
        if (err) {
            console.log("There is an error");
        } else {
            res.send(contact);
        }
    });
});

router.delete('/:id', function(req, res) {
    let id = req.params.id;
    let contact = req.body;
    db.collection('contacts').remove({'_id':new BSON.ObjectID(id)}, contact, {safe: true}, function(err, contact) {
        if (err) {
            console.log("There is an error");
        } else {
            res.send(contact);
        }
    });
});
module.exports = router;