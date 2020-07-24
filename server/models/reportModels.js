/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { MONGO_URI, NODE_ENV } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: 'Surf-App',
  })
  .then(() => console.log('Connected to MongoDB: Surf-App'))
  .catch((err) => console.log(err));

// Set 1 hour document expiration in development, 18 hours in production
// TODO: Check if millisecond conversion is needed
const expiry = NODE_ENV === 'development' ? 3600 : 64800;

// SPOT
const spotSchema = new Schema({
  surflineID: { type: String, required: true },
  spotName: { type: String, required: true },
  humanRelation: { type: String, required: true },
  waterTemp: {
    min: Number,
    max: Number,
  },
  // timestamp of last Surfline API fetch
  lastRetrieved: { type: Date, default: Date.now, expires: expiry },
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

// USER
const userSchema = new Schema({
  username: { type: String, required: true },
  homeBreak: {
    breakName: { type: String },
    surflineID: { type: String },
  },
  days: { type: Number, default: 2 },
  height: { type: Number, default: 1 },
});

const User = mongoose.model('user', userSchema);

module.exports = {
  Spot,
  User,
};
