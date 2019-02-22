import React, { Component } from 'react'
import SearchCategories from './search_categories';
import LeftRightSearch from './left_right_search';
import SearchBox from './searchbox';

import { connect } from 'react-redux';
import { getMoviesByOption, getMoviesBySearchTerm } from '../../redux_store/actions/movie_actions';

class Home extends Component {
  state = {
    movies: [],
    page: 1,
    totalPages: null,
    searches: ["popular", "top_rated", "upcoming"],
    searchType: ''
  }

  loadMovies = () => {
    const { page, searchType } = this.state;
    this.props.dispatch(getMoviesByOption(searchType, page))
    .then(() => {
      console.log(this.props.movies.movies)
      let newMovies = [];
      this.props.movies.movies.results.map(item => {
        newMovies.push(item)
        return newMovies
      })
      this.setState({
        movies: newMovies,
        page
      })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    if(this.state.searchType === '') {
      this.setState({
        searchType: 'popular'
      }, () => {
        this.loadMovies()
      })
    }
  }

  showMore = (e) => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), () => this.loadMovies())
  }

  goBack = (e) => {
    this.setState(prevState => ({
      page: prevState.page - 1
    }), () => this.loadMovies())
  }

  changeSearch = (searchType) => {
    this.setState({
      page: 1,
      searchType
    }, () => {
      if (searchType === this.state.searchType) {
        this.loadMovies();
      }
    });
  }

  onSearchChange = e => {
    let searchWord = e.target.value;
    this.props.dispatch(getMoviesBySearchTerm(searchWord))
      .then(() => {
        let newMovies = [];
        if(this.props.movies.movies.results.length > 0) {
          this.props.movies.movies.results.map(item => {
            newMovies.push(item)
            return newMovies
          })
          this.setState({
            movies: newMovies
          })
        }
      })
  }

  render() {
    const posterPath = 'https://image.tmdb.org/t/p/w300';
    return (
      <div className="container">
        <div className="row">
        <div className="col-md-9 d-flex justify-content-right align-items-center"><h1>Movie Database </h1> </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
            <SearchBox searchChange={this.onSearchChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>     
          </div>
        <SearchCategories changeSearch={this.changeSearch} searches={this.state.searches}/> 
        </div>

        <div className="row">
        {this.state.movies ? 
            this.state.movies.map((movie, i) => (
              <div className="col-md-3 col-sm-6" key={i}>
              {
                movie.poster_path ? 
                  <img src={posterPath + movie.poster_path} alt="thing"/>
                :null
              } 
              </div>
            ))
          :null}
        </div>
        <LeftRightSearch goBack={this.goBack} showMore={this.showMore}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps)(Home)