import React, {useState} from 'react'
import PropTypes from 'prop-types'
import SlideToggleContent from './SlideToggleContent'

const ImageCard = (props) => {

  const img = props.image

  // init state visible with false
  const [isVisible, setIsVisible] = useState(false)

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
          <button onClick={ () => props.onShow(img)} className='btn btn-sm btn-outline-primary btn-block'>Show</button>
          <button onClick={ () => props.onEdit(img)} className='btn btn-sm btn-outline-warning btn-block'>Edit</button>
          <button onClick={ () => props.onDelete(img.id) } className='btn btn-sm btn-outline-danger btn-block'>Delete</button>
        </div>
      </SlideToggleContent>

    </div>
  )
}

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default ImageCard
