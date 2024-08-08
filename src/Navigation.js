import { useState, useRef, useEffect } from 'react';
import { useKey } from './useKey';

export function Navbar({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🎬</span>
            <h1>MovieManic</h1>
        </div>
    );
}

export function Search({ onSetQuery, onSetPage, onSetTotalResults }) {
    const [inputVal, setInputVal] = useState('');
    const searchEl = useRef(null);

    useEffect(
        function () {
            const id = setTimeout(() => {
                onSetPage(1);
                onSetQuery(inputVal);
            }, 1000);

            return () => clearTimeout(id);
        },
        [inputVal, onSetQuery, onSetPage]
    );

    useKey('Enter', function () {
        if (searchEl.current === document.activeElement) return;

        setInputVal('');
        onSetQuery('');
        onSetTotalResults(0);
        searchEl.current.focus();
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            ref={searchEl}
        />
    );
}

export function NumResults({ totalResults }) {
    return (
        <p className="num-results">
            Found <strong>{totalResults}</strong> results
        </p>
    );
}
