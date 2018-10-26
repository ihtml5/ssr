const express = require('express');
const path = require('path');
const webpack = require('webpack');
<<<<<<< HEAD
<<<<<<< HEAD
const webpackConfig = require('../config/webpack.config.ssr.js');
=======
const webpackConfig = require('../config/webpack.config.dev.js');
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
=======
const webpackConfig = require('../config/webpack.config.dev.js');
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
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
<<<<<<< HEAD
<<<<<<< HEAD
app.use('/', routes);
=======
app.use('*', routes);

>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
=======
app.use('*', routes);

>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
module.exports = app;
