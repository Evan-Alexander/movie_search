import axios from 'axios';
import {
  GET_MOVIES_BY_SEARCH_OPTIONS,
  GET_MOVIES_BY_SEARCH_TERM,
  GET_MOVIE_BY_ID,
  CLEAR_MOVIE
} from './types';

const TMDB_URL = 'https://api.themoviedb.org/3';

export function getMoviesByOption(searchType, page) {
  const url = `${TMDB_URL}/movie/${searchType}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}`
   
  let request = axios.get(url)
    .then(response => response.data);

  return {
    type: GET_MOVIES_BY_SEARCH_OPTIONS,
    payload: request
  }
}

export function getMoviesBySearchTerm(text) {
  const url =  `${TMDB_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${text}&page=1&include_adult=false`

  const request = axios.get(url)
    .then(response => response.data);

    return {
      type: GET_MOVIES_BY_SEARCH_TERM,
      payload: request
    }
}

export function getMovieById(id) {

  const url =`${TMDB_URL}/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&append_to_response=credits,videos`;
  const request = axios.get(url)
    .then(response => response.data)

  return {
    type: GET_MOVIE_BY_ID,
    payload: request
  }
}

export function clearMovie() {
  return {
    type: CLEAR_MOVIE,
    payload: {}
  }
}

