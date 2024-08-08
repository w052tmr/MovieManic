//REACT HOOKS
import { useState, useEffect } from 'react';
import { useKey } from './useKey';

// COMPONENT FILES
import { Loader, ErrorMessage } from './Utils';
import StarRating from './StarRating';

// GLOBALS
const apiKey = '7676b39a';

export function MovieDetails({
    selectedMovId,
    onCloseMovie,
    watched,
    onSetWatched,
}) {
    const [movieData, setMovieData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userRating, setUserRating] = useState(0);

    const isWatched = watched
        .map((movie) => movie.imdbID)
        .includes(selectedMovId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedMovId
    )?.userRating;

    useKey('Escape', onCloseMovie);

    useEffect(
        function () {
            async function fetchMovieData() {
                try {
                    setIsLoading(true);
                    const res = await fetch(
                        `https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovId}&plot=full`
                    );

                    if (!res.ok) throw new Error('Failed to fetch');

                    const data = await res.json();
                    setMovieData(data);
                    // console.log(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }

            fetchMovieData();
        },
        [selectedMovId]
    );

    useEffect(
        function () {
            if (!movieData.Title) return;

            document.title = `Movie | ${movieData.Title}`;

            return () => (document.title = 'MovieManic');
        },
        [movieData.Title]
    );

    const handleAddWatched = () => {
        const newWatchedMovie = {
            imdbID: movieData.imdbID,
            poster: movieData.Poster,
            title: movieData.Title,
            runtime: Number(movieData.Runtime.split(' ')[0]),
            imdbRating: Number(movieData.imdbRating),
            userRating: Number(userRating),
        };
        onSetWatched((watchedList) => [...watchedList, newWatchedMovie]);
        onCloseMovie();
    };

    return (
        <div className="details">
            {error && <ErrorMessage message={error} />}
            {isLoading && <Loader />}
            {!error && !isLoading && (
                <>
                    <button className="btn-back" onClick={() => onCloseMovie()}>
                        &larr;
                    </button>
                    <header>
                        <img src={movieData.Poster} alt={movieData.Title} />
                        <div className="details-overview">
                            <h2>{movieData.Title}</h2>
                            <p>
                                {`${movieData.Released} `}
                                &bull;
                                {` ${movieData.Runtime}`}
                            </p>
                            <p>{movieData.Genre}</p>
                            <p>⭐{movieData.imdbRating} IMDB rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {isWatched ? (
                                <p>
                                    You gave this movie a rating of{' '}
                                    {watchedUserRating} ⭐
                                </p>
                            ) : (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={20}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating ? (
                                        <button
                                            className="btn-add"
                                            onClick={handleAddWatched}
                                        >
                                            + Add to list
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                </>
                            )}
                        </div>
                        <p>{movieData.Plot}</p>
                        <p>Starring {movieData.Actors}</p>
                        {movieData.Director !== 'N/A' && (
                            <p>Directed by {movieData.Director}</p>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
