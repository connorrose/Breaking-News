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

router.post('/time/:days', userController.findUser, userController.setLeadTime, (req, res) => {
  const leadTime = res.locals.leadTime || null;
  res.status(200).json({ leadTime });
});

router.post(
  '/height/:height',
  userController.findUser,
  userController.setMinWaveHeight,
  (req, res) => {
    const minWaveHeight = res.locals.minWaveHeight || null;
    res.status(200).json({ minWaveHeight });
  }
);

module.exports = router;
