var db = require('./database');

var express = require('express');
var router = express.Router();

/* 请求罗马尼亚ne界面的数据 */
router.post('/getTrend.action', function(req, res) {
    db.collection('neTrendData').find({}, function(data){
        res.send(data[0]);
    })
});

module.exports = router;