var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/engrams', function(req, res, next) {
  res.send(require('../data/engrams.json'));
});

module.exports = router;
