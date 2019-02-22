import axios from 'axios';
import {
  GET_MOVIES_BY_SEARCH_OPTIONS,
  GET_MOVIES_BY_SEARCH_TERM
} from './types';

export function getMoviesByOption(searchType, page) {
      const url = `https://api.themoviedb.org/3/movie/${searchType}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}`
   
  const request = axios.get(url)
    .then(response => response.data);

  return {
    type: GET_MOVIES_BY_SEARCH_OPTIONS,
    payload: request
  }
}

export function getMoviesBySearchTerm(text) {
  const url =  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${text}&page=1&include_adult=false`

  const request = axios.get(url)
    .then(response => response.data);

    return {
      type: GET_MOVIES_BY_SEARCH_TERM,
      payload: request
    }
  
}