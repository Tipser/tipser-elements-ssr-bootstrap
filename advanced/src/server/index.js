import 'isomorphic-fetch'

import React from 'react';
import {StaticRouter, matchPath} from 'react-router-dom';
import express from 'express';
import {renderToString} from 'react-dom/server';
import {
    TipserElementsProvider,
    SsrTipserElementsProvider,
    ComponentsStateSsrManager
} from '@tipser/tipser-elements';

import App from '../client/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

const POS_ID = '59e86b79b8f3f60a94ecd26a';

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const componentsStateSsrManager = new ComponentsStateSsrManager(POS_ID, 'prod')
        const context = {};

        const toRender = (
            <TipserElementsProvider posId={POS_ID}>
                <SsrTipserElementsProvider componentsStateManager={componentsStateSsrManager}>
                    <StaticRouter context={context} location={req.url}>
                        <App/>
                    </StaticRouter>
                </SsrTipserElementsProvider>
            </TipserElementsProvider>
        );

        renderToString(toRender);

        componentsStateSsrManager.buildState().then(() => {
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
        <script>window.TIPSER_STATE = ${JSON.stringify(componentsStateSsrManager.getState())}</script>
        <div id="root">${markup}</div>
    </body>
</html>`
                );
            }
        });
    });

export default server;
