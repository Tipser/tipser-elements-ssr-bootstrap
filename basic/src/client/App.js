import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {ProductView} from './views/product-view';
import {CollectionView} from './views/collection-view';
import {StoreView} from './views/store-view';
import {NotFoundView} from './views/not-found-view';

import './App.css';

const createRoute = (path, component, exact = false) => ({
    path, exact, component
});

export const ROUTES = [
    createRoute('/', StoreView, true),
    createRoute('/product/:productId', ProductView),
    createRoute('/collection/:collectionId', CollectionView),
    createRoute('*', NotFoundView),
];

const App = () => (
    <Switch>
        {ROUTES.map(({path, component, exact}) => <Route key={path} path={path} component={component} exact={exact}/>)}
    </Switch>
);

export default App;
