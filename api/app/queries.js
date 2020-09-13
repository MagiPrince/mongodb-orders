require('dotenv').config();
const u = require('./utils');
const MongoClient = require('mongodb').MongoClient;

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

let db;
MongoClient.connect(url, function(err, client) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected successfully to db at "' + url + '/' + dbName + '"');
        db = client.db(dbName);
    }
});

exports.byCustomerPseudo = (req, res) => {
    u.logReq(req);
    db.collection('orders').find({ 'customer.pseudo': { $eq: req.params.pseudo } }).toArray((err, docs) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(docs);
        res.json(docs);
    });
}
