import { Router } from 'express';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
const { getAssetManifest } = require('../utils');
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import fetch from 'node-fetch';
import thunk from 'redux-thunk';
import routes from '../../src/routes';
import reducers from '../../src/reducers';

const assetManifestForProd = require(path.resolve(__dirname, '../../build/asset-manifest.json'));
const router = Router();
let assetManifest = null;
const isProd = process.env.NODE_ENV === 'production';
const store = createStore(reducers, applyMiddleware(thunk));

router.get('*', async (req, res) => {
  const branch = matchRoutes(routes, req.url);
  let initComment = null;
  let initData = null;
	if (req.url.indexOf('/ssr') !== -1) {
		initComment = await fetch(
			'https://view.inews.qq.com/getQQNewsComment?comment_id=3225403003&from=share&lcount=6&v=1542983392812&addNew=0&uniqueid=ukey_154298339222813714&tbkt=E'
		)
      .then(res => res.json());
    initData = await fetch(
			'http://test.view.inews.qq.com/getWXNewsContent?id=20171129V077OD00&path=a&tbkt=B1&openid=&app=news'
		)
      .then(res => res.json());
    console.log('initCommnet', initComment, typeof initComment);
	}
	const promises = branch.map(({ route }) => {
		let fetchData = route.component.fetchData;
		return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
	});
	return Promise.all(promises).then(data => {
		let context = {};
		const appHtml = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					{renderRoutes(routes)}
				</StaticRouter>
			</Provider>
		);
		if (context.status === 404) {
			res.status(404);
		}
		if (context.status === 302) {
			return res.redirect(302, context.url);
		}
		if (!assetManifest) {
			assetManifest = isProd ? assetManifestForProd : getAssetManifest(res);
		}
		res.render('index', {
			title: isProd ? 'muso-ssr-prod' : 'muso-ssr',
			PUBLIC_URL: '',
			isProd,
			assetManifest,
			data: store.getState(),
      appHtml,
      initComment,
      initData,
		});
	});
});

module.exports = router;
