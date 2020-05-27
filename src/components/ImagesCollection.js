import React from 'react'
import PropTypes from 'prop-types'
import ImageCard from './ImageCard'

const ImagesCollection = (props) => {
  let renderable

  if (props.displayStyle === 'card') {
    renderable = props.images.map((img, key) => {
      return (
        <ImageCard
          version={'preview'}
          image={img}
          key={key}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
          onShow={props.onShow}/>
      )
    })
  }

  return(
    <div className='card-columns'>
      {renderable}
    </div>
  )
}

ImagesCollection.propTypes = {
  displayStyle: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default ImagesCollection
