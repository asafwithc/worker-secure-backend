const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtAuth = require("../middlewares/jwtAuth");

// Ensure User model is imported only once
const User = require('../models/user');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', userController.postUser);
router.patch('/update', userController.patchUser);

module.exports = router;
