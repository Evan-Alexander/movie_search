import React, { Fragment } from 'react'

const LeftRightSearch = ({goBack, showMore}) => {
  return (
    <Fragment>
      <button className="load-more-btn left" onClick={() => goBack()}><span aria-hidden="true">&laquo;</span></button>
      <button className="load-more-btn right" onClick={() => showMore()}><span aria-hidden="true">&raquo;</span></button>
    </Fragment>
  )
}

export default LeftRightSearch
