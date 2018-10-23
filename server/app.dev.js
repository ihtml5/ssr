const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
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
app.use('/ssr', routes);
app.get('*', (req, res) => {
  if (!assetManifest) {
    assetManifest = getAssetManifest(res);
  }
  return res.render('index', {
    title: 'muso-ssr',
    PUBLIC_URL: '',
    isProd: false,
    assetManifest,
  });
});

module.exports = app;
