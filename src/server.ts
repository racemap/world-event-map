const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.WEB_APP_PORT;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});