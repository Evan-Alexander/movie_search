import React, { Component } from 'react'
import axios from 'axios';
import SearchCategories from './search_categories';
import LeftRightSearch from './left_right_search';

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
    const url = `https://api.themoviedb.org/3/movie/${searchType}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}`
    axios.get(url)
    .then(res => {
      let newMovies = [];
      res.data.results.map(item => {
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

  render() {
    const posterPath = 'https://image.tmdb.org/t/p/w300';
    return (
      <div className="container">
        <SearchCategories changeSearch={this.changeSearch} searches={this.state.searches}/> 
        <div className="row">
        {this.state.movies ? 
            this.state.movies.map((movie, i) => (
              <div className="col-md-3 col-sm-6" key={i}>
                <img src={posterPath + movie.poster_path} alt="thing"/>
              </div>
            ))
          :null}
        </div>
        <LeftRightSearch goBack={this.goBack} showMore={this.showMore}/>
      </div>
    );
  }
}
export default Home