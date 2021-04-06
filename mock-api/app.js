const express = require('express');
const apiMocker = require('connect-api-mocker');
const cors = require('cors');

const port = 9000;
const app = express();

app.use(cors());
// '/' is the base path that will match the root of our mocked-api address.
app.use('/', apiMocker('mock-api'));
 
console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);