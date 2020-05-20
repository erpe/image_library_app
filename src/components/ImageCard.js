import React, {useState} from 'react'
import PropTypes from 'prop-types'
import SlideToggleContent from './SlideToggleContent'

const ImageCard = (props) => {

  const img = props.image

  // init state visible with false
  const [isVisible, setIsVisible] = useState(false)

  const onDelete = () => {
    console.log("onDelete...")
    props.onDelete(img.id)
  }

  return(
    <div className='card bg-dark shadow'
        onClick={ () => { setIsVisible(!isVisible)}}>

      <img src={img.url} alt={img.alt} className='card-img-top' />

      <SlideToggleContent isVisible={isVisible}>
        <div className='card-body'>
          <p className='card-title'>{img.alt}</p>
          <p className='card-text'>
            <small>
              { img.category } <br />
              &copy; {img.copyright} <br />
              { img.url }
            </small>
          </p>
          <button onClick={onDelete } className='btn btn-sm btn-danger'>Delete</button>
        </div>
      </SlideToggleContent>

    </div>
  )
}

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ImageCard
