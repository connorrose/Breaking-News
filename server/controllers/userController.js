const { Spot, User } = require('../models/reportModels');

const userController = {};

userController.findUser = async (req, res, next) => {
  // console.log(`SESSION: ${JSON.stringify(req.session)}`);
  const { passport } = req.session;

  // Check if user info is attached to session via passport
  if (passport !== undefined) {
    const userID = passport.user;
    try {
      // Get user data
      const userData = await User.findOne({ _id: userID });
      let { username, homeBreak, days, height } = userData;

      // Get break name from Surfline ID
      if (homeBreak) {
        const { spotName } = await Spot.findOne({ surflineID: homeBreak });
        homeBreak = spotName;
      }

      // Validate
      username = username || 'unknown user';
      homeBreak = homeBreak || null;
      days = days || 2;
      height = height || 1;

      // Save user object for response
      res.locals.user = { username, homeBreak, days, height };
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.findUser during User lookup: ${err}`,
        messge: { err: 'There was an error retrieving your user information' },
      });
    }
  } else {
    // Return empty object to client if user does not exist
    res.locals.user = {};
    return next();
  }
};

userController.setHomeBreak = async (req, res, next) => {
  // req.params.surflineID
  const { surflineID } = req.params;
  if (surflineID) {
    try {
      const { spotName } = await Spot.findOne({ surflineID });
      if (spotName) {
        const userID = req.session.passport.user;
        await User.findOneAndUpdate({ _id: userID }, { homeBreak: surflineID });
        res.locals.spotName = spotName;
        return next();
      }
      return next({ log: 'Could not locate break in databse' });
    } catch (err) {
      return next({ log: `Error setting user break: ${err}` });
    }
  } else {
    return next({ message: { err: 'What have you done?!' } });
  }
};

module.exports = userController;
