var express = require('express');
var con = require('./../connection');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM collectors";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render('control_panel', { resultArray: result, title: "Control Panel" });
  });
});
module.exports = router;
