const axios = require('axios');
const { Spot } = require('../models/reportModels');

const db = Spot;
const report = {};

report.searchDB = async (req, res, next) => {
  try {
    // 1) check database for matching report
    const { surflineID } = req.params;
    const result = await db.findOne({ surflineID });

    // If not found, proceed with middleware
    if (result === null) return next();

    // 2) If found, directly return response
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
    // 3) Query Surfline API
    const { surflineID } = req.params;
    const spotReport = axios.get(
      `https://services.surfline.com/kbyg/spots/reports?spotId=${surflineID}`
    );
    const forecast = axios.get(
      `https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${surflineID}&days=5&intervalHours=6`
    );
    // Store response on res.locals
    res.locals.surflineID = surflineID;
    const promArr = await Promise.all([spotReport, forecast]);
    res.locals.spotReport = promArr[0].data;
    res.locals.forecast = promArr[1].data;

    return next();
  } catch (err) {
    return next({ log: err.message });
  }
};

// 4) process data from surfline API
report.processData = (req, res, next) => {
  const { spotReport, forecast, surflineID } = res.locals;

  res.locals.finalReport = {
    surflineID,
    spotName: spotReport.spot.name,
    humanRelation: spotReport.forecast.waveHeight.humanRelation,
    waterTemp: spotReport.forecast.waterTemp,
    forecast: forecast.data.wave,
  };

  return next();
};

report.updateDB = async (req, res, next) => {
  try {
    // 5) write updated report to database
    await db.create(res.locals.finalReport);

    res.locals.finalReport.message = 'Succesfully saved new surf report';
    return next();
  } catch (err) {
    return next({ log: err.message });
  }
};

module.exports = report;

// VENICE BREAKWATER: 590927576a2e4300134fbed8
// MALIBU SURFRIDER: 5a8cacffb0f634001ada08fb

// https://services.surfline.com/kbyg/spots/reports?spotId={spotId}
/* Surfline Response
{
  spot: {
    name: String
  },
  forecast: {
    waveHeight: {
      min: Integer,
      max: Integer,
      humanRelation: String
    },
    tide: {
     // Misc tide info 
    },
    waterTemp: {
      min: Integer,
      max: Integer
    },
    weather: {
      temperature: Integer
    }
  }
}
*/

// https://services.surfline.com/kbyg/spots/forecasts/{type}?{params}
// https://services.surfline.com/kbyg/spots/forecasts/wave?spotId={spotId}&days=1&intervalHours=3
/* Surfline Reponse
{
  data: {
    wave: [
      {
        timestamp: number,
        surf: {
          min: Float,
          max: Float,
          optimalScore: float
        }
      },
      {
        // more timestamps
      },
    ]
  }
}
*/
