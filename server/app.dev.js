const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');
const views = require('koa-views');
const router = require('koa-router')(); 
const assetMainifest = require(path.resolve(__dirname, '../build/asset-manifest.json'));
app.use(koaStatic(path.resolve(__dirname, '../build')));

router.get('*', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Sample React App',
        PUBLIC_URL: '/',
        assetMainifest,
    });
});
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));
app.use(router.routes());
app.use(router.allowedMethods()); 
module.exports = app;

