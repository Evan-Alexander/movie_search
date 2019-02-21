import React from 'react'
import { movieOptions } from '../../utils.js/misc';

const SearchCategories = ({changeSearch, searches}) => {
  
  return (
    <div>
      <h1>Movie Database </h1> 
      <h4 className="search-option-header">Search By: </h4>
      {searches.map((search, i) => {
          return <span className="search-options" key={i} onClick={()=> changeSearch(search)}>{movieOptions(search)}</span>;
        })}
    </div>
  )
}

export default SearchCategories
