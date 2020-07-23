const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.findUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post('/break/:surflineID', userController.setHomeBreak, (req, res) => {
  res.status(200).json({ homeBreak: res.locals.spotName });
});

module.exports = router;
