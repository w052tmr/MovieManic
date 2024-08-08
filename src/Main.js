import { useState } from 'react';

export function Main({ children }) {
    return <main className="main">{children}</main>;
}

export function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? '-' : '+'}
            </button>
            {isOpen && children}
        </div>
    );
}
