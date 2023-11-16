import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteMovieList = (props) => {
  const { favoriteMovies } = props;

  return (
    <div className="col-xs savedContainer">
      <h5>Favorite Movies</h5>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie, index) => (
          <Link key={`${movie.id}-${index}`} className="btn btn-light savedButton" to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        ))
      ) : (
        <p>No favorite movies available.</p>
      )}
    </div>
  );
};

export default FavoriteMovieList;
