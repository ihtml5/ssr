const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
	serverSideRender: true,
	noInfo: true, 
	publicPath: webpackConfig.output.publicPath
});
console.log('output::::', webpackConfig.output.publicPath);
const isObject = require('is-object');
function getAssetManifest(res) {
	const content = res.locals.fs.readFileSync(__dirname + '/../build/asset-manifest.json');
	return JSON.parse(content);
}
function normalizeAssets(assets) {
	if (assets) {
		return Object.values(assets);
	}
	return Array.isArray(assets) ? assets : [ assets ];
}
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
	// console.log('output', res.locals.webpackStats.toJson().assetsByChunkName);
	// if (!assetManifest) {
	// 	assetManifest = getAssetManifest(res);
	// }
	const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
	const fs = res.locals.fs;
	console.log(assetsByChunkName);
	const outputPath = res.locals.webpackStats.toJson().outputPath;
	// return res.render('index', {
	// 	title: 'ssr',
	// 	PUBLIC_URL: '',
	// 	assetManifest: 
	// });
	return res.send(`
<html>
  <head>
    <title>ssr</title>
    <style>
		${normalizeAssets(assetsByChunkName.main)
			.filter((path) => path.endsWith('.css'))
			.map((path) => fs.readFileSync(outputPath + '/' + path))
			.join('\n')}
    </style>
  </head>
  <body>
	<div id="root"></div>
	${normalizeAssets(assetsByChunkName['runtime~main'])
		.filter((path) => path.endsWith('.js'))
		.map((path) => `<script src="${path}"></script>`)
		.join('\n')}
	${normalizeAssets(assetsByChunkName['vendors'])
		.filter((path) => path.endsWith('.js'))
		.map((path) => `<script src="${path}"></script>`)
		.join('\n')}
		${normalizeAssets(assetsByChunkName.main)
			.filter((path) => path.endsWith('.js'))
			.map((path) => `<script src="${path}"></script>`)
			.join('\n')}
  </body>
</html>
  `);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;
