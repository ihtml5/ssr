require('ignore-styles');
require("@babel/register");
require('@babel/polyfill');
// https://stackoverflow.com/questions/47441428/why-cant-i-import-css-files-for-my-react-server-side-rendering-app
require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif','webp'],
    limit: 10000,
    name:'static/media/[name].[ext]',
});
const isProd = process.env.NODE_ENV === 'production';
const app = isProd ? require('./app.prod.js') : require('./app.dev.js');
const PROT = process.env.PROT || 3000;
// https://github.com/webpack-contrib/webpack-hot-middleware/issues/21
app.listen(PROT, () => {
    console.log(`running in ${isProd ? 'production' : 'development'}`);
    console.log(`listening on port: ${PROT}`);
});
