import {
  GET_MOVIES_BY_SEARCH_OPTIONS,
  GET_MOVIES_BY_SEARCH_TERM
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case GET_MOVIES_BY_SEARCH_OPTIONS:
      return {
        ...state,
        movies: action.payload
      }
    break;
    case GET_MOVIES_BY_SEARCH_TERM:
      return {
        ...state,
        movies: action.payload
      }
    default:
      return state;
  }
}