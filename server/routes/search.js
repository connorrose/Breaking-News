const router = require('express').Router();
const searchController = require('../controllers/searchController');

// QUERY
// base/search?spot={query}
router.get('/', searchController.fetchQuery, searchController.processData, (req, res) => {
  res.status(200).json({ results: res.locals.hits });
});

module.exports = router;
