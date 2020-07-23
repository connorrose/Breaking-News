const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.findUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;
