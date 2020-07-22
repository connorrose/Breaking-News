/* eslint-disable no-console */

const path = require('path');
const express = require('express');

require('dotenv').config();

const apiRouter = require('./routes/api');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse request body
app.use(express.json());

// Serve static assets
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// REPORT API ROUTING
app.use('/api', apiRouter);

// SEARCH ROUTING
app.use('/search', searchRouter);

// USER ROUTING
// not yet implemented => app.use('login', loginRouter);

// Catch-all route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'EXPRESS ERROR: handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const error = { ...defaultErr, ...err };
  console.log(error.log);
  return res.status(error.status).json(error.message);
});

// Launch
console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
