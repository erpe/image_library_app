import React from 'react'
import PropTypes from 'prop-types'


const AppHeader = (props) => {
  return(
    <header className='header'>
      <h1>ImageLibrary <small>{props.client}</small></h1>
    </header>
  )
}


AppHeader.propTypes = {
  client: PropTypes.string.isRequired,
}

export default AppHeader
