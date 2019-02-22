import React, { Component } from 'react'
import { connect } from 'react-redux';

class Header extends Component {

  render() {
    return (
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-3 pt-1">
          </div>
          <div className="col-3 text-center">
          </div>
        </div>
      </header>
    )
  }
}
// const mapStateToProps = state => {
//   return {
//     movies: this.state
//   }
// }
// export default connect(mapStateToProps)(Header)

export default Header