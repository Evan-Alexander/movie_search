
import React, { Component } from 'react'
import { handleMovieOptions } from '../../utils/misc';
import { connect } from 'react-redux';

class SearchCategories extends Component {

  state = {
    currentSearch: ''
  }


  handleToggle = (value) => {
      this.setState({
        currentSearch: value.name
      }, () => {
        this.props.handleFilters(value)
      })
  }

  renderOtptions = () => (
    this.props.searches.map((search, i) => (
          <span 
            className="search-options" 
            key={i} 
            onClick={()=> this.handleToggle(search)}
          >
            {handleMovieOptions(search.name)}
          </span>
        )
  ))

  render() {
    return (
      <div className="row align-items-center">
        <h4 className="search-option-header">Search By: </h4>
        {this.renderOtptions()}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    movies: state.movieData
  }
}

export default connect(mapStateToProps)(SearchCategories)
