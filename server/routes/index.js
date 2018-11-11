import { Router } from 'express';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
const { getAssetManifest } = require('../utils');
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import routes from '../../src/routes';
import reducers from '../../src/reducers';

const assetManifestForProd = require(path.resolve(__dirname, '../../build/asset-manifest.json'));
const router = Router();
let assetManifest = null;
const isProd = process.env.NODE_ENV === 'production';
const store = createStore(reducers, applyMiddleware(thunk));

router.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route }) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function
      ? fetchData(store)
      : Promise.resolve(null);
  });
  console.log('req.url', req.url);
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
      assetManifest = isProd ? assetManifestForProd : getAssetManifest(res);
    }
    // let template = fs.readFileSync(path.resolve(__dirname, '../../build/index.html'), 'utf-8');
    res.render('index', {
      title: isProd ? 'muso-ssr-prod' : 'muso-ssr',
      PUBLIC_URL: '',
      isProd,
      assetManifest,
      data: store.getState(),
      appHtml,
    });
  });
});

module.exports = router;
