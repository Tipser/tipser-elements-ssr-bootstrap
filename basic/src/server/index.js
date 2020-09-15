import 'isomorphic-fetch'

import React from 'react';
import {StaticRouter, matchPath} from 'react-router-dom';
import express from 'express';
import {renderToString} from 'react-dom/server';
import {
    TipserElementsProvider,
    StateBuilder,
    SsrTipserElementsProvider,
} from '@tipser/tipser-elements';

import App, {ROUTES} from '../client/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

const POS_ID = '59e86b79b8f3f60a94ecd26a';
const stateBuilder = new StateBuilder(POS_ID);

function matchComponents(routes, url) {
    return routes
        .map(route => {
            const match = matchPath(url, {path: route.path, exact: route.exact});
            const {component} = route;
            return {match, component};
        })
        .filter(({match}) => !!match);
}

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const {path} = req;
        const matchedComponents = matchComponents(ROUTES, path);
        const dataToFetch = matchedComponents.reduce((acc, {component, match}) => {
            if (component.getTipserDataToFetch) {
                const [productIds, collectionIds, shouldFetchStore] = component.getTipserDataToFetch(match);
                acc.productIds = [...new Set(acc.productIds.concat(productIds))];
                acc.collectionIds = [...new Set(acc.collectionIds.concat(collectionIds))];
                acc.shouldFetchStore = acc.shouldFetchStore || shouldFetchStore;
            }
            return acc;
        }, {productIds: [], collectionIds: [], shouldFetchStore: false});
        stateBuilder.buildState(dataToFetch.productIds, dataToFetch.collectionIds, dataToFetch.shouldFetchStore).then((initialState) => {

            const context = {};

            const toRender = (
                <TipserElementsProvider posId={POS_ID}>
                    <SsrTipserElementsProvider initialState={initialState}>
                        <StaticRouter context={context} location={req.url}>
                            <App/>
                        </StaticRouter>
                    </SsrTipserElementsProvider>
                </TipserElementsProvider>
            );

            const markup = renderToString(toRender);

            if (context.url) {
                res.redirect(context.url);
            } else {
                res.status(200).send(
                    `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
                        assets.client.css
                            ? `<link rel="stylesheet" href="${assets.client.css}">`
                            : ''
                    }
        ${
                        process.env.NODE_ENV === 'production'
                            ? `<script src="${assets.client.js}" defer></script>`
                            : `<script src="${assets.client.js}" defer crossorigin></script>`
                    }
    </head>
    <body>
        <script>window.TIPSER_STATE = ${JSON.stringify(initialState)}</script>
        <div id="root">${markup}</div>
    </body>
</html>`
                );
            }
        });
    });

export default server;
