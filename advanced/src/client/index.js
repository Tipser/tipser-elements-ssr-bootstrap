import App from './App';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {hydrate} from 'react-dom';
import {SsrTipserElementsProvider, TipserElementsProvider} from '@tipser/tipser-elements';

hydrate(
    <TipserElementsProvider posId="59e86b79b8f3f60a94ecd26a">
        <SsrTipserElementsProvider initialState={window.TIPSER_STATE}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </SsrTipserElementsProvider>
    </TipserElementsProvider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
