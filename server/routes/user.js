const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.findUser, (req, res) => {
  const userData = res.locals.user || {};
  res.status(200).json(userData);
});

router.post(
  '/break/:surflineID',
  userController.findUser,
  userController.setHomeBreak,
  (req, res) => {
    const homeBreak = res.locals.breakName || null;
    res.status(200).json({ homeBreak });
  }
);

module.exports = router;
