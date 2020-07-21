/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Surf-App',
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const spotSchema = new Schema({
  surflineID: { type: String, required: true },
  spotName: { type: String, required: true },
  humanRelation: { type: String, required: true },
  waterTemp: {
    min: Number,
    max: Number,
  },
  // timestamp of last Surfline API fetch
  lastRetrieved: { type: Date, default: Date.now },

  forecast: [
    {
      timestamp: Number,
      surf: {
        min: Number,
        max: Number,
        optimalScore: Number,
      },
    },
  ],
});

const Spot = mongoose.model('spot', spotSchema);

module.exports = {
  Spot,
};
