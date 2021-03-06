import * as React from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '@tipser/tipser-elements';
import './header.css';

export class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <nav className="navigation">
                    <ul className="horizontal-menu">
                        <li className="horizontal-item">
                            <Link to="/">Example store</Link>
                        </li>
                        <li className="horizontal-item">
                            <Link to="/product/589c82198aa0ce70743b0442">Example product</Link>
                        </li>
                        <li className="horizontal-item">
                            <Link to="/collection/5b1a709d9d25800ff0e9a314">Example collection</Link>
                        </li>
                        <li className="horizontal-item">
                            <a className="link" href="https://developers.tipser.com" target="_blank" rel="noopener noreferrer">
                                Tipser Developers
                            </a>
                        </li>
                        <li className="horizontal-item">
                            <a
                                className="link"
                                href="https://tipser.github.io/docs/#tipser-elements"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Tipser Elements documentation
                            </a>
                        </li>
                        <li className="horizontal-item">
                            <a
                                className="link"
                                href="https://github.com/Tipser/tipser-elements-react-bootstrap"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub repo of this page
                            </a>
                        </li>

                    </ul>
                    {/* Inserting the Tipser cart Icon */}
                    <Cart />
                </nav>
            </header>
        );
    }
}
