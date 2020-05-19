import React from 'react'
import PropTypes from 'prop-types'

const Navtabs = (props) => {
  return(
    <ul className='nav nav-tabs'>
      <li className='nav-item'>
        <a href='#' onClick={props.onAboutClick}
           className={ props.active === 'about' ? "nav-link active" : "nav-link"}>
           About
        </a>
      </li>
      <li className='nav-item'>
        <a href='#' onClick={props.onListClick}
          className={ props.active === 'list' ? "nav-link active" : "nav-link"}>
          List
        </a>
      </li>
      <li className='nav-item'>
        <a href='#' onClick={props.onNewClick}
          className={props.active === 'new' ? 'nav-link active' : "nav-link" } >
          New
        </a>
      </li>
    </ul>
  )
}

Navtabs.propTypes = {
  onAboutClick: PropTypes.func.isRequired,
  onListClick: PropTypes.func.isRequired,
  onNewClick: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
}

export default Navtabs
