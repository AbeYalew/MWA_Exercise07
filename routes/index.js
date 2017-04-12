var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var crypto = require('crypto'),
    algorithm = 'aes256',
    password = 'asaadsaad'

const url = 'mongodb://localhost:27017/nearby';
/* GET home page. */

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

router.get('/', function(req, res, next) {

MongoClient.connect(url, (err, db) => {
  console.log('MongoDB Connected...');
  if(err) throw err;

  HM7 = db.collection('homework7');

  HM7.find().toArray(function (err, result) {
    if (err) throw err
    let msg=decrypt(result[0].message);
    console.log(msg)
    res.render('index', { msg: msg});
    db.close();
    console.log('closed');
  })
console.log('Still open ....');
})
      

});


// ------
module.exports = router;
