const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.ssr.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  serverSideRender: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
});
const routes = require('./routes/index');
const app = express();
app.use(webpackDevMiddleware);
app.use(
  require('webpack-hot-middleware')(compiler, {
    log: () => {},
    path: '/__webpack_hmr',
    heartbeat: 20000,
  }),
);
app.use(express.static(path.resolve(__dirname, '../build')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/', routes);
module.exports = app;
