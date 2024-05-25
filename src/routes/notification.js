var express = require('express');
var router = express.Router();
const notificationController = require('../controllers/notificationController');
var jwtAuth = require("../middlewares/jwtAuth");


router.post('/', jwtAuth.authorize, notificationController.postNotification);

router.get('/', jwtAuth.authorize, notificationController.getNotifications);

module.exports = router;