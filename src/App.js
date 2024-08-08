// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import { useMovies } from './useMovies';
import { useLocalStorage } from './useLocalStorage';

// COMPONENT FILES
import { Navbar, Search, NumResults } from './Navigation';
import { Main, Box } from './Main';
import { MovieList } from './Movies';
import { MovieDetails } from './MovieDetails';
import { WatchedSummary, WatchedList } from './Watched';
import { Loader, ErrorMessage } from './Utils';

// APP
export default function App() {
    const [watched, setWatched] = useLocalStorage([], 'watched');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedMovId, setSelectedMovId] = useState('');
    const [totalResults, setTotalResults] = useState(0);

    const { movies, isLoading, error } = useMovies(
        query,
        page,
        setSelectedMovId,
        setTotalResults
    );

    const handleCloseMovie = () => {
        setSelectedMovId('');
    };

    return (
        <>
            <Navbar>
                <Search
                    onSetQuery={setQuery}
                    onSetPage={setPage}
                    onSetTotalResults={setTotalResults}
                />
                <NumResults totalResults={totalResults} />
            </Navbar>
            <Main>
                <Box>
                    {error && <ErrorMessage message={error} />}
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelect={setSelectedMovId}
                            page={page}
                            onSetPage={setPage}
                            totalResults={totalResults}
                        />
                    )}
                </Box>
                <Box>
                    {selectedMovId ? (
                        <MovieDetails
                            selectedMovId={selectedMovId}
                            onCloseMovie={handleCloseMovie}
                            watched={watched}
                            onSetWatched={setWatched}
                            key={selectedMovId}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList
                                watched={watched}
                                onSetWatched={setWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
