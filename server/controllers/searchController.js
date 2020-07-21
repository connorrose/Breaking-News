/* eslint-disable no-underscore-dangle */
const axios = require('axios');

const search = {};
// req.query.spot = search string

search.fetchQuery = async (req, res, next) => {
  try {
    // call surfline API with search query & attach hits array to res.locals
    const searchResult = await axios.get(
      `https://services.surfline.com/search/site?q=${req.query.spot}`
    );

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

/*
https://services.surfline.com/search/site?q={venice}

[
  {
    hits: {
      hits: [
        {
          _id: String
          _score: Number
          _source: {
            breadCrumbs: [country, state, county] (Strings)
            name: String
          }
        },
        { next spot }
      ]
    }
  },
  {#2 @ index 1}
]

*/
