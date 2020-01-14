import React, { Component } from 'react';
import { Store } from '@tipser/tipser-elements';

import { Header } from '../components/header';

export class StoreView extends Component {

    static getTipserDataToFetch() {
        return [[], [], true];
    }

    render() {
        return (
            <>
                <Header />
                <main>
                    <div className="container">
                        <h4>Store</h4>
                        <Store />
                    </div>
                </main>
            </>
        );
    }
}
