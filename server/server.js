/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const GitHubStrategy = require('passport-github2').Strategy;

require('dotenv').config();

const { User } = require('./models/reportModels');
const apiRouter = require('./routes/api');
const searchRouter = require('./routes/search');
const userRouter = require('./routes/user');

/* ----- PRE-CONFIG ----- */

const SESSION_EXPIRY = 1000 * 60 * 60 * 24; // 1 day

// CONNECT SESSION STORE
const store = new MongoDBStore(
  {
    uri: process.env.MONGO_URI,
    collection: 'userSessions',
    expires: SESSION_EXPIRY,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  (err) => console.log(err || 'Session Store connection established')
);

store.on('error', (err) => console.log(`STORE ERROR: ${err}`));

// PASSPORT CONFIG
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://surfreport.dev/login/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOneAndUpdate(
        { username: profile.username },
        { username: profile.username },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, user) => done(err, user)
      );
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) =>
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => console.log(`Deserialize Error: ${err}`))
);

/* ----- APP CONFIG ----- */

// CREATE APP
const app = express();
const PORT = process.env.PORT || 3000;

// CREATE SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: SESSION_EXPIRY,
    },
    store,
    resave: false,
    saveUninitialized: true,
  })
);

// PARSE REQUEST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PASSPORT LAUNCH
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors());
app.options('*', cors());

/* ----- ENDPOINT ROUTES ----- */

// STATIC ASSETS
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// REPORT API ROUTING
app.use('/api', apiRouter);

// SEARCH ROUTING
app.use('/search', searchRouter);

// USER ROUTING
app.use('/user', userRouter);

// LOGIN ROUTING
app.get('/login/failed', (req, res) =>
  res.status(401).json({ success: false, message: 'user authentication failed' })
);

app.get('/login', passport.authenticate('github', { scope: ['read:user'] }));

app.get(
  '/login/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login/failed',
  })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('https://surfreport.dev/');
});

/* ----- ERROR HANDLING ----- */

// Catch-all route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'EXPRESS ERROR: handler caught unknown middleware error',
    status: 500,
    message: { error: 'An error occured' },
  };
  const error = { ...defaultErr, ...err };
  console.log(err.log);
  return res.status(error.status).json(error.message);
});

// LAUNCH
console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
