import React from 'react'
import { handleDate, handleRevenue } from '../../utils/misc'
import TrailerModal from './modal';
import RatingParent from './rating_parent';
import _ from 'underscore';

const MovieView = (props) => {
  const { movie } = props;
  const posterBase = 'https://image.tmdb.org/t/p/w300';

  let cast = [];

  const filteredDirectors = movie.credits.crew.filter(person => person.job === 'Director')

  const filteredWriters = movie.credits.crew.filter(person => person.department === "Writing")

  const writersDirectors = filteredDirectors.concat(filteredWriters);

  const jobs = writersDirectors.filter(person => person.profile_path !== null);

  const crew = jobs.map((person, i) => {
    return {
      id: person.id,
      name: person.name,
      job: person.job,
      profile_path: person.profile_path
    }
  })

  const groups = _.groupBy(crew, function (obj) { return obj.id })
  const finalCrewArray = _.map(groups, function (groups) {
    let id = groups[0].id;
    let name = groups[0].name;
    let profile_path = groups[0].profile_path;
    let job = _.chain(groups).map(function (obj) { return obj.job }).flatten().uniq().value()
    return { id, name, job, profile_path  }
  })

  const renderDirectors = finalCrewArray.map((person) => (
    person.job.includes('Director')   ?
      (
        <div className={`crew-col profile-outter`} key={person.id}>
          <p className="crew-label">
            {person.job.includes('Screenplay') ? 'Director Screenplay' : 'Director'}
          </p>
          <img className="profile-pic img-fluid crew-img" src={posterBase + person.profile_path} alt=""/>
          <span className="cast-name">{person.name}</span>
        </div>
      ) : null
  ))

  const renderEveryoneElse = finalCrewArray.map((person) => (
    !person.job.includes('Director') ?
     
        <div className={`crew-col profile-outter`} key={person.id}>
          <p className="crew-label">
            {person.job.includes('Screenplay') ? 'Screenplay' : 'Story'}
          </p>
          <img className="profile-pic img-fluid crew-img" src={posterBase + person.profile_path} alt=""/>
          <span className="cast-name">{person.name}</span>
        </div>
      : null  
  ))

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

  const getCast = cast.filter(person => person.profile_path !== null);

  const showRevenue = () => (
    movie.revenue === 0 ? (
      <p>Unavailable</p>
    ) : (
      <p>${handleRevenue(movie.revenue)}</p>
    )
  )


  // const backdropBase = 'https://image.tmdb.org/t/p/w500';
  return (
    <>

      <div className="row detail-title-container">
        <div className="col">
          <h1>{movie.title}<span className="release-date">{`(${handleDate(movie.release_date)})`}</span></h1>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-4 movie-detail-poster align-center-sm">
          {
            movie.poster_path ? 
              <img src={posterBase + movie.poster_path} alt="thing"/>
            :null
          } 
        </div>
        <div className="col-md-8 align-center-sm">
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <div className="row padding-b">
            <RatingParent movie={movie} />
            <div className="col reset-padding movie-info">
              <h5>Runtime </h5>
              <p>{movie.runtime} min</p>
            </div>
            <div className="col reset-padding movie-info">
              <h5>Total Revenue</h5>
              {showRevenue()}
            </div>
            <TrailerModal />
     
          </div>
          <div className="container">
            <h5>Crew</h5>
            <div className="row align-items-center padding-b">
            {renderDirectors}
            {renderEveryoneElse}
            </div>
          </div>

          <div className="container">
            <h5>Starring</h5>
            <div className="row align-items-center">
              {getCast ? 
                getCast.map((actor, i) => (      
                  <div className="col profile-outter cast-outter"  key={i}>

                    <img className="profile-pic img-fluid" src={posterBase + actor.profile_path} alt={actor.name}/>
                    <p className="crew-label">{actor.name}</p>
                  </div> 
                ))
              :null}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default MovieView
