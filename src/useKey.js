import { useEffect } from 'react';

export function useKey(key, action) {
    useEffect(
        function () {
            const handleKey = (e) => {
                if (e.code.toLowerCase() === key.toLowerCase()) action();
            };

            document.addEventListener('keydown', handleKey);

            return () => {
                document.removeEventListener('keydown', handleKey);
            };
        },
        [key, action]
    );
}
