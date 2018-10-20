const isProd = process.env.NODE_ENV === 'production';
const app = isProd ? require('./app.prod.js') : require('./app.dev.js');
console.log(app);
if (!isProd) {
    process.env.NODE_ENV = 'development';
}

const PROT = process.env.PROT || 9000;

app.listen(PROT, () => {
    console.log(`running in ${isProd ? 'production' : 'development'}`);
    console.log(`listening on port: ${PROT}`);
});