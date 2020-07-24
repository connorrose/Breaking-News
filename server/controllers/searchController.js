const axios = require('axios');

const search = {};

search.fetchQuery = async (req, res, next) => {
  // call surfline API with search query & attach hits array to res.locals
  // req.query.spot = search string
  try {
    const searchResult = await axios.get(
      `https://services.surfline.com/search/site?q=${req.query.spot}`
    );

    // See notes.txt for response shape
    res.locals.hits = searchResult.data[0].hits.hits;
    return next();
  } catch (err) {
    return next({ log: err });
  }
};

search.processData = (req, res, next) => {
  res.locals.hits = res.locals.hits.map((result) => ({
    surflineID: result._id,
    spotName: result._source.name,
    country: result._source.breadCrumbs[0],
    state: result._source.breadCrumbs[1],
    score: result._score,
  }));

  next();
};

module.exports = search;
