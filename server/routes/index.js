var db = require('./database');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/getAllUser', function(req, res){
    db.collection("neTrendData").find({}, function(data){
        res.send(data[0]);
    });
    // res.render('index', { title: 'Express' });
});

module.exports = router;
