import React, { Component } from 'react'
import SearchBox from './searchbox';

class Header extends Component {
  state = {
    movies: []
  }
  onSearchChange = e => {
    let searchWord = e.target.value;
    return searchWord;
  }
  componentDidMount() {
    console.log(this.state)
  }

  render() {
    return (
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-3 pt-1">
          </div>
          <div className="col-3 text-center">
          </div>
          <div className="col-3 d-flex justify-content-center align-items-center">
            <SearchBox searchChange={this.onSearchChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>     
          </div>
        </div>
      </header>
    )
  }
}
export default Header