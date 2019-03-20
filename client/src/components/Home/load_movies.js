import React from 'react'
import { Link } from 'react-router-dom';

const LoadMovies = (props) => {
  console.log("loadmovies props", props)
  const movies  = props.movies.results;
  const posterPath = 'https://image.tmdb.org/t/p/w300';
  return (
        <div className="row">
        {movies ? 
            movies.map((movie, i) => (
            
              movie.id && movie.poster_path ? 
                 <div className="col-md-3 col-sm-6 movie-posters" key={i}>
                  <Link to={`/movie/${movie.id}`}>
                    <img src={posterPath + movie.poster_path} alt="thing"/>
                  </Link>
                </div>
              :null

            ))
          :null}
        </div>
  )
}

export default LoadMovies
