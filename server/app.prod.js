const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const router = new Router();

const assetMainifest = require(path.resolve(__dirname, '../build/asset-manifest.json'));
app.use(koaStatic(path.resolve(__dirname, '../build')));
app.on('error', (err, ctx) => {
	console.log(err);
});
console.log(__dirname + '/views');
app.use(
	views(__dirname + '/views', {
		extension: 'ejs'
	})
);
router.get('*', async (ctx, next) => {
	await ctx.render('index', {
		title: 'ssr',
		PUBLIC_URL: '',
		assetMainifest
	});
	next();
});
app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;
