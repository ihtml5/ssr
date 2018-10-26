require('ignore-styles');
require("@babel/register");
require('@babel/polyfill');
<<<<<<< HEAD
<<<<<<< HEAD
// const hook = require('css-modules-require-hook');
// hook({
//   generateScopedName: '[name]__[local]___[hash:base64:5]',
// });
=======
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
=======
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
// https://stackoverflow.com/questions/47441428/why-cant-i-import-css-files-for-my-react-server-side-rendering-app
require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif','webp'],
    limit: 10000,
    name:'static/media/[name].[ext]'
});
const isProd = process.env.NODE_ENV === 'production';
const app = isProd ? require('./app.prod.js') : require('./app.dev.js');
if (!isProd) {
    process.env.NODE_ENV = 'development';
}

<<<<<<< HEAD
<<<<<<< HEAD
const PROT = process.env.PROT || 3000;
=======
const PROT = process.env.PROT || 9000;
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
=======
const PROT = process.env.PROT || 9000;
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
// https://github.com/webpack-contrib/webpack-hot-middleware/issues/21
app.listen(PROT, () => {
    console.log(`running in ${isProd ? 'production' : 'development'}`);
    console.log(`listening on port: ${PROT}`);
    app.timeout = 100;
});
