import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EditMovieForm = (props) => {
  const navigate = useNavigate();

  const { setMovies } = props;
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:9000/api/movies/${id}`, movie);
      
      const updatedMovie = response.data;

      setMovies((prevMovies) => {
        const updatedMovies = prevMovies.map((m) =>
          m.id === updatedMovie.id ? updatedMovie : m
        );
        return updatedMovies;
      });

      navigate(`/movies/${id}`);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  }

  const { title, director, genre, metascore, description } = movie;

  const { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [id]);
  
  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
            </div>

          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save" />
            <Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>
        </form>
      </div>
    </div>);
}

export default EditMovieForm;
