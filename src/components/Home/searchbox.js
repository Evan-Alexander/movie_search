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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>   
    </div>
  );
};
export default SearchBox;
