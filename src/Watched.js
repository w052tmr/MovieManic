const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummary({ watched }) {
    const avgImdbRating = average(
        watched.map((movie) => movie.imdbRating)
    ).toPrecision(2);
    const avgUserRating = average(
        watched.map((movie) => movie.userRating)
    ).toPrecision(2);
    const avgRuntime = average(
        watched.map((movie) => movie.runtime)
    ).toPrecision(3);

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <div>
                    <p>
                        <span>⭐️</span>
                        <span>{avgImdbRating}</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span>{avgUserRating}</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span>{avgRuntime} min</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export function WatchedList({ watched, onSetWatched }) {
    const handleDelWatched = (id) => {
        onSetWatched(watched.filter((movie) => movie.imdbID !== id));
    };

    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteWatched={handleDelWatched}
                />
            ))}
        </ul>
    );
}

function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
}
