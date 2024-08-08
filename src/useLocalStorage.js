import { useState, useEffect } from 'react';

export function useLocalStorage(initalState, key) {
    const [value, setValue] = useState(() => {
        const stored = JSON.parse(localStorage.getItem(key));
        return stored ? stored : initalState;
    });

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
