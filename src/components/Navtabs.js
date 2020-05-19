import React from 'react'
import PropTypes from 'prop-types'

const Navtabs = (props) => {
  return(
    <ul className='nav nav-tabs mb-3'>
      <li className='nav-item'>
        <button onClick={props.onAboutClick}
           className={ props.active === 'about' ?
             "btn btn-default nav-link active" :
             "btn btn-default nav-link text-light"}>
           About
        </button>
      </li>
      <li className='nav-item'>
        <button onClick={props.onListClick}
          className={ props.active === 'list' ?
            "btn btn-default nav-link active" :
            "btn btn-default nav-link text-light"}>
          List
        </button>
      </li>
      <li className='nav-item'>
        <button onClick={props.onNewClick}
          className={props.active === 'new' ?
            'btn btn-default nav-link active' :
            "btn btn-default nav-link text-light" } >
          New
        </button>
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
