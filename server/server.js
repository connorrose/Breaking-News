// launch express server @ port 3000
const path = require('path');
const express = require('express');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use('/', express.static(path.resolve(__dirname, '../dist')));

app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
