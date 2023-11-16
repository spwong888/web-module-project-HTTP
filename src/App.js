import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm'; 
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import axios from 'axios';
import { Link } from "react-router-dom";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
    // You can update favoriteMovies state accordingly
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Link to="/movies" className="btn btn-primary">View All Movies</Link>
      <Link to="/movies/add" className="btn btn-success">
        <i className="material-icons">&#xE147;</i> <span>Add New Movie</span>
      </Link>
          <Routes>
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies} />} />
            <Route path="movies/:id" element={<Movie addToFavorites={addToFavorites} />} />
            <Route path="movies" element={<MovieList movies={movies} deleteMovie={deleteMovie} />} />
            <Route path="/" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
