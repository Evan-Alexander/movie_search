import React, { Component } from 'react'
import { getMovieById, returnToHomePage, clearMovie } from '../../redux_store/actions/movie_actions';
import { connect } from 'react-redux';
import MovieView from './movie_view';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPage: null,
      movieID: this.props.match.params.id,
      title: '',
      poster_path: '',
      revenue: null,
      backdrop_path: '',
      overview: '',
      rating: '',
      director: [],  
      cast: [],
      release_date: '',
      runtime: '',
      videos: [],
      success: false
    }
  }

  componentDidMount() {
    this.props.dispatch(getMovieById(this.state.movieID))
  }

  // saveToLocalStorage(state) {
  //   try {
  //     const serializedState = JSON.stringify(state)
  //     localStorage.setItem('state', serializedState)
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
  
  // loadFromLocalStorage() {
  //   try {
  //     const serializedState = localStorage.getItem('state')
  //     if (serializedState === null) return undefined
  //     return JSON.parse(serializedState)
  //   } catch(e) {
  //     console.log(e)
  //     return undefined
  //   }
  // }

  componentWillReceiveProps(nextProps){
    let lastPageVisited = nextProps.movies.page;
    sessionStorage.setItem('lastPage', lastPageVisited);
    const { movie } = nextProps;
    let cast = [];
    let director = [];
    let videos = [];
    let lastPage = nextProps.lastPage;
    if(nextProps.movie.credits.cast) {
      nextProps.movie.credits.cast.map((actor, i) => {
        if(actor.order <= 4) {
          cast.push({
            name: actor.name,
            profile_path: actor.profile_path
          })
        }
        return cast;
      })
    }
    if(movie.videos.results.length) {
      movie.videos.results.map(video => {
        videos.push(video)
        return videos;
      })
    }
    director.push({
      name: movie.credits.crew[0].name,
      profile_path: movie.credits.crew[0].profile_path
    })

    this.setState({
      lastPage,
      title: movie.title,
      poster_path: movie.poster_path,
      revenue: movie.revenue,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      rating: movie.vote_average,
      director, 
      cast,
      release_date: movie.release_date,
      runtime: movie.runtime,
      videos,
      success: true
    })
  }

  componentWillUnmount() {
    this.props.dispatch(clearMovie())

  }

  handleHistory = (e) => {
    this.props.history.goBack()
    sessionStorage.removeItem('lastPage');
  } 

  render() {
    return (
      <div>
        <button className="go-back" onClick={this.handleHistory} title="Back"><i className="fas fa-arrow-left"></i></button>
        {
          this.state.success === true ? 
            <MovieView movie={{...this.state}}/>
          :null
        }

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: state.movies.movie,
    movies: state.movies.movieData
  }
}
export default connect(mapStateToProps)(MovieDetail)
