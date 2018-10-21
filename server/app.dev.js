const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
const compiler = webpack(webpackConfig);
const { getAssetManifest } = require('./utils');
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
	serverSideRender: true,
	noInfo: true,
	publicPath: webpackConfig.output.publicPath
});
const app = express();

let assetManifest = null;

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(webpackDevMiddleware);
app.use(
	require('webpack-hot-middleware')(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	})
);

app.use('/api/count', (req, res) => {
	res.json({ count: 100 });
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

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;
