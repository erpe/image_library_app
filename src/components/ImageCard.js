import React from 'react'
import PropTypes from 'prop-types'

const ImageCard = (props) => {

  const img = props.image

  return(
    <div className='col-md-2'>
      <div className='card bg-dark'>
        <img src={img.url}  className='card-img-top' />
        <div className='card-body'>
          <p className='card-title'>{img.alt}</p>
          <p className='card-text'>
            <small>
            { img.category } <br />
            &copy; {img.copyright} <br />
            { img.url }
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
}

export default ImageCard
