var express = require('express');
var router = express.Router();
var path = require('path')

router.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'homepage.html'));
});

module.exports = router;
