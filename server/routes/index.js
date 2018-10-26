import { Router } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
const { getAssetManifest } = require('../utils');
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import routes from '../../src/routes';
import reducers from '../../src/reducers';

const router = Router();
let assetManifest = null;
const store = createStore(reducers, applyMiddleware(thunk));

router.get('*', (req, res) => {
<<<<<<< HEAD
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route }) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function
      ? fetchData(store)
      : Promise.resolve(null);
  });
  console.warn('req.url', req.url);
  return Promise.all(promises).then(data => {
    let context = {};
    const appHtml = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>,
    );
    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }
    if (!assetManifest) {
      assetManifest = getAssetManifest(res);
    }
    res.render('index', {
      title: 'muso-ssr',
      PUBLIC_URL: '',
      isProd: process.env.NODE_ENV === 'production',
      assetManifest,
      data: store.getState(),
      appHtml,
    });
  });
=======
	const branch = matchRoutes(routes, req.url);
	const promises = branch.map(({ route }) => {
		let fetchData = route.component.fetchData;
		return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
	});
	return Promise.all(promises).then((data) => {
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
			assetManifest = getAssetManifest(res);
		}
		res.render('index', {
			title: 'muso-ssr',
			PUBLIC_URL: '',
			isProd: process.env.NODE_ENV === 'production',
			assetManifest,
			data: store.getState(),
			appHtml
		});
	});
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
});

module.exports = router;
