import React from "react";

const SearchBox = ({ searchChange }) => {
  return (
    <div>
      <input
        aria-label="Search Movies"
        className="searchbox"
        type="search"
        placeholder="Search movies"
        onChange={searchChange}
      />
    </div>
  );
};
export default SearchBox;
