const isProd = process.env.NODE_ENV === 'production';
const app = isProd ? require('./app.prod.js') : require('./app.dev.js');
if (!isProd) {
    process.env.NODE_ENV = 'development';
}

const PROT = process.env.PROT || 9000;
// https://github.com/webpack-contrib/webpack-hot-middleware/issues/21
app.listen(PROT, () => {
    console.log(`running in ${isProd ? 'production' : 'development'}`);
    console.log(`listening on port: ${PROT}`);
    app.timeout = 100;
});
