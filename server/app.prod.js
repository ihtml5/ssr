const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/', routes);
module.exports = app;
