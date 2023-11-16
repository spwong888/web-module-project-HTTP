import React from 'react';

const MovieFooter = (props) => {
  const { totalMovies } = props;

  return (
    <footer className="clearfix footer">
      <div className="hint-text">Showing <b>{totalMovies}</b> movies</div>
    </footer>
  );
};


export default MovieFooter;
