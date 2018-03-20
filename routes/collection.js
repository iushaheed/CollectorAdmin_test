var express = require('express');
var con = require('./../connection');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render('collection', { resultArray: result, title: "users" });
  });
});
module.exports = router;
