var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
var jwtAuth = require("../middlewares/jwtAuth");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', userController.postUser);

router.patch('/',  userController.patchUser);



module.exports = router;
