import React from 'react'
import PropTypes from 'prop-types'
import VariantList from './VariantList'
import ReactMarkdown from 'react-markdown'

const Image = (props) => {
  const clientVariants = props.image.variants.filter(v => v.client === props.client)
  const variantNames = clientVariants.map(v => v.name)

  const variantActions = props.formats.map((f, k)=> {
    if (!variantNames.includes(f.name)) {
      return(
        <button key={k}
                onClick={() => props.onCreateVariant(f)}
                className='btn btn-outline-light mr-2 mb-3'>
          Create '{f.name}'
        </button>
      )
    }
    return ""
  })

  const variantMap = {}
  props.image.variants.forEach(v => {
    variantMap[v.client] = v
  })
  const clients = Object.keys(variantMap).filter(c => c !== '_internal')


  let variantList = (
    <React.Fragment>
      <p>No Variant available</p>
    </React.Fragment>
  )

  if (clientVariants.length > 0) {
    variantList = (<VariantList variants={clientVariants} onDeleteVariant={props.onDeleteVariant}/>)
  }

  return(
    <React.Fragment>
      <h2>{props.image.alt}</h2>
      <div className='row mb-3'>
        <div className='col-md-3'>
          <p>
            &copy; {props.image.copyright}<br />
            Width: {props.image.width} <br />
            Height: {props.image.height} <br />
            Alt: {props.image.alt}<br />
            Used by: {clients.join(', ')}
          </p>
          <button
            onClick={() => props.onEdit(props.image)}
            className='btn btn-outline-warning mr-3'>
            Edit
          </button>
          <button
            onClick={() => props.onDelete(props.image.id)}
            className='btn btn-outline-danger'>
            Delete
          </button>
        </div>
        <div className='col-md-9'>
          <ReactMarkdown source={props.image.notes} />
        </div>
      </div>
      <div className='mb-3'>
        <h3>Variants</h3>
        {variantActions}
        {variantList}
      </div>
      <h3 className='mb-3'>Original uploaded Image</h3>
      <img src={props.image.url} alt={props.image.alt} className='img img-fluid'/>
    </React.Fragment>
  )
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  client: PropTypes.string.isRequired,
  formats: PropTypes.array.isRequired,
  onCreateVariant: PropTypes.func.isRequired,
  onDeleteVariant: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Image
