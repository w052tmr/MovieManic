import { useState, useEffect } from 'react';

const apiKey = '7676b39a';

export function useMovies(
    query,
    page,
    setSelectedCallback,
    setTotalResCallback
) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(
        function () {
            async function fetchMovies() {
                // const controller = new AbortController()
                try {
                    setIsLoading(true);
                    setError('');
                    setSelectedCallback?.('');
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`
                        // { signal: controller.signal }
                    );

                    if (!res.ok) {
                        throw new Error('Failed to Fetch');
                    }

                    const data = await res.json();
                    if (data.Response === 'False')
                        throw new Error('No Results Found');

                    setMovies(data.Search);
                    setTotalResCallback?.(data.totalResults);
                    // console.log(data.Search);
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error(error.message);
                        setError(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }

            fetchMovies();

            // return () => controller.abort();
        },
        [query, page, setSelectedCallback, setTotalResCallback]
    );

    return { movies, isLoading, error };
}
