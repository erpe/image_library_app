import React from 'react'
import PropTypes from 'prop-types'
import VariantList from './VariantList'

const Image = (props) => {
  const img = props.image

  const variants = img.variants

  const variantNames = img.variants.map(v => v.name)

  const actionButtons = props.formats.map((f, k)=> {
    if (!variantNames.includes(f.name)) {
      return(
        <button key={k}
          onClick={() => props.onCreateVariant(f)}
          className='btn btn-outline-light mr-2'>
          Create '{f.name}'
        </button>
      )
    }
    return ""
  })

  return(
    <React.Fragment>
      <h2>{img.alt}</h2>
      <div className='row mb-3'>
        <div className='col-md-4'>
          <p>
            &copy;: {img.copyright}<br />
            Width: {img.width} <br />
            Height: {img.height} <br />
            Alt: {img.alt}<br />
          </p>
        </div>
        <div className='col-md-8'>
          <h3>Variants</h3>
          <VariantList variants={variants} onDeleteVariant={props.onDeleteVariant}/>
          {actionButtons}
        </div>
      </div>
      <img src={img.url} alt={img.alt} className='img img-fluid'/>
    </React.Fragment>
  )
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  formats: PropTypes.array.isRequired,
  onCreateVariant: PropTypes.func.isRequired,
  onDeleteVariant: PropTypes.func.isRequired,
}

export default Image
