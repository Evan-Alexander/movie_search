import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProgressRing from './progress_bar';

class RatingParent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      progress: 0
    };
  }
  componentDidMount() {

    setTimeout(() => {
      const rating = this.props.movie.vote_average * 10;
      this.setState({ progress: rating });
    }, 400);
  }
  
  render() {
    const { movie } = this.props;
    return (
      <div className="rating-container">

        <ProgressRing
          radius={ 60 }
          stroke={ 6 }
          progress={ this.state.progress }
        />
        <div className="rating-icon"><i className="far fa-star"></i></div>
        <div className="rating-text"><a href="#">User Rating</a></div>
        <div id="rating-score">{movie.vote_average}</div>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    movie: state.movies.movie
  }
}

export default connect(mapStateToProps)(RatingParent)
