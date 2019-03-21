import React from 'react'
import { handleDate, handleRevenue } from '../../utils/misc'
import TrailerModal from './modal';
import RatingParent from './rating_parent';

const MovieView = (props) => {
  const { movie } = props;
  const posterBase = 'https://image.tmdb.org/t/p/w300';

    let cast = [];
    let director = [];

    if(movie.credits.cast) {
      movie.credits.cast.map((actor, i) => {
        if(actor.order <= 4) {
          cast.push({
            name: actor.name,
            profile_path: actor.profile_path
          })
        }
        return cast;
      })
    }

    director.push({
      name: movie.credits.crew[0].name,
      profile_path: movie.credits.crew[0].profile_path
    })

    const showRevenue = () => (
      movie.revenue === 0 ? (
        <p>Unavailable</p>
      ) : (
        <p>${handleRevenue(movie.revenue)}</p>
      )
    )


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
          <div className="row padding-b">
            <RatingParent movie={movie} />
            <div className="col-md-3 reset-padding movie-info">
              <h5>Runtime </h5>
              <p>{movie.runtime} min</p>
            </div>
            <div className="col-md-3 reset-padding movie-info">
              <h5>Total Revenue</h5>
              {showRevenue()}
            </div>
            <TrailerModal />
     
          </div>
          <h5>Director</h5>
          <div className="row padding-b">
            <div className="col-md-2 profile-outter">
              <img className="profile-pic" src={posterBase + director[0].profile_path} alt=""/>
              <p>{director[0].name}</p>
            </div>
          </div>
          <h5>Starring</h5>
          <div className="row">
            {cast ? 
              cast.map((actor, i) => (      
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
