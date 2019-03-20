import {
  GET_MOVIES_BY_SEARCH_OPTIONS,
  GET_MOVIES_BY_SEARCH_TERM,
  GET_MOVIE_BY_ID,
  CLEAR_MOVIE
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case GET_MOVIES_BY_SEARCH_OPTIONS:
      return {
        ...state,
        movieData: action.payload
      }
    case GET_MOVIES_BY_SEARCH_TERM:
      return {
        ...state,
        movieData: action.payload
      }
    case GET_MOVIE_BY_ID:
      return {
        ...state,
        movie: action.payload
      }
    case CLEAR_MOVIE:
      return {
        ...state,
        movie: action.payload   
      }
    default:
      return state;
  }
}