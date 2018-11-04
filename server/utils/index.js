const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const isProd = process.env.NODE_ENV === 'production';
function getAssetManifest(res) {
	if (isProd) {
		return {};
	}
	const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
	return {
		['main.js']: normalizeAssets(assetsByChunkName.main).filter((path) => path.endsWith('.js'))[0],
		['vendors.js']: normalizeAssets(assetsByChunkName.vendors).filter((path) => path.endsWith('.js'))[0],
		['runtime~main.js']: normalizeAssets(assetsByChunkName['runtime~main']).filter((path) =>
			path.endsWith('.js')
		)[0]
	}
}
function normalizeAssets(assets) {
	if (isObject(assets)) {
		return Object.values(assets);
	}
	return Array.isArray(assets) ? assets : [ assets ];
}


module.exports = {
    getAssetManifest,
};