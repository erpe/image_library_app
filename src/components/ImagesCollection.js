import React from 'react'
import PropTypes from 'prop-types'
import ImageCard from './ImageCard'

const ImagesCollection = (props) => {
  let renderable

  if (props.displayStyle === 'card') {
    renderable = props.images.map((img) => {
      return <ImageCard image={img} />
    })
  }

  return(
    <div className='row'>
      {renderable}
    </div>
  )
}

ImagesCollection.propTypes = {
  displayStyle: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
}

export default ImagesCollection
