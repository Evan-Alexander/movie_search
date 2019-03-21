import React, { Component } from 'react'
import { getMovieById, clearMovie } from '../../redux_store/actions/movie_actions';
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
  
  handleHistory = (e) => {
    this.props.history.goBack()
  } 

  componentWillUnmount() {
    this.props.dispatch(clearMovie())
  }

  render() {
    return (
      <div>
        <button className="go-back" onClick={this.handleHistory} title="Back"><i className="fas fa-arrow-left"></i></button>
        {
          this.props.movie ? 
            <MovieView movie={{...this.props.movie}}/>
          :null
        }

      </div>
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
