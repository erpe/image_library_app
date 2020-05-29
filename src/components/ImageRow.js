import React from 'react'
import PropTypes from 'prop-types'

const ImageRow = (props) => {
  const img = props.image

  const extractPreviewUrl = () => {
    const vars = img.variants.filter((variant) =>  variant.name === 'preview')
    if (vars.length === 1) {
      return vars[0].url
    } else {
      console.error("we should not arrive here... no 'preview' for image ", img.id)
    }
  }

  return(
    <React.Fragment>
    <tr>
      <td>
        <img height={30} src={extractPreviewUrl()} alt={img.alt}/>
      </td>
      <td>{img.id}</td>
      <td>{img.category}</td>
      <td>{img.alt}</td>
      <td>{img.copyright}</td>
      <td className='text-right'>
        <span className='text-nowrap'>
          <button onClick={() => props.onShow(img)}
            className='btn btn-sm btn-outline-primary mr-2'>
            Show
          </button>
          <button onClick={() => props.onEdit(img)}
            className='btn btn-sm btn-outline-warning mr-2'>
            Edit
          </button>
          <button onClick={() => props.onDelete(img.id)}
            className='btn btn-sm btn-outline-danger'>
            Destroy
          </button>
        </span>
      </td>
    </tr>
    </React.Fragment>
  )
}

ImageRow.propTypes = {
  image: PropTypes.object.isRequired,
  onShow: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ImageRow
