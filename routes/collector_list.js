var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('collector_list', { title: 'collector list' });
});

module.exports = router;
