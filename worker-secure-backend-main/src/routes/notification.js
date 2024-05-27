const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const jwtAuth = require("../middlewares/jwtAuth");

router.post('/', jwtAuth.authorize, notificationController.postNotification);
router.get('/', jwtAuth.authorize, notificationController.getNotifications);

module.exports = router;


