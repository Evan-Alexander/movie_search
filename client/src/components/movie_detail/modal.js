import React, { Component } from 'react'
import ReactModal from 'react-modal';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

class Modal extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      vidoeKey: ''
    };
  }
  
  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }
  
  componentDidMount() {
    const videos = this.props.movie.videos.results;
    let videoKeys = [];
    if(videos.length) {
      videos.map((video, i) => {
        if(video.type === "Trailer" && video.site === "YouTube") {
          var n = video.name.indexOf("Official");
          if (n !== -1) {
            videoKeys.push(video.key)
          }     
        }
        return videoKeys;
      })
    }
    this.setState({ videoKey: videoKeys[0]})
    return videoKeys[0];
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    return (
      <div className="col-md-3 reset-padding play-trailer">
          <h5>Play Trailer</h5>
          <button className="play-trailer-btn" onClick={this.handleOpenModal}><i className="fab fa-youtube"></i></button> 
          <ReactModal 
            ariaHideApp={false}
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            className="modal-video-movie-wrap"
            overlayClassName="Overlay"
          >
          <YouTube
            videoId={this.state.videoKey}
            opts={opts}
            onReady={this.handlePause}
          />
          <button className="modal-video-close-btn" onClick={this.handleCloseModal}></button>
        </ReactModal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.movie
  }
}

export default connect(mapStateToProps)(Modal)