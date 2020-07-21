const router = require('express').Router();
const reportController = require('../controllers/reportController');

router.get(
  '/:surflineID',
  reportController.searchDB,
  reportController.fetchData,
  reportController.processData,
  reportController.updateDB,
  (req, res) => {
    res.status(200).json(res.locals.finalReport);
  }
);

module.exports = router;
