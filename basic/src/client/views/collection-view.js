import React, { Component } from 'react';
import { Collection } from '@tipser/tipser-elements';

import { Header } from '../components/header';

export class CollectionView extends Component {

    static getTipserDataToFetch(match) {
        const { collectionId } = match.params;
        return [[], [collectionId], false];
    }

    render() {
        const { collectionId } = this.props.match.params;

        return (
            <>
                <Header />
                <main>
                    <div className="container">
                        <h4>Collection</h4>
                        <Collection collectionId={collectionId} />
                        <Collection collectionId={collectionId} carousel/>
                    </div>
                </main>
            </>
        );
    }
}
