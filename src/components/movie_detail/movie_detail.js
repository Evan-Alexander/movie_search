import React, { Component } from 'react'
import { getMovieById, clearMovie } from '../../redux_store/actions/movie_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieView from './movie_view';

class MovieDetail extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getMovieById(id)).then(response =>{
      if(!this.props.movie){
          this.props.history.push('/');
      }
    })
  }

  componentWillUnmount() {
    this.props.dispatch(clearMovie())
  }

  render() {
    return (
      <>
      <Link to={`/`} className="go-back"><i className="fas fa-arrow-left"></i></Link>
        {
          this.props.movie ? 
            <MovieView movie={{...this.props.movie}} />
          :null
        }

      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movies.movie,
    movies: state.movies.movieData
  }
}
export default connect(mapStateToProps)(MovieDetail)
