var express = require('express');
var router = express.Router();
const cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: 'sa as' });
});

module.exports = router;
