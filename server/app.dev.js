const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const router = new Router();
const webpack = require('webpack');
const webpackCfg = require('../config/webpack.config.dev');
const compiler = webpack(webpackCfg);
const webpackDevMiddlewareApply = require('./middlewares/webpackDev');
const webpackHotMiddlewareApply = require('./middlewares/webpackHot');
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: webpackCfg.output.publicPath,
});
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: console.log,
	path:'/__webpack_hmr',
	heartbeat: 10 * 1000,
})
app.use(webpackDevMiddlewareApply(webpackDevMiddleware));
app.use(webpackHotMiddlewareApply(webpackHotMiddleware));
const getAssetManifest = () => {
	console.log('path', path.resolve(__dirname, '../build/asset-manifest.json'));
	try {
		const content = webpackDevMiddleware.fileSystem.readdirSync(__dirname, '/../build/asset-manifest.json');
		return JSON.parse(content);
	} catch (err) {
		console.log(err);
		return {};
	}
};
// only for server
const assetMainifest = require(path.resolve(__dirname, '../build/asset-manifest.json'));
app.use(
	views(__dirname + '/views', {
		extension: 'ejs'
	})
);
app.use(koaStatic(path.resolve(__dirname, '../build')));
app.on('error', (err, ctx) => {
	console.log(err);
	ctx.body = 'ssr';
});
router.get('/a/:id', async (ctx, next) => {
	ctx.body = 'STO2018101701472800';
	console.log(ctx.params.id);
});
router.get('*', async (ctx, next) => {
	// const assetMainifest = getAssetManifest();
	// console.log(assetMainifest);
	await ctx.render('index', {
		title: 'ssr',
		PUBLIC_URL: '',
		assetMainifest,
	});
	next();
});
app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;
