const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authorize } = require('../middlewares/jwtAuth'); // Doğru yolu kontrol edin

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', userController.postUser);
router.patch('/update', authorize, userController.patchUser);

module.exports = router;
