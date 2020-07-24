const axios = require('axios');
const { Spot } = require('../models/reportModels');

const db = Spot;
const report = {};

report.searchDB = async (req, res, next) => {
  try {
    // Check database for existing report
    const { surflineID } = req.params;
    const result = await db.findOne({ surflineID });

    // If not found, proceed with middleware
    if (result === null) {
      res.locals.surflineID = surflineID;
      return next();
    }

    // Short-Circuit Response if report found in database
    const { spotName, humanRelation, waterTemp, forecast } = result;
    return res.status(200).send({
      surflineID,
      spotName,
      humanRelation,
      waterTemp,
      forecast,
      message: 'Returned from cache',
    });
  } catch (err) {
    return next({ log: err.message });
  }
};

report.fetchData = async (req, res, next) => {
  try {
    // Query Surfline APIs for break details and forecast
    const { surflineID } = res.locals;
    const spotReport = axios.get(
      `https://services.surfline.com/kbyg/spots/reports?spotId=${surflineID}`
    );
    const forecast = axios.get(
      `https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${surflineID}&days=5&intervalHours=6`
    );
    const promArr = await Promise.all([spotReport, forecast]);

    // Store query responses
    res.locals.spotReport = promArr[0].data;
    res.locals.forecast = promArr[1].data;

    return next();
  } catch (err) {
    return next({ log: err.message });
  }
};

report.processData = async (req, res, next) => {
  const { spotReport, forecast, surflineID } = res.locals;

  // Process API data for database & client
  res.locals.finalReport = {
    surflineID,
    spotName: spotReport.spot.name,
    humanRelation: spotReport.forecast.waveHeight.humanRelation,
    waterTemp: spotReport.forecast.waterTemp,
    forecast: forecast.data.wave,
  };

  // Save new report to database
  try {
    await db.create(res.locals.finalReport);
    return next();
  } catch (err) {
    return next({ log: err.message });
  }
};

module.exports = report;
