import React from 'react'
import { handleDate, handleRevenue } from '../../utils/misc'
import Modal from './modal';
import RatingParent from './rating_parent';

const MovieView = ({ movie }) => {
  const posterBase = 'https://image.tmdb.org/t/p/w300';
  // const backdropBase = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      <div className="row">
            <h1>{movie.title}<span className="release-date">{`(${handleDate(movie.release_date)})`}</span></h1>
      </div>
      <div className="row">
        <div className="col-md-4">
          {
            movie.poster_path ? 
              <img src={posterBase + movie.poster_path} alt="thing"/>
            :null
          } 
        </div>
        <div className="col-md-8">
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <div className="row">
            <RatingParent movie={movie} />
            <div className="col-md-3 reset-padding">
              <h5>Runtime </h5>
              <p>{movie.runtime} min</p>
            </div>
            <div className="col-md-3 reset-padding">
              <h5>Total Revenue</h5>
              <p>${handleRevenue(movie.revenue)}</p>
            </div>
            <Modal />
     
          </div>
          <h5>Director</h5>
          <div className="row">
            <div className="col-md-2 profile-outter">
              <img className="profile-pic" src={posterBase + movie.director[0].profile_path} alt=""/>
              <p>{movie.director[0].name}</p>
            </div>
          </div>
          <h5>Starring</h5>
          <div className="row">
            {movie.cast ? 
              movie.cast.map((actor, i) => (      
                <div className="col-md-2 profile-outter"  key={i}>

                  <img className="profile-pic" src={posterBase + actor.profile_path} alt={actor.name}/>
                  <span>{actor.name}
            
                  </span>
                </div> 
              ))
            :null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieView
