export function MovieList({ movies, onSelect, page, onSetPage, totalResults }) {
    const numPages = Math.ceil(totalResults / 10);

    const handlePrev = () => {
        onSetPage((p) => p - 1);
    };

    const handleNext = () => {
        onSetPage((p) => p + 1);
    };

    return (
        <>
            <ul className="list list-movies">
                {movies.map((movie) => (
                    <Movie
                        movie={movie}
                        onSelect={onSelect}
                        key={movie.imdbID}
                    />
                ))}
            </ul>
            {movies.length > 0 && (
                <div className="pagination-container">
                    {page - 1 > 0 && (
                        <div>
                            <button onClick={handlePrev}>&larr; prev</button>
                        </div>
                    )}
                    <span
                        style={
                            page - 1 === 0 && movies.length < 10
                                ? {
                                      display: 'block',
                                      position: 'static',
                                      transform: 'none',
                                      margin: '0 auto .25rem',
                                  }
                                : {}
                        }
                    >
                        <p>{`Page ${page}/${numPages}`}</p>
                    </span>
                    {movies.length === 10 && (
                        <div>
                            <button onClick={handleNext}>next &rarr;</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

const movieItemStyle = {
    cursor: 'pointer',
};

function Movie({ movie, onSelect }) {
    const poster = movie.Poster === 'N/A' ? '/movie-clapper.png' : movie.Poster;

    const handleSelectMovie = (id) => {
        onSelect(id);
        if (window.innerWidth < 600) window.scrollTo(0, 126);
    };

    return (
        <li
            style={movieItemStyle}
            onClick={() => handleSelectMovie(movie.imdbID)}
        >
            <img src={poster} alt={`${movie.Title}`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
