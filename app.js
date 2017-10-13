const express = require('express');
const bodyParser= require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 4000));

const routes = require('./routes');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

// serve the API
app.use('/api/', routes);

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ', app.get('port'));
});