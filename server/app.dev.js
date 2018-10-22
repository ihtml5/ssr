const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
const compiler = webpack(webpackConfig);
const { getAssetManifest } = require('./utils');
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  serverSideRender: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
});
const routes = require('./routes/index');
const app = express();
app.use(express.static(path.resolve(__dirname, '../build')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/', routes);

let assetManifest = null;

app.use(webpackDevMiddleware);
app.use(
  require('webpack-hot-middleware')(compiler, {
    log: () => {},
    path: '/__webpack_hmr',
    heartbeat: 20000,
  }),
);

app.use('/api/count', (req, res) => {
  res.json({ count: 100 });
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});
app.get('*', (req, res) => {
  if (!assetManifest) {
    assetManifest = getAssetManifest(res);
  }
  return res.render('index', {
    title: 'ssr-express',
    PUBLIC_URL: '',
    isProd: false,
    assetManifest,
  });
});

module.exports = app;
