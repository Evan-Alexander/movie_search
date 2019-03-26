import React, { Component } from 'react'
import LeftRightSearch from './left_right_search';
import SearchBox from './searchbox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMoviesByOption, getMoviesBySearchTerm } from '../../redux_store/actions/movie_actions';
import { searchOptions } from '../../utils/fixed_categories';
import SearchCategories from './search_categories';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSearch: '',
      currentPage: 0,
      movies: []
    }
  }
  
  componentDidMount() {
    if(this.state.currentSearch === "" && this.state.currentPage === 0) {
      this.setState({
        currentSearch: 'popular',
        currentPage: 1
      }, () => {
        this.loadMovies(this.state.currentSearch, this.state.currentPage)
      })
    }
  }

  loadMovies(currentSearch, currentPage) {
    this.props.dispatch(getMoviesByOption(currentSearch, currentPage))
    .then((response) => {
      if(response.payload) {
        this.setState({
          currentSearch,
          currentPage,
          movies: response.payload.results
        })
      }
    })
    .catch(err => console.log(err))
  }

  handleFilters = (value) => {
    let newSearchPage = 1;
    this.loadMovies(value.name, newSearchPage)
  } 

  renderMovies = () => (
    this.state.movies.length ? 
    this.state.movies.map((movie, i) => (

      movie.id && movie.poster_path ? 
        <div className="col-md-3 col-sm-6 movie-posters" key={i}>
          <Link to={`/movie/${movie.id}`}>
            <img src={'https://image.tmdb.org/t/p/w300' + movie.poster_path} alt="thing"/>
          </Link>
        </div>
      :null

    ))
  :null
  )

  onSearchChange = e => {
    let searchWord = e.target.value;
    this.props.dispatch(getMoviesBySearchTerm(searchWord))
      .then((response) => {
        if(response.payload) {
          this.setState({
            movies: response.payload.results,
            currentPage: 1
          })
        }
      })
  }

  showMore = (e) => {
    let nextPage = this.state.currentPage + 1;
    this.setState({
      currentPage: nextPage
    }, () => {
      this.loadMovies(this.state.currentSearch, this.state.currentPage)
    })
  }

  goBack = (e) => {
    if(this.state.currentPage <= 1) {
      return null;
    }
    let nextPage = this.state.currentPage - 1;
    this.setState({
      currentPage: nextPage
    }, () => {
      this.loadMovies(this.state.currentSearch, this.state.currentPage)
    })
  }

  render() {
    // console.log("rendered state", this.state)

    return (
      <div>
        <div className="row">
          <div className="col-md-9 d-flex justify-content-right align-items-center"><h1>Movie Database </h1> </div>
          <SearchBox searchChange={this.onSearchChange} />
        </div>
        <SearchCategories 
          searches={searchOptions}
          handleFilters={(filters) => this.handleFilters(filters)}
        />
        <div className="row">
          {this.renderMovies()}
        </div>
          <LeftRightSearch goBack={this.goBack} showMore={this.showMore}/>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movieData
  }
}

export default connect(mapStateToProps)(Home)