import React from 'react'
import PropTypes from 'prop-types'


const AppHeader = (props) => {
  return(
      <h1>ImageLibrary <small>{props.client}</small></h1>
  )
}


AppHeader.propTypes = {
  client: PropTypes.string,
}

export default AppHeader
