import React from "react";

const SearchBox = ({ searchChange }) => {
  return (
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <input
        aria-label="Search Movies"
        className="searchbox"
        type="search"
        placeholder="Search movies"
        onChange={searchChange}
      />
      <i className="fas fa-search" style={{color: 'white'}} ></i>
    </div>
  );
};
export default SearchBox;
