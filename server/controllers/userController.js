/* eslint-disable no-console */
const { Spot, User } = require('../models/reportModels');

const userController = {};

userController.findUser = async (req, res, next) => {
  try {
    const { passport } = req.session;

    // Check if user info is attached to session via passport
    if (passport !== undefined && passport.user !== undefined) {
      const userID = passport.user;

      // Get user data from database
      const userData = await User.findOne({ _id: userID });
      const { username, homeBreak, days, height } = userData;

      // Validate & build user object
      const userObj = {};
      userObj.userID = userID;
      userObj.username = username || 'username not found';
      userObj.days = days || 2;
      userObj.height = height || 1;
      if (typeof homeBreak === 'object') {
        const { breakName, surflineID } = homeBreak;

        userObj.homeBreak = {};
        userObj.homeBreak.breakName = breakName || null;
        userObj.homeBreak.surflineID = surflineID || null;
      } else {
        userObj.homeBreak = {};
      }

      res.locals.user = userObj;
    }

    return next();
  } catch (err) {
    console.log(`ERROR in userController.findUser: ${err}`);
    return next();
  }
};

userController.setHomeBreak = async (req, res, next) => {
  const { surflineID } = req.params;
  if (res.locals.user === undefined || typeof surflineID !== 'string') return next();

  try {
    const newBreak = await Spot.findOne({ surflineID });
    if (newBreak !== null) {
      const { userID } = res.locals.user;
      const { spotName } = newBreak;
      const breakName = spotName || 'name not found';
      const homeBreak = { breakName, surflineID };

      await User.findByIdAndUpdate(userID, { homeBreak });
      res.locals.breakName = breakName;
    }
    return next();
  } catch (err) {
    console.log(`ERROR in userController.setHomeBreak: ${err}`);
    return next();
  }
};

userController.setLeadTime = async (req, res, next) => {
  const { days } = req.params;
  if (res.locals.user === undefined || typeof days !== 'number') return next();

  try {
    const { userID } = res.locals.user;
    await User.findByIdAndUpdate(userID, { days });
    res.locals.leadTime = days;
    return next();
  } catch (err) {
    console.log(`ERROR in userController.setMinWaveHeight: ${err}`);
    return next();
  }
};

userController.setMinWaveHeight = async (req, res, next) => {
  const { height } = req.params;
  if (res.locals.user === undefined || typeof height !== 'number') return next();

  try {
    const { userID } = res.locals.user;
    await User.findByIdAndUpdate(userID, { height });
    res.locals.minWaveHeight = height;
    return next();
  } catch (err) {
    console.log(`ERROR in userController.setMinWaveHeight: ${err}`);
    return next();
  }
};

module.exports = userController;
