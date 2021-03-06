import React, { Component } from 'react';
import { Product } from '@tipser/tipser-elements';

import { Header } from '../components/header';

export class ProductView extends Component {

    static getTipserDataToFetch(match) {
        const { productId } = match.params;
        return [[productId], [], false];
    }

    render() {
        const { productId } = this.props.match.params;

        return (
            <>
                <Header />
                <main>
                    <div className="container">
                        <h4>Product</h4>
                        <Product productId={productId} />
                        <h4>Product card</h4>
                        <Product productId={productId} renderer="card" />
                        <h4>Product card compact</h4>
                        <Product productId={productId} viewMode="compact" />
                    </div>
                </main>
            </>
        );
    }
}
